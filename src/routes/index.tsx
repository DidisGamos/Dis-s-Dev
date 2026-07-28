import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Code2,
  Smartphone,
  Palette,
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Facebook,
  Linkedin,
  Github,
  ChevronRight,
} from "lucide-react";

import logoImg from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dis's Dev — Agence digitale premium" },
      {
        name: "description",
        content:
          "Dis's Dev transforme vos idées en solutions digitales : sites web, applications, UI/UX, marketing et IA.",
      },
      { property: "og:title", content: "Dis's Dev — De l'idée à la solution digitale" },
      {
        property: "og:description",
        content:
          "Agence digitale premium — Web, Mobile, UI/UX, Marketing, IA. Basée à Toliara, Madagascar.",
      },
    ],
  }),
  component: LandingPage,
});

/* ---------- Brand Mark ---------- */
function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img src={logoImg} alt="Dis's Dev Logo" className="w-10" />
      <span className="text-lg font-semibold tracking-tight">
        Dis's <span className="text-brand">Dev</span>
      </span>
    </div>
  );
}

/* ---------- Navbar ---------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#accueil", label: "Accueil" },
    { href: "#services", label: "Services" },
    { href: "#projets", label: "Projets" },
    { href: "#apropos", label: "À propos" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#accueil" className="shrink-0">
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:shadow-[var(--shadow-glow)]"
          >
            Demander un devis
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          className="rounded-md border border-border p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground"
            >
              Demander un devis
            </a>
          </ul>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section
      id="accueil"
      className="relative isolate overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32"
    >
      {/* Background image + overlays */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        {/* floating particles */}
        <div className="absolute left-[10%] top-[30%] h-2 w-2 rounded-full bg-brand/70 animate-float" />
        <div
          className="absolute right-[15%] top-[50%] h-1.5 w-1.5 rounded-full bg-brand/60 animate-float"
          style={{ animationDelay: "1.2s" }}
        />
        <div
          className="absolute left-[30%] bottom-[20%] h-1 w-1 rounded-full bg-brand/80 animate-float"
          style={{ animationDelay: "2.4s" }}
        />
        {/* radial glow */}
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center animate-reveal">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-brand" />
            Agence digitale premium — 2026
          </div>

          <h1
            className="text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Transformons vos <span className="text-gradient">idées</span> en
            <br className="hidden md:block" /> solutions digitales.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Nous créons des expériences digitales modernes : sites web, applications, interfaces
            innovantes et solutions adaptées à votre croissance.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-foreground transition-all hover:shadow-[var(--shadow-glow)]"
            >
              Discuter de votre projet
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-surface"
            >
              Découvrir nos services
            </a>
          </div>

          <p className="mt-12 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Développement Web · Applications · UI/UX · Marketing Digital
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
const services = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Sites web modernes, performants et adaptés aux besoins des entreprises.",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    desc: "Applications mobiles intuitives avec une excellente expérience utilisateur.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Interfaces modernes pensées pour convertir les visiteurs en clients.",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    desc: "Stratégies digitales pour développer votre visibilité.",
  },
];

function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-brand">Services</p>
          <h2
            className="mt-3 text-4xl font-bold tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Une expertise complète, un seul partenaire.
          </h2>
          <p className="mt-4 text-muted-foreground">
            De la conception au lancement, nous construisons chaque brique de votre présence
            digitale.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-border glass p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand/50"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/0 blur-2xl transition-all duration-500 group-hover:bg-brand/20" />
              <div className="relative">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-brand opacity-0 transition-opacity group-hover:opacity-100">
                  En savoir plus <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Us ---------- */
const advantages = [
  "Solutions personnalisées",
  "Design moderne",
  "Technologies performantes",
  "Accompagnement professionnel",
  "Innovation et créativité",
];

