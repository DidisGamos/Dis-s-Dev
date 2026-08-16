import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Wrench,
  BarChart3,
  Award,
  GitBranch,
  FolderOpen,
  MessageSquare,
  Quote,
  ArrowLeft,
  Menu,
  X,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  ShieldCheck,
  Loader2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { loginAdmin, verifyAdminSession } from "@/lib/auth-action";

export const Route = createFileRoute("/admin")({
  component: AdminProtectedLayout,
});

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/services", label: "Services", icon: Wrench },
  { to: "/admin/stats", label: "Statistiques", icon: BarChart3 },
  { to: "/admin/advantages", label: "Avantages", icon: Award },
  { to: "/admin/process", label: "Processus", icon: GitBranch },
  { to: "/admin/projects", label: "Projets", icon: FolderOpen },
  { to: "/admin/testimonials", label: "Témoignages", icon: Quote },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
];

function AdminProtectedLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Check saved session token on mount
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("dis_dev_admin_token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await verifyAdminSession({ data: { token } });
        setIsAuthenticated(res.valid);
        if (!res.valid) {
          localStorage.removeItem("dis_dev_admin_token");
        }
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPassword = password.trim();
    if (!cleanPassword) {
      toast.error("Veuillez saisir le mot de passe");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await loginAdmin({ data: { password: cleanPassword } });
      if (res.success && res.token) {
        localStorage.setItem("dis_dev_admin_token", res.token);
        setIsAuthenticated(true);
        setPassword("");
        toast.success(res.message);
      } else {
        toast.error(res.message || "Mot de passe incorrect");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la validation du mot de passe");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("dis_dev_admin_token");
    setIsAuthenticated(false);
    toast.success("Vous êtes déconnecté");
  };

  // Loading state while verifying session
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  // Not authenticated: Login Screen
  if (!isAuthenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-background px-4 text-foreground selection:bg-brand selection:text-brand-foreground">
        {/* Background ambient lighting */}
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

        <div className="relative w-full max-w-md">
          {/* Top Logo */}
          <div className="mb-8 flex flex-col items-center text-center">
            <Logo />
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-brand">
              <ShieldCheck className="h-3.5 w-3.5" />
              Espace Administrateur Sécurisé
            </div>
          </div>

          {/* Login Card */}
          <div className="overflow-hidden rounded-3xl border border-border bg-surface/70 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/30">
                <Lock className="h-6 w-6" />
              </div>
              <h2
                className="mt-4 text-2xl font-bold tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Accès au Back Office
              </h2>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Saisissez votre mot de passe pour gérer les contenus du site.
              </p>
            </div>

            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Saisir le mot de passe"
                    autoFocus
                    required
                    className="w-full rounded-2xl border border-input bg-background/60 px-4 py-3.5 pr-11 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-all duration-300 hover:shadow-[var(--shadow-glow)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Vérification...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> Déverrouiller l'accès
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 border-t border-border/50 pt-4 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Retour au site public
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated: Fixed Sidebar with Mobile & Desktop Collapse Controls
  const sidebarWidthClass = desktopCollapsed ? "lg:w-20" : "lg:w-72";
  const mainOffsetClass = desktopCollapsed ? "lg:pl-20" : "lg:pl-72";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Fixed Sidebar (Fixed position on Left, does not scroll with page) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r border-border bg-background/98 backdrop-blur-2xl transition-all duration-300 ease-in-out ${sidebarWidthClass} ${
          mobileMenuOpen
            ? "w-72 translate-x-0 shadow-2xl"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <Logo />
            {!desktopCollapsed && (
              <span className="rounded-md bg-brand/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand shrink-0">
                Admin
              </span>
            )}
          </div>

          {/* Mobile Collapse (Close) Button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Fermer le menu"
            className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground lg:hidden"
          >
            <X className="h-4 w-4 text-brand" />
            <span>Fermer</span>
          </button>
        </div>

        {/* Scrollable Navigation Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                title={desktopCollapsed ? item.label : undefined}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-brand/15 text-brand shadow-sm font-semibold"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground"
                } ${desktopCollapsed ? "justify-center px-0" : ""}`}
              >
                <item.icon className={`h-5 w-5 shrink-0 ${isActive ? "text-brand" : ""}`} />
                {!desktopCollapsed && <span className="truncate">{item.label}</span>}
                {!desktopCollapsed && item.label === "Messages" && (
                  <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-brand/20 px-1.5 text-[10px] font-bold text-brand">
                    •
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Fixed Sidebar Footer Actions */}
        <div className="shrink-0 border-t border-border p-3 space-y-1 bg-surface/30">
          {/* Desktop Collapse Toggle Button */}
          <button
            onClick={() => setDesktopCollapsed(!desktopCollapsed)}
            className="hidden lg:flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/50 px-3 py-2 text-xs font-medium text-muted-foreground transition-all hover:bg-surface hover:text-foreground"
            title={desktopCollapsed ? "Agrandir le menu" : "Replier le menu"}
          >
            {desktopCollapsed ? (
              <PanelLeftOpen className="h-4 w-4 text-brand" />
            ) : (
              <>
                <PanelLeftClose className="h-4 w-4" />
                <span>Replier la barre</span>
              </>
            )}
          </button>

          {/* Mobile Close Button in footer */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-surface"
          >
            <ChevronLeft className="h-4 w-4 text-brand" />
            <span>Replier le menu</span>
          </button>

          <Link
            to="/"
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground transition-all hover:bg-surface hover:text-foreground ${
              desktopCollapsed ? "justify-center" : ""
            }`}
            title="Retour au site"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            {!desktopCollapsed && <span>Retour au site</span>}
          </Link>

          <button
            onClick={handleLogout}
            className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-destructive/80 transition-all hover:bg-destructive/10 hover:text-destructive ${
              desktopCollapsed ? "justify-center" : ""
            }`}
            title="Déconnexion"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!desktopCollapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area (Dynamically offset based on sidebar state) */}
      <div className={`flex min-h-screen flex-col transition-all duration-300 ${mainOffsetClass}`}>
        {/* Sticky Header Topbar */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/80 px-4 sm:px-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Ouvrir le menu latéral"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-brand/50 hover:bg-surface-2 lg:hidden"
            >
              <Menu className="h-4 w-4 text-brand" />
              <span>Menu</span>
            </button>

            {/* Desktop Quick Collapse Button */}
            <button
              onClick={() => setDesktopCollapsed(!desktopCollapsed)}
              aria-label="Replier / Agrandir la barre latérale"
              className="hidden lg:grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {desktopCollapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </button>

            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand hidden sm:block" />
              <h1
                className="text-sm sm:text-base font-bold tracking-tight truncate"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Back Office Dis's Dev
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/50 px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Voir le site
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
            >
              <LogOut className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
