import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router";

// ─── Logo ─────────────────────────────────────────────────────────────────────

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-bold text-lg">A</div>
      <div className="leading-tight">
        <div className={`font-display text-xl font-bold ${light ? "text-dark-foreground" : "text-foreground"}`}>AEPL</div>
        <div className={`text-[10px] tracking-[0.2em] ${light ? "text-dark-foreground/70" : "text-muted-foreground"}`}>POWERING PROGRESS</div>
      </div>
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/careers", label: "Careers" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function Header({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  const isLight = transparent && !scrolled;

  return (
    <header
      className={
        transparent
          ? `fixed inset-x-0 top-0 z-30 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur border-b shadow-sm" : ""}`
          : "sticky top-0 z-30 bg-background/90 backdrop-blur border-b"
      }
    >
      <div className="container-x flex items-center justify-between py-5">
        <Link to="/"><Logo light={isLight} /></Link>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${isLight ? "text-dark-foreground/90" : "text-foreground/80"}`}
              activeProps={{ className: "!text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
        >
          Get a Quote
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className={`md:hidden ${isLight ? "text-dark-foreground" : "text-foreground"}`}
        >
          {open ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          )}
        </button>
      </div>
      {open && (
        <div className="md:hidden mx-4 mb-4 rounded-2xl bg-dark/95 p-6 backdrop-blur">
          {NAV.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block py-2.5 text-dark-foreground hover:text-primary transition-colors">
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-dark-foreground/60 mt-6">
      <Link to="/" className="hover:text-primary transition-colors">Home</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-40">
            <path d="M9 18l6-6-6-6"/>
          </svg>
          {item.to ? (
            <Link to={item.to} className="hover:text-primary transition-colors">{item.label}</Link>
          ) : (
            <span className="text-dark-foreground/90">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

export function StatsBar({ stats }: { stats: { value: number; suffix: string; label: string }[] }) {
  return (
    <div className="bg-primary">
      <div className="container-x py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl font-bold text-dark md:text-5xl">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm font-medium text-dark/70">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-dark text-dark-foreground rounded-t-[2.5rem] mx-2 md:mx-6 mb-2 md:mb-6 rounded-b-[2.5rem] mt-16">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Logo light />
            <p className="mt-6 text-sm text-dark-foreground/70 leading-relaxed">
              Aanya Engineers Private Limited delivers integrated engineering, construction, and fabrication solutions for oil & gas and industrial projects.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-dark-foreground/10 text-dark-foreground/70 hover:bg-primary hover:text-dark transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <FooterCol title="Our Services" links={[
            { label: "New Construction & Expansion", to: "/services" },
            { label: "Complete Mechanical Services", to: "/services" },
            { label: "Cross Country Pipelines", to: "/services" },
            { label: "Gas Terminal & Storage", to: "/services" },
            { label: "Piping, Civil & Structures", to: "/services" },
          ]} />
          <FooterCol title="Company" links={[
            { label: "About Us", to: "/about" },
            { label: "Careers", to: "/careers" },
            { label: "Services", to: "/services" },
            { label: "Projects", to: "/projects" },
            { label: "Gallery", to: "/gallery" },
            { label: "Blog", to: "/blog" },
            { label: "Contact", to: "/contact" },
          ]} />
          <div>
            <h4 className="font-display font-semibold">Contact Us</h4>
            <ul className="mt-4 space-y-4 text-sm text-dark-foreground/70">
              <li className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5 text-primary"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                <a href="tel:+918448389037" className="hover:text-primary transition-colors">+91 8448389037</a>
              </li>
              <li className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5 text-primary"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:Info.aeplongc@aanyaengineers.com" className="hover:text-primary transition-colors break-all">Info.aeplongc@aanyaengineers.com</a>
              </li>
              <li className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5 text-primary"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Sikandra, Agra 282007, U.P. India</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-dark-foreground/10 pt-6 text-xs text-dark-foreground/60 md:flex-row">
          <p>Copyright © 2026 AEPL. All Rights Reserved.</p>
          <div className="flex gap-5">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} className="hover:text-primary transition-colors">{s.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="font-display font-semibold">{title}</h4>
      <ul className="mt-4 space-y-3 text-sm text-dark-foreground/70">
        {links.map(i => (
          <li key={i.label}>
            <Link to={i.to} className="hover:text-primary transition-colors">{i.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Page Helpers ─────────────────────────────────────────────────────────────

export function PageShell({ children, transparentHeader = false }: { children: ReactNode; transparentHeader?: boolean }) {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <Header transparent={transparentHeader} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; to?: string }[];
}) {
  return (
    <section className="bg-dark text-dark-foreground rounded-b-[2.5rem]">
      <div className="container-x pt-40 pb-20 text-center">
        {eyebrow && <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>}
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold leading-tight md:text-6xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-6 max-w-2xl text-lg text-dark-foreground/75">{subtitle}</p>}
        {breadcrumb && (
          <div className="flex justify-center mt-8">
            <Breadcrumb items={breadcrumb} />
          </div>
        )}
      </div>
    </section>
  );
}

// Star Rating component
export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          className={i < rating ? "text-primary" : "text-dark-foreground/20"}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}
