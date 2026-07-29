import { useState } from "react";
import { ArrowRight, ExternalLink, Layers, Sparkles, CheckCircle2, Monitor, Smartphone, Eye, Play } from "lucide-react";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import { useLanguage } from "@/lib/i18n";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export interface ProjectItem {
  id: string;
  img: string;
  title: string;
  cat: string;
  shortDesc: string;
  fullDesc: string;
  techs: string[];
  features: string[];
  results: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "saas-analytics",
    img: p1,
    title: "SaaS Analytics Dashboard",
    cat: "Web Application",
    shortDesc: "Plateforme d'analyse de données financières et de métriques en temps réel.",
    fullDesc:
      "Conception et développement d'un tableau de bord de métriques avancées pour entreprises SaaS. Visualisations interactives de KPI, rapports automatisés et intégration multi-devises.",
    techs: ["React 19", "TypeScript", "Recharts", "Tailwind CSS", "TanStack Query"],
    features: [
      "Tableaux de bord dynamiques temps réel",
      "Exportation de rapports PDF/Excel en 1 clic",
      "Gestion d'abonnements et facturation",
    ],
    results: "+45% d'engagement utilisateur et temps de chargement divisé par 3.",
  },
  {
    id: "fintech-mobile",
    img: p2,
    title: "FinTech Mobile App",
    cat: "Mobile App",
    shortDesc: "Application mobile de micro-finance et de gestion de portefeuille digital.",
    fullDesc:
      "Une application mobile hautement sécurisée permettant aux utilisateurs d'effectuer des transferts d'argent instantanés, de suivre leur budget mensuel et de gérer des micro-crédits.",
    techs: ["React Native", "TypeScript", "Node.js", "Zod", "Biométrie / FaceID"],
    features: [
      "Authentification biométrique ultra-sécurisée",
      "Transferts instantanés & QR Code",
      "Notifications push personnalisées",
    ],
    results: "+150k téléchargements en 6 mois et note de 4.8/5 sur les stores.",
  },
  {
    id: "retail-commerce",
    img: p3,
    title: "Retail Commerce Omnicanal",
    cat: "E-commerce",
    shortDesc: "Boutique en ligne haut de gamme avec système de paiement et gestion de stock.",
    fullDesc:
      "Plateforme E-commerce sur-mesure conçue pour une marque de distribution locale et internationale. Fluidité d'achat mobile-first, recherche instantanée et intégration paiement sécurisé.",
    techs: ["Next.js", "Tailwind CSS", "Stripe API", "PostgreSQL", "Prisma"],
    features: [
      "Panier d'achat ultra-fluide sans rechargement",
      "Paiements locaux & internationaux",
      "Synchronisation automatique du stock",
    ],
    results: "+80% de taux de conversion sur mobile et hausse du panier moyen.",
  },
  {
    id: "ai-dashboard",
    img: p4,
    title: "AI Automation Platform",
    cat: "SaaS Platform",
    shortDesc: "Plateforme SaaS d'automatisation des tâches et d'analyse prédictive IA.",
    fullDesc:
      "Solution d'intelligence artificielle automatisant le traitement documentaire, le tri des requêtes clients et la génération de synthèses stratégiques pour entreprises.",
    techs: ["React 19", "Python / FastAPI", "OpenAI / Claude API", "Tailwind v4"],
    features: [
      "Analyse automatique de documents PDF/Word",
      "Génération de compte-rendus intelligents",
      "Workflows personnalisables",
    ],
    results: "+300 heures de travail manuel économisées chaque mois.",
  },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number>(0);
  const { t } = useLanguage();

  return (
    <section id="projets" className="relative py-24 md:py-32" aria-label="Nos réalisations">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">{t.projects.badge}</p>
            <h2
              className="mt-3 text-4xl font-bold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.projects.title}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t.projects.subtitle}
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline focus:outline-none focus:ring-2 focus:ring-brand rounded-md p-1"
          >
            {t.projects.similarCta} <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projectsData.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setSelectedProject(p);
                setDeviceMode("desktop");
                setActiveFeatureIndex(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProject(p);
                  setDeviceMode("desktop");
                  setActiveFeatureIndex(0);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Voir les détails du projet ${p.title}`}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-border bg-surface text-left transition-all duration-300 hover:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p.img}
                  alt={`Capture d'écran du projet ${p.title}`}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6">
                <div>
                  <span className="inline-block rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand">
                    {p.cat}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{p.shortDesc}</p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-border bg-background/90 px-3 py-1.5 text-xs font-semibold text-brand backdrop-blur transition-all group-hover:bg-brand group-hover:text-brand-foreground">
                  <Eye className="h-3.5 w-3.5" />
                  <span>360°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Démo Interactive 360° du projet */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-3xl border-border bg-background p-6 md:p-8 max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand">
                    {selectedProject.cat}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-brand" /> {t.projects.demoTitle}
                  </span>
                </div>
                <DialogTitle className="mt-2 text-2xl font-bold md:text-3xl text-foreground">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {selectedProject.shortDesc}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-6">
                {/* Controls du Mode Démo Interactive (Desktop / Mobile Switcher) */}
                <div className="flex items-center justify-between rounded-xl border border-border bg-surface/50 p-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setDeviceMode("desktop")}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        deviceMode === "desktop"
                          ? "bg-brand text-brand-foreground shadow-md"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Monitor className="h-3.5 w-3.5" /> {t.projects.deviceDesktop}
                    </button>
                    <button
                      onClick={() => setDeviceMode("mobile")}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        deviceMode === "mobile"
                          ? "bg-brand text-brand-foreground shadow-md"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Smartphone className="h-3.5 w-3.5" /> {t.projects.deviceMobile}
                    </button>
                  </div>

                  <span className="hidden text-[11px] text-muted-foreground sm:flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-brand" /> Mode Démo 360° Interactif
                  </span>
                </div>

                {/* Zone de démonstration responsive interactive avec mockup */}
                <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-slate-950/80 p-4 transition-all min-h-[260px] md:min-h-[320px]">
                  {deviceMode === "desktop" ? (
                    <div className="w-full overflow-hidden rounded-lg border border-slate-800 shadow-2xl">
                      {/* En-tête navigateur virtuel */}
                      <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-400">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                        <span className="ml-2 truncate font-mono text-[10px] text-slate-500">
                          https://demo.dis-dev.mg/projects/{selectedProject.id}
                        </span>
                      </div>
                      <img
                        src={selectedProject.img}
                        alt={selectedProject.title}
                        className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105 md:h-64"
                      />
                    </div>
                  ) : (
                    /* Mockup de téléphone mobile */
                    <div className="relative mx-auto w-56 overflow-hidden rounded-[32px] border-4 border-slate-800 bg-black p-1 shadow-2xl">
                      <div className="absolute top-2 left-1/2 h-3.5 w-20 -translate-x-1/2 rounded-full bg-slate-800 z-10" />
                      <img
                        src={selectedProject.img}
                        alt={selectedProject.title}
                        className="h-80 w-full rounded-[24px] object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Tour interactif des fonctionnalités 360° */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                    <Play className="h-3.5 w-3.5 text-brand" /> Tour des fonctionnalités 360°
                  </h4>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {selectedProject.features.map((feat, index) => (
                      <button
                        key={feat}
                        onClick={() => setActiveFeatureIndex(index)}
                        className={`flex items-center gap-2 rounded-xl border p-3 text-left text-xs transition-all ${
                          activeFeatureIndex === index
                            ? "border-brand bg-brand/10 text-foreground font-semibold"
                            : "border-border bg-surface text-muted-foreground hover:border-brand/40"
                        }`}
                      >
                        <CheckCircle2
                          className={`h-4 w-4 shrink-0 ${
                            activeFeatureIndex === index ? "text-brand" : "text-muted-foreground/60"
                          }`}
                        />
                        <span>{feat}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {t.projects.aboutProject}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    {selectedProject.fullDesc}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {t.projects.techUsed}
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedProject.techs.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-foreground"
                      >
                        <Layers className="h-3 w-3 text-brand" /> {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-brand/30 bg-brand/5 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand">
                    <Sparkles className="h-4 w-4" /> {t.projects.impact}
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {selectedProject.results}
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <a
                    href="#contact"
                    onClick={() => setSelectedProject(null)}
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground hover:shadow-[var(--shadow-glow)]"
                  >
                    {t.projects.requestSimilar} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
