import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Wrench,
  BarChart3,
  Award,
  GitBranch,
  FolderOpen,
  Quote,
  MessageSquare,
  ArrowRight,
  Sparkles,
  TrendingUp,
  DatabaseZap,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { getDashboardStats } from "@/lib/admin-actions";
import { seedInitialData } from "@/lib/seed-action";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const queryClient = useQueryClient();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: () => getDashboardStats(),
  });

  const seedMutation = useMutation({
    mutationFn: () => seedInitialData(),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      queryClient.invalidateQueries({ queryKey: ["public"] });
      toast.success(res.message);
    },
    onError: () => toast.error("Erreur lors de la synchronisation"),
  });

  const cards = [
    {
      title: "Services",
      count: stats?.servicesCount ?? 0,
      icon: Wrench,
      to: "/admin/services",
      color: "from-blue-500/20 to-blue-600/5",
      iconColor: "text-blue-400",
    },
    {
      title: "Statistiques",
      count: stats?.statsCount ?? 0,
      icon: BarChart3,
      to: "/admin/stats",
      color: "from-emerald-500/20 to-emerald-600/5",
      iconColor: "text-emerald-400",
    },
    {
      title: "Avantages",
      count: stats?.advantagesCount ?? 0,
      icon: Award,
      to: "/admin/advantages",
      color: "from-amber-500/20 to-amber-600/5",
      iconColor: "text-amber-400",
    },
    {
      title: "Processus",
      count: stats?.processStepsCount ?? 0,
      icon: GitBranch,
      to: "/admin/process",
      color: "from-purple-500/20 to-purple-600/5",
      iconColor: "text-purple-400",
    },
    {
      title: "Projets",
      count: stats?.projectsCount ?? 0,
      icon: FolderOpen,
      to: "/admin/projects",
      color: "from-rose-500/20 to-rose-600/5",
      iconColor: "text-rose-400",
    },
    {
      title: "Témoignages",
      count: stats?.testimonialsCount ?? 0,
      icon: Quote,
      to: "/admin/testimonials",
      color: "from-cyan-500/20 to-cyan-600/5",
      iconColor: "text-cyan-400",
    },
  ];

  const isEmpty =
    (stats?.servicesCount ?? 0) === 0 &&
    (stats?.projectsCount ?? 0) === 0 &&
    (stats?.testimonialsCount ?? 0) === 0;

  return (
    <div className="space-y-8">
      {/* Hero header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand">
            <Sparkles className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em]">
              Tableau de bord
            </span>
          </div>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Bienvenue dans le{" "}
            <span className="text-gradient">Back Office</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Gérez dynamiquement tout le contenu de votre site web Dis's Dev.
          </p>
        </div>

        {/* Sync / Seed button */}
        <button
          onClick={() => seedMutation.mutate()}
          disabled={seedMutation.isPending}
          className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-5 py-2.5 text-xs font-semibold text-brand transition-all hover:bg-brand/20 disabled:opacity-50"
        >
          {seedMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <DatabaseZap className="h-4 w-4" />
          )}
          {isEmpty ? "Initialiser les données par défaut" : "Synchroniser les données"}
        </button>
      </div>

      {/* Messages alert card */}
      <Link
        to="/admin/messages"
        className="group flex items-center justify-between rounded-2xl border border-brand/30 bg-gradient-to-r from-brand/10 to-brand/5 p-6 transition-all duration-300 hover:border-brand/50 hover:shadow-[0_0_30px_-10px_oklch(0.85_0.17_90/0.3)]"
      >
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/20">
            <MessageSquare className="h-7 w-7 text-brand" />
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Messages de contact</div>
            <div className="flex items-baseline gap-3">
              <span
                className="text-3xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {isLoading ? "—" : stats?.totalMessages ?? 0}
              </span>
              {(stats?.unreadMessages ?? 0) > 0 && (
                <span className="flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-bold text-brand-foreground">
                  <TrendingUp className="h-3 w-3" />
                  {stats?.unreadMessages} non lu{(stats?.unreadMessages ?? 0) > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand" />
      </Link>

      {/* Section cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.to}
            className="group relative overflow-hidden rounded-2xl border border-border bg-surface/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
          >
            <div
              className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${card.color} blur-xl transition-all duration-500 group-hover:scale-150`}
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div
                  className={`grid h-12 w-12 place-items-center rounded-xl bg-surface ${card.iconColor}`}
                >
                  <card.icon className="h-6 w-6" />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </div>
              <div className="mt-4">
                <div
                  className="text-3xl font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {isLoading ? "—" : card.count}
                </div>
                <div className="mt-1 text-sm font-medium text-muted-foreground">{card.title}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
