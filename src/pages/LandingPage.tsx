import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Instagram,
  Link2,
  Linkedin,
  MessageCircle,
  Music2,
  Palette,
  Rocket,
  Share2,
  Smartphone,
  Youtube,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { LinkIcon, OrSoftLogo, PoweredByOrSoft } from '@/components/ui/Brand';
import { useAuth } from '@/context/AuthContext';
import { useSeo } from '@/utils/seo';
import type { ReactNode } from 'react';

const faqs = [
  {
    q: '¿Qué es linkorsoft.site?',
    a: 'Es una página personalizada y gratis donde reunís todos tus links: Instagram, WhatsApp, LinkedIn, tu portafolio y más, en un único enlace para compartir.',
  },
  {
    q: '¿Es gratis?',
    a: 'Sí. Podés crear tu página de links sin costo, sin tarjeta y sin límites en la versión gratuita.',
  },
  {
    q: '¿Puedo usar mi propia URL?',
    a: 'Sí, cada perfil tiene una URL única, por ejemplo linkorsoft.site/tu-nombre, que podés poner en tu bio de Instagram, TikTok, WhatsApp o LinkedIn.',
  },
  {
    q: '¿Cuánto tarda en crear mi página?',
    a: 'Menos de un minuto. Creás tu cuenta, elegís tu nombre de usuario y tus links, y listo.',
  },
];

const networkChips = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Music2, label: 'TikTok' },
  { icon: MessageCircle, label: 'WhatsApp' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Youtube, label: 'YouTube' },
];

