import { Link } from "@tanstack/react-router";
import {
  AtSign,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Twitter,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/lib/site-config";

export function BrandMark() {
  return (
    <Link
      to="/"
      className="focus-ring group inline-flex items-center gap-2"
      aria-label={`${site.brand} — home`}
    >
      <span className="block h-2 w-2 rounded-full bg-signal transition-transform duration-300 group-hover:scale-125" />
      <span className="tech-caps text-lg sm:text-xl">{site.brand}</span>
    </Link>
  );
}

export function SiteHeader({ right }: { right?: React.ReactNode }) {
  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
      <BrandMark />
      {right ?? <span className="label-mono hidden sm:block">Creative &amp; digital studio</span>}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 flex flex-col gap-2 px-6 py-6 text-[11px] tracking-wider text-muted-foreground uppercase md:flex-row md:items-center md:justify-between md:px-12">
      <span>© {new Date().getFullYear()} {site.brand}</span>
      <span>
        {site.brand} <span className="opacity-40">/</span> Privacy{" "}
        <span className="opacity-40">/</span> Terms
      </span>
    </footer>
  );
}

const ICONS: Record<string, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  whatsapp: MessageCircle,
  threads: AtSign,
  x: Twitter,
  linkedin: Linkedin,
};

export function SocialRow({ className = "" }: { className?: string }) {
  const links = site.socials.filter((s) => s.url);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href={`mailto:${site.email}`}
        aria-label="Email us"
        className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition-colors duration-200 hover:border-signal hover:text-signal"
      >
        <Mail className="h-4 w-4" aria-hidden />
      </a>
      {links.map((s) => {
        const Icon = ICONS[s.icon] ?? AtSign;
        return (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition-colors duration-200 hover:border-signal hover:text-signal"
          >
            <Icon className="h-4 w-4" aria-hidden />
          </a>
        );
      })}
    </div>
  );
}
