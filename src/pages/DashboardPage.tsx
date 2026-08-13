import { Link as IconLink, Plus, Rocket, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { FormError, Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/Loading';
import { Modal } from '@/components/ui/Modal';
import { LinkEditorModal } from '@/components/links/LinkEditorModal';
import { SortableLinkList } from '@/components/links/SortableLinkList';
import { DashboardPreview } from '@/components/profile/DashboardPreview';
import { ProfileEditor } from '@/components/profile/ProfileEditor';
import { useDashboard } from '@/context/DashboardContext';
import * as linksService from '@/services/links.service';
import type { Link } from '@/types/link';
import { ApiError } from '@/types/apiError';
import { getErrorMessage, normalizeUsername } from '@/utils/format';

interface CreatePageForm {
  username: string;
  title: string;
  description?: string;
}

export function DashboardPage() {
  const { page, error, createPage, updatePage } = useDashboard();
  const [links, setLinks] = useState<Link[]>([]);
  const [linksLoading, setLinksLoading] = useState(true);

  const [createLinkOpen, setCreateLinkOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [linkSaving, setLinkSaving] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);

  const [reordering, setReordering] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<Link | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  const [createForm, setCreateForm] = useState<CreatePageForm>({
    username: '',
    title: '',
    description: '',
  });
  const [createFormError, setCreateFormError] = useState<string | null>(null);
  const [creatingPage, setCreatingPage] = useState(false);

  useEffect(() => {
    let active = true;
    const loadLinks = async () => {
      if (!page) return;
      setLinksLoading(true);
      try {
        const data = await linksService.getMyLinks();
        if (active) setLinks(data);
      } catch {
        toast.error('No pudimos cargar tus links');
      } finally {
        if (active) setLinksLoading(false);
      }
    };
    void loadLinks();
    return () => {
      active = false;
    };
  }, [page]);

  const handleCreatePage = async () => {
    if (!createForm.username.trim() || !createForm.title.trim()) {
      setCreateFormError('Completá username y título');
      return;
    }
    setCreatingPage(true);
    setCreateFormError(null);
    try {
      await createPage({
        username: normalizeUsername(createForm.username),
        title: createForm.title.trim(),
        description: createForm.description?.trim() || undefined,
      });
    } catch (err) {
      setCreateFormError(getErrorMessage(err));
    } finally {
      setCreatingPage(false);
    }
  };

  const saveLink = async (values: {
    title: string;
    url: string;
    icon: string;
  }) => {
    setLinkSaving(true);
    setLinkError(null);
    try {
      if (editingLink) {
        const updated = await linksService.updateLink(editingLink.id, values);
        setLinks((current) =>
          current.map((l) => (l.id === updated.id ? updated : l)),
        );
        toast.success('Link actualizado');
      } else {
        const created = await linksService.createLink(values);
        setLinks((current) => [...current, created]);
        toast.success('Link agregado');
      }
      setCreateLinkOpen(false);
      setEditingLink(null);
    } catch (err) {
      setLinkError(getErrorMessage(err));
    } finally {
      setLinkSaving(false);
    }
  };

  const handleToggleActive = async (link: Link) => {
    const next = !link.active;
    const previous = link;
    setLinks((current) =>
      current.map((l) => (l.id === link.id ? { ...l, active: next } : l)),
    );
    try {
      const updated = await linksService.updateLinkStatus(link.id, next);
      setLinks((current) =>
        current.map((l) => (l.id === updated.id ? updated : l)),
      );
    } catch {
      setLinks((current) =>
        current.map((l) => (l.id === previous.id ? previous : l)),
      );
      toast.error('No se pudo cambiar el estado');
    }
  };

  const handleDeleteLink = async () => {
    if (!deleteCandidate) return;
    setDeleting(true);
    try {
      await linksService.deleteLink(deleteCandidate.id);
      setLinks((current) =>
        current.filter((l) => l.id !== deleteCandidate.id),
      );
      toast.success('Link eliminado');
      setDeleteCandidate(null);
    } catch {
      toast.error('No se pudo eliminar el link');
    } finally {
      setDeleting(false);
    }
  };

  const handleReorder = async (nextLinks: Link[]) => {
    setLinks(nextLinks);
    if (reordering) return;
    setReordering(true);
    try {
      const payload = nextLinks.map((link, index) => ({
        id: link.id,
        position: index + 1,
      }));
      const result = await linksService.reorderLinks(payload);
      setLinks(result);
    } catch (err) {
      if (err instanceof ApiError) {
        toast.error(err.message);
      } else {
        toast.error('No se pudo guardar el orden');
      }
      const reloaded = await linksService.getMyLinks();
      setLinks(reloaded);
    } finally {
      setReordering(false);
    }
  };

  if (error) {
    return (
      <EmptyState
        icon={<Wrench className="h-10 w-10" />}
        title="No pudimos cargar tu página"
        description={error}
        action={
          <RouterLink to="/">
            <Button variant="secondary">Volver al inicio</Button>
          </RouterLink>
        }
      />
    );
  }

  if (!page) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-navy">Creá tu página</h1>
          <p className="text-slate/60">
            Elegí tu username y contanos quién sos.
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-slate/10 bg-white p-6 shadow-sm">
          <Input
            label="Nombre de usuario"
            placeholder="mateo"
            value={createForm.username}
            onChange={(e) => setCreateForm((f) => ({ ...f, username: e.target.value }))}
            hint="Será tu URL pública"
          />
          <Input
            label="Título"
            placeholder="Mateo Gerbaudo"
            value={createForm.title}
            onChange={(e) => setCreateForm((f) => ({ ...f, title: e.target.value }))}
          />
          <Input
            label="Descripción"
            placeholder="Desarrollador Full Stack"
            value={createForm.description ?? ''}
            onChange={(e) => setCreateForm((f) => ({ ...f, description: e.target.value }))}
          />
          {createFormError && <FormError>{createFormError}</FormError>}
          <Button
            className="w-full"
            size="lg"
            loading={creatingPage}
            onClick={handleCreatePage}
          >
            <Rocket className="h-5 w-5" />
            Crear mi página
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
      <div className="space-y-10">
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-navy">Mi página</h1>
          </div>
          <div className="rounded-2xl border border-slate/10 bg-white p-6 shadow-sm">
            <ProfileEditor
              key={page.updatedAt}
              page={page}
              saving={profileSaving}
              error={profileError}
              onSave={async (values) => {
                setProfileSaving(true);
                setProfileError(null);
                try {
                  await updatePage({
                    username: values.username,
                    title: values.title,
                    description: values.description || undefined,
                    profileImageUrl: values.profileImageUrl || undefined,
                    isPublic: values.isPublic,
                  });
                } catch (err) {
                  setProfileError(getErrorMessage(err));
                } finally {
                  setProfileSaving(false);
                }
              }}
            />
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-navy">Links</h2>
            <Button onClick={() => { setEditingLink(null); setLinkError(null); setCreateLinkOpen(true); }}>
              <Plus className="h-4 w-4" />
              Agregar link
            </Button>
          </div>

          {linksLoading ? (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded-2xl bg-slate/15" />
              ))}
            </div>
          ) : links.length === 0 ? (
            <EmptyState
              icon={<IconLink className="h-10 w-10" />}
              title="Todavía no agregaste ningún link"
              description="Agregá tu portafolio, tus redes o cualquier enlace que quieras compartir."
              action={
                <Button onClick={() => { setEditingLink(null); setLinkError(null); setCreateLinkOpen(true); }}>
                  <Plus className="h-4 w-4" />
                  Agregar mi primer link
                </Button>
              }
            />
          ) : (
            <div className="space-y-3">
              <SortableLinkList
                links={links}
                onReorder={handleReorder}
                onToggleActive={handleToggleActive}
                onEdit={(link) => {
                  setEditingLink(link);
                  setLinkError(null);
                  setCreateLinkOpen(true);
                }}
                onDelete={(link) => setDeleteCandidate(link)}
              />
              <p className="text-xs text-slate/40">
                Arrastrá las tarjetas para cambiar el orden.
              </p>
            </div>
          )}
        </section>
      </div>

      <aside className="xl:sticky xl:top-8 xl:self-start">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate/50">
          Vista previa
        </h2>
        <DashboardPreview page={page} links={links} />
      </aside>

      <LinkEditorModal
        open={createLinkOpen}
        link={editingLink}
        saving={linkSaving}
        error={linkError}
        onClose={() => { setCreateLinkOpen(false); setEditingLink(null); }}
        onSubmit={saveLink}
      />

      <Modal
        open={Boolean(deleteCandidate)}
        title="Eliminar link"
        onClose={() => setDeleteCandidate(null)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteCandidate(null)} disabled={deleting}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDeleteLink} loading={deleting}>
              Eliminar
            </Button>
          </>
        }
      >
        <p className="text-slate/70">
          ¿Querés eliminar{' '}
          <span className="font-bold text-navy">"{deleteCandidate?.title}"</span>?
          Esta acción no se puede deshacer.
        </p>
      </Modal>
    </div>
  );
}