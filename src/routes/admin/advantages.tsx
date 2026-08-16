import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Pencil, Trash2, Award, GripVertical, Save, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { getAdvantages, upsertAdvantage, deleteAdvantage } from "@/lib/admin-actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/advantages")({
  component: AdminAdvantages,
});

interface AdvantageForm {
  id?: string;
  text: string;
  order: number;
  isActive: boolean;
}

const emptyForm: AdvantageForm = {
  text: "",
  order: 0,
  isActive: true,
};

function AdminAdvantages() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<AdvantageForm>(emptyForm);

  const { data: advantages = [], isLoading } = useQuery({
    queryKey: ["admin", "advantages"],
    queryFn: () => getAdvantages(),
  });

  const saveMutation = useMutation({
    mutationFn: (data: AdvantageForm) => upsertAdvantage({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "advantages"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      setDialogOpen(false);
      toast.success(form.id ? "Avantage mis à jour !" : "Avantage créé !");
    },
    onError: () => toast.error("Erreur lors de la sauvegarde"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdvantage({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "advantages"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      toast.success("Avantage supprimé !");
    },
    onError: () => toast.error("Erreur lors de la suppression"),
  });

  const openCreate = () => {
    setForm({ ...emptyForm, order: advantages.length });
    setDialogOpen(true);
  };

  const openEdit = (a: AdvantageForm & { id: string }) => {
    setForm({
      id: a.id,
      text: a.text,
      order: a.order,
      isActive: a.isActive,
    });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-brand">
            <Award className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em]">Gestion</span>
          </div>
          <h2
            className="mt-1 text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Avantages "Pourquoi nous"
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
      ) : advantages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <Award className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <p className="mt-4 text-sm text-muted-foreground">Aucun avantage configuré. Ajoutez-en un !</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {advantages.map((a) => (
            <div
              key={a.id}
              className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all duration-200 hover:border-brand/40 ${
                a.isActive ? "border-border bg-surface/50" : "border-border/50 bg-surface/20 opacity-60"
              }`}
            >
              <GripVertical className="h-5 w-5 shrink-0 text-muted-foreground/40" />
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="font-medium text-foreground text-sm">{a.text}</span>
              </div>
              <span className="text-xs text-muted-foreground">Ordre: {a.order}</span>
              {!a.isActive && (
                <span className="rounded-full bg-muted-foreground/20 px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                  Inactif
                </span>
              )}
              <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => openEdit(a as AdvantageForm & { id: string })}
                  className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-brand/10 hover:text-brand"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm("Supprimer cet avantage ?")) deleteMutation.mutate(a.id);
                  }}
                  className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog Form */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md border-border bg-background">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {form.id ? "Modifier l'avantage" : "Nouvel avantage"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveMutation.mutate(form);
            }}
            className="space-y-4 mt-4"
          >
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Texte de l'avantage *
              </label>
              <textarea
                value={form.text}
                onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                required
                rows={3}
                className="w-full resize-none rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-brand"
                placeholder="Ex: Solutions 100% sur-mesure adaptées à vos objectifs"
              />
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
