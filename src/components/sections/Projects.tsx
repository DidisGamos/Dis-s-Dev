import { useState } from "react";
import { ArrowRight, ExternalLink, Layers, Sparkles, CheckCircle2, Eye, Download } from "lucide-react";
import safewayImg from "@/assets/safeway-plateform.vercel.app.png";
import p2 from "@/assets/project-2.png";
import zotraImg from "@/assets/zotra-page.vercel.app.png";
import brandMarketImg from "@/assets/brand-market-one.vercel.app.png";
import { useLanguage, type Language } from "@/lib/i18n";

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
  siteUrl?: string;
  apkUrl?: string;
}

export const getProjectsData = (lang: Language): ProjectItem[] => [
  {
    id: "safeway",
    img: safewayImg,
    title: "SAFEWAY",
    cat: lang === "fr" ? "Web Application" : "Web Application",
    shortDesc:
      lang === "fr"
        ? "RÉSEAU DE VÉRIFICATION EN DIRECT — Connaissez votre trajet avant d'y monter."
        : "LIVE VERIFICATION NETWORK — Know your ride before you get in.",
    fullDesc:
      lang === "fr"
        ? "SAFEWAY est un réseau de vérification en direct pour la sécurité des transports. Scannez n'importe quelle plaque pour obtenir un score de sécurité instantané, partagez votre trajet en direct avec vos proches et déclenchez les secours en un seul clic — chaque trajet est vérifié."
        : "SAFEWAY is a live transit safety verification network. Scan any vehicle license plate for instant safety scores, share live trips with loved ones, and trigger emergency support with one click — every ride verified.",
    techs: ["React", "TypeScript", "Tailwind CSS", "Live Geolocation", "SOS Emergency Network"],
    features:
      lang === "fr"
        ? [
            "Vérification instantanée de plaque : score de sécurité, note et historique chauffeur en direct",
            "Partage de trajet en temps réel : itinéraire, chauffeur et heure d'arrivée transmises à vos proches",
            "Urgence SOS en 1 clic : alerte instantanée avec position et détails du véhicule",
          ]
        : [
            "Instant License Plate Verification: live safety score, ratings & driver history",
            "Real-time Trip Sharing: route, driver & ETA sent to your loved ones",
            "1-Click SOS Emergency: instant alert with live GPS position and vehicle info",
          ],
    results:
      lang === "fr"
        ? "10 000+ taxis vérifiés · 50 000+ passagers actifs · Réponse SOS 24/7"
        : "10,000+ taxis verified · 50,000+ active users · 24/7 SOS response",
    siteUrl: "https://safeway-plateform.vercel.app/",
  },
  {
    id: "design-course",
    img: p2,
    title: "Design Course",
    cat: lang === "fr" ? "Mobile App" : "Mobile App",
    shortDesc:
      lang === "fr"
        ? "Application mobile d'apprentissage du design UI/UX avec cours interactifs et certifications."
        : "Mobile learning platform for UI/UX design with interactive courses and certifications.",
    fullDesc:
      lang === "fr"
        ? "Une application mobile éducative complète dédiée à l'apprentissage du design UI/UX. Elle propose des parcours de formation structurés, des cours vidéo HD, des exercices pratiques interactifs, un système de progression avec badges et certifications, ainsi qu'une communauté intégrée pour échanger entre apprenants et mentors."
        : "A comprehensive mobile educational app dedicated to UI/UX design learning. It offers structured training tracks, HD video courses, interactive exercises, gamified badges and certificates, and a built-in community connecting learners with mentors.",
    techs: ["React Native", "TypeScript", "Firebase", "Expo", "Lottie Animations"],
    features:
      lang === "fr"
        ? [
            "Cours vidéo HD avec progression personnalisée",
            "Exercices pratiques et quiz interactifs",
            "Système de badges, certifications et classements",
          ]
        : [
            "HD video courses with personalized progress tracking",
            "Hands-on exercises and interactive quizzes",
            "Badges, certificates, and leaderboard ranking system",
          ],
    results:
      lang === "fr"
        ? "+10k apprenants actifs et taux de complétion de 78% sur les parcours."
        : "+10k active learners with a 78% course completion rate.",
    apkUrl: "https://drive.google.com/file/d/1Wk1hcRyPRFGDMdfuBegWRun7aoCui-DG/view?usp=sharing",
  },
  {
    id: "zotra",
    img: zotraImg,
    title: "Zotra",
    cat: lang === "fr" ? "Transport & Mobilité" : "Transport & Mobility",
    shortDesc:
      lang === "fr"
        ? "Nouvelle mobilité à Toliara — Déplacez-vous à Toliara avec confiance."
        : "Next-gen mobility in Toliara — Move around Toliara with complete confidence.",
    fullDesc:
      lang === "fr"
        ? "Zotra est la solution de mobilité intelligente développée pour Toliara, Madagascar. Que ce soit pour l'université, le travail ou l'aéroport, réservez votre transport en 4 étapes simples (Demande -> Examen -> Assignation chauffeur -> Trajet) avec validation réactive et support 24/7."
        : "Zotra is the smart mobility platform built for Toliara, Madagascar. Whether for university, work, or airport transfers, book your trip in 4 easy steps (Request -> Review -> Driver Assignment -> Trip) with fast approval and 24/7 support.",
    techs: ["React", "TypeScript", "Tailwind CSS", "Android APK", "Web & Mobile App"],
    features:
      lang === "fr"
        ? [
            "Réservation rapide : réservez votre transport en quelques secondes depuis votre smartphone",
            "Service fiable & examiné : demande validée par notre équipe avec réponse en < 5 min",
            "Conçu pour Toliara : développé spécifiquement pour les besoins locaux de transport à Madagascar",
          ]
        : [
            "Fast booking: reserve transit in seconds right from your mobile device",
            "Reliable & reviewed service: trip request validated by team within < 5 min",
            "Built for Toliara: specifically crafted for Madagascar's local transit needs",
          ],
    results:
      lang === "fr"
        ? "100% Fiable · 24/7 Disponible · Support < 5 min · Présence locale à Toliara"
        : "100% Reliable · 24/7 Available · < 5 min Support · Local presence in Toliara",
    siteUrl: "https://zotra-page.vercel.app/",
  },
  {
    id: "brand-market",
    img: brandMarketImg,
    title: "Brand Market",
    cat: lang === "fr" ? "E-Commerce & B2B" : "E-Commerce & B2B",
    shortDesc:
      lang === "fr"
        ? "Marketplace B2B & B2C internationale — Sourcing direct usine, devis RFQ et fabricants vérifiés."
        : "Global B2B & B2C Marketplace — Direct factory sourcing, RFQ quotes & verified suppliers.",
    fullDesc:
      lang === "fr"
        ? "Brand Market est une marketplace e-commerce globale connectant les acheteurs et les fournisseurs mondiaux. La plateforme intègre la soumission de demandes de devis usine (RFQ), le marquage OEM personnalisé, un programme de Garantie Commerciale pour protéger les transactions et le suivi d'expédition internationale en temps réel."
        : "Brand Market is a global e-commerce marketplace connecting international buyers and verified suppliers. The platform features direct factory quotation requests (RFQ), custom OEM logo branding, secure Trade Assurance for order protection, and real-time international shipment tracking.",
    techs: ["React / Next.js", "TypeScript", "Tailwind CSS", "Vercel", "B2B RFQ Engine", "Global Trade"],
    features:
      lang === "fr"
        ? [
            "Demandes de devis direct usine (RFQ) et personnalisation de logo OEM",
            "Garantie Commerciale & protection des commandes auprès de fabricants vérifiés",
            "Catalogue multi-catégories, remises groupées B2B (-15% Extra) et promos déstockage",
          ]
        : [
            "Direct factory quotation requests (RFQ) and custom OEM logo branding",
            "Trade Assurance & order protection with verified global manufacturers",
            "Multi-category catalog, B2B bulk order discounts (-15% Extra), and clearance deals",
          ],
    results:
      lang === "fr"
        ? "+500 fabricants vérifiés · Offres B2B exclusives · Expédition mondiale 24/7"
        : "500+ verified suppliers · Exclusive B2B deals · 24/7 express global shipping",
    siteUrl: "https://brand-market-one.vercel.app/",
  },
];

