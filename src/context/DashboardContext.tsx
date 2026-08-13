import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';
import * as linkPageService from '@/services/linkPage.service';
import type {
  CreateLinkPagePayload,
  UpdateLinkPagePayload,
  LinkPageWithLinks,
} from '@/types/linkPage';
import { useAuth } from '@/context/AuthContext';

interface DashboardContextValue {
  page: LinkPageWithLinks | null;
  loading: boolean;
  error: string | null;
  createPage: (payload: CreateLinkPagePayload) => Promise<void>;
  updatePage: (payload: UpdateLinkPagePayload) => Promise<void>;
  setPage: (page: LinkPageWithLinks | null) => void;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const [page, setPageState] = useState<LinkPageWithLinks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await linkPageService.getMyPage();
      setPageState(data);
    } catch (err) {
      const apiError = err as { statusCode?: number; message?: string };
      if (apiError.statusCode === 404) {
        setPageState(null);
      } else {
        setError(apiError.message ?? 'No pudimos cargar tu página');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) void load();
  }, [token, load]);

  const createPage = useCallback(
    async (payload: CreateLinkPagePayload) => {
      const data = await linkPageService.createPage(payload);
      setPageState(data);
      toast.success('Tu página fue creada');
    },
    [],
  );

  const updatePage = useCallback(
    async (payload: UpdateLinkPagePayload) => {
      const data = await linkPageService.updatePage(payload);
      setPageState((current) => (current ? { ...current, ...data } : current));
      toast.success('Cambios guardados');
    },
    [],
  );

  const setPage = useCallback((next: LinkPageWithLinks | null) => {
    setPageState(next);
  }, []);

  const value = useMemo(
    () => ({ page, loading, error, createPage, updatePage, setPage }),
    [page, loading, error, createPage, updatePage, setPage],
  );

  return (
    <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardContextValue {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard debe usarse dentro de DashboardProvider');
  }
  return context;
}