function WhyUs() {
  return (
    <section id="apropos" className="relative py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-brand">Pourquoi nous</p>
            <h2
              className="mt-3 text-4xl font-bold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Pourquoi choisir Dis's Dev ?
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Une équipe passionnée, une approche produit, et un souci du détail qui fait la
              différence à chaque étape de votre projet.
            </p>

            <ul className="mt-8 space-y-3">
              {advantages.map((a) => (
                <li key={a} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-brand/15 text-brand">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-foreground">{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "+50", v: "Projets livrés" },
              { k: "+100", v: "Idées transformées" },
              { k: "24/7", v: "Support client" },
              { k: "100%", v: "Sur-mesure" },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-border glass p-6 transition-transform hover:-translate-y-1"
              >
                <div
                  className="text-4xl font-bold tracking-tight text-brand md:text-5xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.k}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
const steps = [
  { n: "01", t: "Analyse de votre idée", d: "Nous écoutons, cadrons et définissons la vision." },
  { n: "02", t: "Conception UI/UX", d: "Wireframes, maquettes et prototypes interactifs." },
  { n: "03", t: "Développement", d: "Code performant, testé et pensé pour évoluer." },
  { n: "04", t: "Livraison & accompagnement", d: "Mise en ligne, formation et support continu." },
];

function Process() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-brand">Notre processus</p>
          <h2
            className="mt-3 text-4xl font-bold tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            De l'idée à la mise en ligne.
          </h2>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent md:block" />
          <div className="grid gap-8 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <div className="grid h-16 w-16 place-items-center rounded-full border border-brand/40 bg-background text-lg font-bold text-brand">
                  {s.n}
                </div>
                <h3 className="mt-6 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
const projects = [
  { img: p1, title: "SaaS Analytics", cat: "Web Application" },
  { img: p2, title: "FinTech Mobile", cat: "Mobile App" },
  { img: p3, title: "Retail Commerce", cat: "E-commerce" },
  { img: p4, title: "AI Dashboard", cat: "SaaS Platform" },
];

function Projects() {
  return (
    <section id="projets" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-brand">Portfolio</p>
            <h2
              className="mt-3 text-4xl font-bold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Des projets pensés pour convertir.
            </h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
          >
            Voir plus <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <a
              key={p.title}
              href="#contact"
              className="group relative overflow-hidden rounded-3xl border border-border bg-surface"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-brand">{p.cat}</p>
                  <h3 className="mt-1.5 text-xl font-semibold">{p.title}</h3>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background/70 backdrop-blur transition-all group-hover:bg-brand group-hover:text-brand-foreground">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-brand">Contact</p>
            <h2
              className="mt-3 text-4xl font-bold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Votre projet commence <span className="text-gradient">ici.</span>
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Parlez-nous de votre idée. Nous revenons vers vous sous 24h avec un plan clair.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="mailto:herllandysamoroschristy@gmail.com"
                className="flex items-center gap-4 rounded-2xl border border-border glass p-4 transition-colors hover:border-brand/50"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Email
                  </div>
                  <div className="text-sm font-medium">herllandysamoroschristy@gmail.com</div>
                </div>
              </a>
              <a
                href="tel:+261349748775"
                className="flex items-center gap-4 rounded-2xl border border-border glass p-4 transition-colors hover:border-brand/50"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Téléphone
                  </div>
                  <div className="text-sm font-medium">+261 34 97 487 75</div>
                </div>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border border-border glass p-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Localisation
                  </div>
                  <div className="text-sm font-medium">Toliara, Madagascar</div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="rounded-3xl border border-border glass p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nom" name="name" placeholder="Votre nom" required />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="vous@email.com"
                required
              />
            </div>
            <Field label="Entreprise" name="company" placeholder="Nom de l'entreprise" />
            <div className="mt-4">
              <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Description du projet
              </label>
              <textarea
                name="project"
                rows={5}
                required
                placeholder="Parlez-nous de votre idée…"
                className="w-full resize-none rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand"
              />
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-all hover:shadow-[var(--shadow-glow)]"
            >
              {sent ? "Message envoyé ✓" : "Envoyer mon projet"}
              {!sent && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="mt-4 sm:mt-0">
      <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand"
      />
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">De l'idée à la solution digitale.</p>
        </div>
        <div className="flex items-center gap-3">
          {[
            { icon: Facebook, href: "#", label: "Facebook" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Github, href: "#", label: "GitHub" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:border-brand/50 hover:text-brand"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">© 2026 Dis's Dev. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
