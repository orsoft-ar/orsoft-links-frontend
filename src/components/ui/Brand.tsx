import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Link2,
  Mail,
  MessageCircle,
  Music2,
  ShoppingBag,
  Twitter,
  Youtube,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  globe: Globe,
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  whatsapp: MessageCircle,
  twitter: Twitter,
  youtube: Youtube,
  tiktok: Music2,
  facebook: Facebook,
  mail: Mail,
  link: Link2,
  store: ShoppingBag,
};

export function LinkIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? Link2;
  return <Icon className={className ?? 'h-4 w-4'} />;
}

export function OrSoftLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/logo.png"
        alt="logo de linkorsoft.site"
        className="h-8 w-auto sm:h-9"
      />
      <span className="hidden text-xl font-extrabold tracking-tight text-navy sm:inline">
        linkorsoft<span className="text-coral">.site</span>
      </span>
    </div>
  );
}

export function PoweredByOrSoft({ className = '' }: { className?: string }) {
  return (
    <a
      href="https://orsoft.site"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      Powered by <span className="font-bold text-navy">OrSoft</span>
    </a>
  );
}