export function Projects() {
  const { lang, t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Tous");

  const projectsData = getProjectsData(lang);

  const categories = lang === "fr"
    ? ["Tous", "Web Application", "Mobile App", "Transport & Mobilité", "E-Commerce & B2B"]
    : ["All", "Web Application", "Mobile App", "Transport & Mobility", "E-Commerce & B2B"];

  const allCategoryLabel = lang === "fr" ? "Tous" : "All";

  const filteredProjects = (activeCategory === "Tous" || activeCategory === "All")
    ? projectsData
    : projectsData.filter((p) => p.cat === activeCategory);

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

        {/* Filtres de catégorie de projets */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const label = (cat === "Tous" || cat === "All")
              ? (lang === "fr" ? "Tous les projets" : "All Projects")
              : cat;
            const isActive = activeCategory === cat || ((cat === "Tous" || cat === "All") && (activeCategory === "Tous" || activeCategory === "All"));
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === "Tous" || cat === "All" ? allCategoryLabel : cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-brand text-brand-foreground shadow-md"
                    : "border border-border bg-surface/60 text-muted-foreground hover:border-brand/40 hover:text-foreground"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProject(p)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProject(p);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Voir les détails du projet ${p.title}`}
              className="project-card group relative cursor-pointer overflow-hidden rounded-3xl border border-border bg-surface text-left transition-all duration-300 hover:border-brand/50 hover:shadow-[0_8px_40px_-12px_oklch(0.85_0.17_90/0.15)] focus:outline-none focus:ring-2 focus:ring-brand"
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

              {/* Action buttons — Visit Site / Download APK */}
              {(p.siteUrl || p.apkUrl) && (
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {p.siteUrl && (
                    <a
                      href={p.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-background/80 px-3.5 py-2 text-xs font-semibold text-foreground backdrop-blur-md transition-all hover:bg-brand hover:text-brand-foreground hover:border-brand hover:shadow-[var(--shadow-glow)]"
                      aria-label={`Visiter le site ${p.title}`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {t.projects.visitSite}
                    </a>
                  )}
                  {p.apkUrl && (
                    <a
                      href={p.apkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/90 px-3.5 py-2 text-xs font-semibold text-brand-foreground backdrop-blur-md transition-all hover:bg-brand hover:shadow-[var(--shadow-glow)]"
                      aria-label={`Télécharger l'APK de ${p.title}`}
                    >
                      <Download className="h-3.5 w-3.5" />
                      {t.projects.downloadApk}
                    </a>
                  )}
                </div>
              )}

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
                  <span>{t.projects.viewDetails}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Détails du projet */}
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

                {/* Liste des fonctionnalités clés */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {t.projects.keyFeatures}
                  </h4>
                  <div className="mt-3 grid gap-2.5">
                    {selectedProject.features.map((feat) => (
                      <div
                        key={feat}
                        className="flex items-start gap-2.5 rounded-xl border border-border bg-surface p-3 text-xs text-foreground"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-brand mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </div>
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

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    {selectedProject.siteUrl && (
                      <a
                        href={selectedProject.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-brand hover:text-brand"
                      >
                        <ExternalLink className="h-4 w-4" /> {t.projects.visitSite}
                      </a>
                    )}
                    {selectedProject.apkUrl && (
                      <a
                        href={selectedProject.apkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-5 py-2.5 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-brand-foreground hover:shadow-[var(--shadow-glow)]"
                      >
                        <Download className="h-4 w-4" /> {t.projects.downloadApk}
                      </a>
                    )}
                  </div>
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
