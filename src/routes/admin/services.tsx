import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Pencil, Trash2, Wrench, GripVertical, X, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getServices, upsertService, deleteService } from "@/lib/admin-actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/services")({
  component: AdminServices,
});

const ICON_OPTIONS = ["Code2", "Smartphone", "Palette", "TrendingUp", "Bot", "Globe", "Shield", "Zap", "Database", "Layout"];

interface ServiceForm {
  id?: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  order: number;
  isActive: boolean;
}

const emptyForm: ServiceForm = {
  title: "",
  description: "",
  icon: "Code2",
  details: [""],
  order: 0,
  isActive: true,
};

function AdminServices() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<ServiceForm>(emptyForm);

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["admin", "services"],
    queryFn: () => getServices(),
  });

  const saveMutation = useMutation({
    mutationFn: (data: ServiceForm) => upsertService({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "services"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      setDialogOpen(false);
      toast.success(form.id ? "Service mis à jour !" : "Service créé !");
    },
    onError: () => toast.error("Erreur lors de la sauvegarde"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteService({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "services"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      toast.success("Service supprimé !");
    },
    onError: () => toast.error("Erreur lors de la suppression"),
  });

  const openCreate = () => {
    setForm({ ...emptyForm, order: services.length });
    setDialogOpen(true);
  };

  const openEdit = (s: ServiceForm & { id: string }) => {
    setForm({
      id: s.id,
      title: s.title,
      description: s.description,
      icon: s.icon,
      details: s.details.length > 0 ? s.details : [""],
      order: s.order,
      isActive: s.isActive,
    });
    setDialogOpen(true);
  };

  const addDetail = () => setForm((f) => ({ ...f, details: [...f.details, ""] }));
  const removeDetail = (i: number) =>
    setForm((f) => ({ ...f, details: f.details.filter((_, idx) => idx !== i) }));
  const updateDetail = (i: number, val: string) =>
    setForm((f) => ({
      ...f,
      details: f.details.map((d, idx) => (idx === i ? val : d)),
    }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-brand">
            <Wrench className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em]">Gestion</span>
          </div>
          <h2
            className="mt-1 text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Services
          </h2>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:shadow-[var(--shadow-glow)]"
        >
          <Plus className="h-4 w-4" /> Ajouter
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
        </div>
      ) : services.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <Wrench className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <p className="mt-4 text-sm text-muted-foreground">Aucun service encore. Ajoutez-en un !</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {services.map((s) => (
            <div
              key={s.id}
              className={`group flex items-center gap-4 rounded-2xl border p-5 transition-all duration-200 hover:border-brand/40 ${
                s.isActive ? "border-border bg-surface/50" : "border-border/50 bg-surface/20 opacity-60"
              }`}
            >
              <GripVertical className="h-5 w-5 shrink-0 text-muted-foreground/40" />
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                <Wrench className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{s.title}</span>
                  {!s.isActive && (
                    <span className="rounded-full bg-muted-foreground/20 px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                      Inactif
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{s.description}</p>
              </div>
              <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => openEdit(s as ServiceForm & { id: string })}
                  className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-brand/10 hover:text-brand"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm("Supprimer ce service ?")) deleteMutation.mutate(s.id);
                  }}
                  className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg border-border bg-background max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {form.id ? "Modifier le service" : "Nouveau service"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveMutation.mutate({
                ...form,
                details: form.details.filter((d) => d.trim() !== ""),
              });
            }}
            className="space-y-4 mt-4"
          >
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Titre *
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
                className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-brand"
                placeholder="Ex: Web Development"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Description *
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                required
                rows={3}
                className="w-full resize-none rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-brand"
                placeholder="Description courte du service..."
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Icône
              </label>
              <div className="flex flex-wrap gap-2">
                {ICON_OPTIONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, icon }))}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                      form.icon === icon
                        ? "border-brand bg-brand/15 text-brand"
                        : "border-border text-muted-foreground hover:border-brand/40"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Détails
              </label>
              <div className="space-y-2">
                {form.details.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={d}
                      onChange={(e) => updateDetail(i, e.target.value)}
                      className="flex-1 rounded-xl border border-input bg-background/50 px-4 py-2.5 text-sm outline-none focus:border-brand"
                      placeholder={`Détail ${i + 1}`}
                    />
                    {form.details.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDetail(i)}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDetail}
                  className="text-xs font-semibold text-brand hover:underline"
                >
                  + Ajouter un détail
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Ordre
                </label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm((f) => ({ ...f, order: parseInt(e.target.value) || 0 }))}
                  className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-brand"
                />
              </div>
              <div className="flex items-end">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-input px-4 py-3 text-sm transition-colors hover:border-brand/40">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                    className="accent-brand"
                  />
                  <span className="font-medium">Actif</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={saveMutation.isPending}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:shadow-[var(--shadow-glow)] disabled:opacity-50"
              >
                {saveMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {form.id ? "Mettre à jour" : "Créer"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