function ExamplePreview() {
  const links = [
    { title: 'Sitio web', icon: 'globe', url: 'https://orsoft.site' },
    { title: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/mateo-gerbaudo-645279211/' },
    { title: 'Instagram', icon: 'instagram', url: 'https://instagram.com/orsoft.site' },
    { title: 'Email', icon: 'mail', url: 'mailto:mgerbaudo02@gmail.com' },
    { title: 'WhatsApp', icon: 'whatsapp', url: 'https://wa.me/543537661736' },
  ];

  return (
    <div className="mx-auto w-full max-w-[300px]">
      <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-navy bg-cream shadow-2xl shadow-navy/25">
        <div className="flex items-center justify-center bg-navy pb-2 pt-1">
          <span className="h-1.5 w-16 rounded-full bg-white/30" />
        </div>
        <div className="px-5 pb-6 pt-4">
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 overflow-hidden rounded-full bg-white ring-4 ring-orange/15">
              <img
                src="https://orsoft.site/logo.png"
                alt="OrSoft"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-3 font-bold text-navy">OrSoft</h3>
            <p className="text-xs text-slate/60">
              Desarrollo de software a medida para empresas
            </p>
          </div>
          <div className="mt-5 space-y-2.5">
            {links.map((link) => (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-sm ring-1 ring-slate/10 transition-colors hover:bg-navy hover:text-white"
              >
                <LinkIcon name={link.icon} className="h-4 w-4" />
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -right-8 -top-2 hidden animate-pulse rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-slate/10 sm:block">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange/15 text-orange">
            <Link2 className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-bold text-navy">Tu URL única</p>
            <p className="text-[10px] text-slate/50">listo en segundos</p>
          </div>
        </div>
      </div>

      <div className="absolute -left-6 bottom-24 hidden animate-bounce rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-slate/10 sm:block">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral/15 text-coral">
            <Share2 className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-bold text-navy">Link compartido</p>
            <p className="text-[10px] text-slate/50">en tu bio</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Benefit({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange/15 text-orange transition-colors group-hover:bg-coral group-hover:text-white">
        {icon}
      </div>
      <h3 className="font-bold text-navy">{title}</h3>
      <p className="mt-1.5 text-sm text-slate/60">{description}</p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative rounded-2xl border border-slate/10 bg-white p-6 shadow-sm">
      <span className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-coral to-orange text-sm font-black text-white shadow-md">
        {number}
      </span>
      <h3 className="mt-4 font-bold text-navy">{title}</h3>
      <p className="mt-1.5 text-sm text-slate/60">{description}</p>
    </div>
  );
}

export function LandingPage() {
  const { isAuthenticated } = useAuth();
  const ctaTarget = isAuthenticated ? '/dashboard' : '/register';

  useSeo({
    title: 'linkorsoft.site — Todos tus links en un solo lugar',
    description:
      'Creá gratis tu página personalizada y compartí todo lo que hacés desde un único link: Instagram, WhatsApp, LinkedIn y más. Sin tarjeta, sin límites.',
  });

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-slate/10 bg-cream/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <OrSoftLogo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate/70 lg:flex">
            <a href="#beneficios" className="transition-colors hover:text-navy">
              Beneficios
            </a>
            <a href="#como-funciona" className="transition-colors hover:text-navy">
              Cómo funciona
            </a>
            <a href="#faq" className="transition-colors hover:text-navy">
              Preguntas frecuentes
            </a>
          </nav>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="secondary" size="sm">
                  Mi dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Iniciar sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Crear cuenta</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,43,91,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,43,91,0.05)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-orange/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-coral/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-24">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl">
                Todos tus links en{" "}
                <span className="bg-gradient-to-r from-coral to-orange bg-clip-text text-transparent">
                  un solo lugar.
                </span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate/70">
                Creá en menos de un minuto tu página personalizada y compartí
                desde un único link todo lo que hacés: tus redes, tu portfolio y
                tu contacto.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to={ctaTarget} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">
                    Crear mi página gratis
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate/70">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-coral" /> Gratis
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-coral" /> Sin límites
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-coral" /> Tu URL única
                </li>
              </ul>

              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate/50">
                  Perfecto para tu bio de
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {networkChips.map((net) => (
                    <span
                      key={net.label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate/10 bg-white px-3 py-1.5 text-sm font-medium text-slate/70 shadow-sm"
                    >
                      <net.icon className="h-4 w-4 text-orange" />
                      {net.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div id="ejemplo" className="relative mx-auto w-full max-w-xs scroll-mt-24">
              <ExamplePreview />
            </div>
          </div>
        </div>
      </section>

      <section id="beneficios" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-coral">
              Beneficios
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Todo lo que hacés, al alcance de un link
            </h2>
            <p className="mt-3 text-slate/70">
              Ideal para Instagram, TikTok, WhatsApp, LinkedIn y más.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Benefit
              icon={<Link2 className="h-5 w-5" />}
              title="Un solo link"
              description="Compartí un único enlace que muestra todos tus destinos: portafolio, redes, proyectos y más."
            />
            <Benefit
              icon={<Palette className="h-5 w-5" />}
              title="Perfil personalizado"
              description="Tu foto, tu nombre y tu descripción. Tu página con tu identidad."
            />
            <Benefit
              icon={<Smartphone className="h-5 w-5" />}
              title="Se ve como una app"
              description="Diseño limpio y moderno que se ve perfecto en el teléfono de quien te visita."
            />
            <Benefit
              icon={<BarChart3 className="h-5 w-5" />}
              title="Links ilimitados"
              description="Agregá y organizá todos los enlaces que quieras, actualizables cuando quieras."
            />
            <Benefit
              icon={<Share2 className="h-5 w-5" />}
              title="Fácil de actualizar"
              description="Cambiá, ordená o desactivá tus enlaces en segundos desde tu panel."
            />
            <Benefit
              icon={<Rocket className="h-5 w-5" />}
              title="Sin límites ni costos"
              description="Completá tu página gratis y empezá a compartirla hoy mismo. No hace falta tarjeta."
            />
          </div>
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-24 border-y border-slate/10 bg-white/60 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-coral">
              Cómo funciona
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Listo en 3 pasos
            </h2>
            <p className="mt-3 text-slate/70">
              Sin conocimientos técnicos y en menos de un minuto.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl gap-8 pt-4 sm:grid-cols-3">
            <Step
              number="1"
              title="Creá tu cuenta"
              description="Registrate gratis y elegí tu nombre de usuario. Tu URL única se reserva al instante."
            />
            <Step
              number="2"
              title="Sumá tus links"
              description="Agregá tus redes, tu WhatsApp, tu portfolio y todo lo que quieras mostrar."
            />
            <Step
              number="3"
              title="Compartí"
              description="Poné tu link en tu bio y listo. Actualizá los enlaces cuando quieras."
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-navy" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-coral/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-orange/20 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Creá tu linkorsoft.site gratis
          </h2>
          <p className="mt-3 text-white/70">
            Tenés tu página lista en menos de un minuto. Empezá hoy.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to={ctaTarget} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-coral to-orange text-white shadow-lg shadow-coral/30 hover:from-coral/90 hover:to-orange/90 sm:w-auto"
              >
                Empezar ahora
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            {!isAuthenticated && (
              <Link to="/login" className="w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-white hover:bg-white/10 sm:w-auto"
                >
                  Ya tengo cuenta
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-coral">
              FAQ
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Preguntas frecuentes
            </h2>
            <p className="mt-3 text-slate/70">
              Todo lo que necesitás saber sobre tu página de links.
            </p>
          </div>
          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-slate/10 bg-white p-5 transition-shadow open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate/40 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate/60">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate/10 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 text-sm text-slate/50 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <OrSoftLogo className="h-5 w-auto" />
          </div>
          <div className="flex items-center gap-6">
            <a href="#beneficios" className="transition-colors hover:text-navy">
              Beneficios
            </a>
            <a href="#como-funciona" className="transition-colors hover:text-navy">
              Cómo funciona
            </a>
            <a href="#faq" className="transition-colors hover:text-navy">
              FAQ
            </a>
          </div>
          <PoweredByOrSoft />
        </div>
      </footer>
    </main>
  );
}