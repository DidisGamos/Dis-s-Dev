import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Pencil, Trash2, GitBranch, GripVertical, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getProcessSteps, upsertProcessStep, deleteProcessStep } from "@/lib/admin-actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/process")({
  component: AdminProcess,
});

interface ProcessStepForm {
  id?: string;
  stepNumber: string;
  title: string;
  description: string;
  order: number;
  isActive: boolean;
}

const emptyForm: ProcessStepForm = {
  stepNumber: "01",
  title: "",
  description: "",
  order: 0,
  isActive: true,
};

function AdminProcess() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<ProcessStepForm>(emptyForm);

  const { data: steps = [], isLoading } = useQuery({
    queryKey: ["admin", "process"],
    queryFn: () => getProcessSteps(),
  });

  const saveMutation = useMutation({
    mutationFn: (data: ProcessStepForm) => upsertProcessStep({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "process"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      setDialogOpen(false);
      toast.success(form.id ? "Étape mise à jour !" : "Étape créée !");
    },
    onError: () => toast.error("Erreur lors de la sauvegarde"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProcessStep({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "process"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      toast.success("Étape supprimée !");
    },
    onError: () => toast.error("Erreur lors de la suppression"),
  });

  const openCreate = () => {
    const nextNum = (steps.length + 1).toString().padStart(2, "0");
    setForm({ ...emptyForm, stepNumber: nextNum, order: steps.length });
    setDialogOpen(true);
  };

  const openEdit = (s: ProcessStepForm & { id: string }) => {
    setForm({
      id: s.id,
      stepNumber: s.stepNumber,
      title: s.title,
      description: s.description,
      order: s.order,
      isActive: s.isActive,
    });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-brand">
            <GitBranch className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em]">Gestion</span>
          </div>
          <h2
            className="mt-1 text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Processus de travail
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
      ) : steps.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <GitBranch className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <p className="mt-4 text-sm text-muted-foreground">Aucune étape configurée. Ajoutez-en une !</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.id}
              className={`group relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-200 hover:border-brand/40 ${
                s.isActive ? "border-border bg-surface/50" : "border-border/50 bg-surface/20 opacity-60"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-brand/40 bg-background text-base font-bold text-brand shadow-sm">
                    {s.stepNumber}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => openEdit(s as ProcessStepForm & { id: string })}
                      className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-brand/10 hover:text-brand"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Supprimer cette étape ?")) deleteMutation.mutate(s.id);
                      }}
                      className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="mt-4 font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.description}</p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground">
                <span>Ordre: {s.order}</span>
                {!s.isActive && (
                  <span className="rounded-full bg-muted-foreground/20 px-2 py-0.5 font-bold uppercase text-muted-foreground">
                    Inactif
                  </span>
                )}
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
              {form.id ? "Modifier l'étape" : "Nouvelle étape"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveMutation.mutate(form);
            }}
            className="space-y-4 mt-4"
          >
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Numéro *
                </label>
                <input
                  value={form.stepNumber}
                  onChange={(e) => setForm((f) => ({ ...f, stepNumber: e.target.value }))}
                  required
                  className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-brand"
                  placeholder="01"
                />
              </div>
              <div className="col-span-2">
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Titre *
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  required
                  className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-brand"
                  placeholder="Ex: Cadrage & Stratégie"
                />
              </div>
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
                placeholder="Description détaillée de l'étape..."
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
