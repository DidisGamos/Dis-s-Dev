import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  FolderOpen,
  Upload,
  X,
  Save,
  Loader2,
  ExternalLink,
  Download,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { getProjects, upsertProject, deleteProject } from "@/lib/admin-actions";
import { uploadToCloudinary } from "@/lib/cloudinary-action";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/projects")({
  component: AdminProjects,
});

const CATEGORIES = [
  "Gastronomie & Luxe",
  "Web Application",
  "Mobile App",
  "Transport & Mobilité",
  "E-Commerce & B2B",
  "Solutions IA",
];

interface ProjectForm {
  id?: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  imageUrl: string;
  techs: string[];
  features: string[];
  results: string;
  siteUrl?: string;
  apkUrl?: string;
  order: number;
  isActive: boolean;
}

const emptyForm: ProjectForm = {
  title: "",
  category: "Web Application",
  shortDesc: "",
  fullDesc: "",
  imageUrl: "",
  techs: [""],
  features: [""],
  results: "",
  siteUrl: "",
  apkUrl: "",
  order: 0,
  isActive: true,
};

function AdminProjects() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: () => getProjects(),
  });

  const saveMutation = useMutation({
    mutationFn: (data: ProjectForm) =>
      upsertProject({
        data: {
          ...data,
          siteUrl: data.siteUrl?.trim() || null,
          apkUrl: data.apkUrl?.trim() || null,
          techs: data.techs.filter((t) => t.trim() !== ""),
          features: data.features.filter((f) => f.trim() !== ""),
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      setDialogOpen(false);
      toast.success(form.id ? "Projet mis à jour !" : "Projet créé !");
    },
    onError: () => toast.error("Erreur lors de la sauvegarde"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProject({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      toast.success("Projet supprimé !");
    },
    onError: () => toast.error("Erreur lors de la suppression"),
  });

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner un fichier image valide");
      return;
    }

    setUploadingImage(true);
    try {
      // Convert to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const base64 = reader.result as string;
          const res = await uploadToCloudinary({
            data: { file: base64, folder: "dis-dev-cms/projects" },
          });
          setForm((f) => ({ ...f, imageUrl: res.url }));
          toast.success("Image uploadée sur Cloudinary avec succès !");
        } catch (err) {
          console.error(err);
          toast.error("Erreur lors de l'upload vers Cloudinary");
        } finally {
          setUploadingImage(false);
        }
      };
    } catch (err) {
      console.error(err);
      setUploadingImage(false);
      toast.error("Erreur de lecture de l'image");
    }
  };

  const openCreate = () => {
    setForm({ ...emptyForm, order: projects.length });
    setDialogOpen(true);
  };

  const openEdit = (p: ProjectForm & { id: string }) => {
    setForm({
      id: p.id,
      title: p.title,
      category: p.category,
      shortDesc: p.shortDesc,
      fullDesc: p.fullDesc,
      imageUrl: p.imageUrl,
      techs: p.techs.length > 0 ? p.techs : [""],
      features: p.features.length > 0 ? p.features : [""],
      results: p.results,
      siteUrl: p.siteUrl || "",
      apkUrl: p.apkUrl || "",
      order: p.order,
      isActive: p.isActive,
    });
    setDialogOpen(true);
  };

  const addTech = () => setForm((f) => ({ ...f, techs: [...f.techs, ""] }));
  const removeTech = (i: number) =>
    setForm((f) => ({ ...f, techs: f.techs.filter((_, idx) => idx !== i) }));
  const updateTech = (i: number, val: string) =>
    setForm((f) => ({
      ...f,
      techs: f.techs.map((t, idx) => (idx === i ? val : t)),
    }));

  const addFeature = () => setForm((f) => ({ ...f, features: [...f.features, ""] }));
  const removeFeature = (i: number) =>
    setForm((f) => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }));
  const updateFeature = (i: number, val: string) =>
    setForm((f) => ({
      ...f,
      features: f.features.map((feat, idx) => (idx === i ? val : feat)),
    }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-brand">
            <FolderOpen className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em]">Gestion</span>
          </div>
          <h2
            className="mt-1 text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Portfolio & Projets
          </h2>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:shadow-[var(--shadow-glow)]"
        >
          <Plus className="h-4 w-4" /> Ajouter un projet
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <p className="mt-4 text-sm text-muted-foreground">Aucun projet configuré. Ajoutez-en un !</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className={`group overflow-hidden rounded-3xl border transition-all duration-300 hover:border-brand/50 hover:shadow-lg ${
                p.isActive ? "border-border bg-surface/50" : "border-border/50 bg-surface/20 opacity-60"
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-muted-foreground">
                    <FolderOpen className="h-12 w-12 opacity-30" />
                  </div>
                )}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => openEdit(p as ProjectForm & { id: string })}
                    className="grid h-8 w-8 place-items-center rounded-full bg-background/90 text-foreground backdrop-blur hover:bg-brand hover:text-brand-foreground"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Supprimer ce projet ?")) deleteMutation.mutate(p.id);
                    }}
                    className="grid h-8 w-8 place-items-center rounded-full bg-background/90 text-foreground backdrop-blur hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="rounded-full bg-brand/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-foreground backdrop-blur">
                    {p.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.shortDesc}</p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {p.techs.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-surface px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                  {p.techs.length > 3 && (
                    <span className="rounded-md border border-border bg-surface px-2 py-0.5 text-[10px] text-muted-foreground">
                      +{p.techs.length - 3}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    {p.siteUrl && (
                      <a
                        href={p.siteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" /> Web
                      </a>
                    )}
                    {p.apkUrl && (
                      <a
                        href={p.apkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand hover:underline flex items-center gap-1"
                      >
                        <Download className="h-3 w-3" /> APK
                      </a>
                    )}
                  </div>
                  <span>Ordre: {p.order}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog Form */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl border-border bg-background max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {form.id ? "Modifier le projet" : "Nouveau projet"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!form.imageUrl) {
                toast.error("Veuillez ajouter une image pour le projet");
                return;
              }
              saveMutation.mutate(form);
            }}
            className="space-y-4 mt-4"
          >
            {/* Image Upload with Cloudinary */}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Image du projet (Cloudinary) *
              </label>
              <div className="flex items-center gap-4">
                {form.imageUrl ? (
                  <div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-xl border border-border">
                    <img src={form.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, imageUrl: "" }))}
                      className="absolute top-1 right-1 grid h-6 w-6 place-items-center rounded-full bg-black/70 text-white hover:bg-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-28 w-44 shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border transition-colors hover:border-brand/60"
                  >
                    {uploadingImage ? (
                      <Loader2 className="h-6 w-6 animate-spin text-brand" />
                    ) : (
                      <>
                        <Upload className="h-6 w-6 text-muted-foreground" />
                        <span className="mt-1 text-[11px] text-muted-foreground">Uploader</span>
                      </>
                    )}
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-xs font-medium text-foreground hover:border-brand/40"
                  >
                    <Upload className="h-3.5 w-3.5" /> Choisir une image
                  </button>
                  <div>
                    <input
                      value={form.imageUrl}
                      onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                      placeholder="Ou collez l'URL directe de l'image"
                      className="w-full rounded-xl border border-input bg-background/50 px-3 py-1.5 text-xs outline-none focus:border-brand"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Titre du projet *
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  required
                  className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-brand"
                  placeholder="Ex: Maison Savanna"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Catégorie *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm text-foreground outline-none focus:border-brand"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Description courte *
              </label>
              <input
                value={form.shortDesc}
                onChange={(e) => setForm((f) => ({ ...f, shortDesc: e.target.value }))}
                required
                className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-brand"
                placeholder="Ex: Restaurant gastronomique contemporain d'exception..."
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Description complète *
              </label>
              <textarea
                value={form.fullDesc}
                onChange={(e) => setForm((f) => ({ ...f, fullDesc: e.target.value }))}
                required
                rows={4}
                className="w-full resize-none rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-brand"
                placeholder="Description détaillée de l'étude de cas, objectifs et réalisations..."
              />
            </div>

            {/* Technologies */}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Technologies utilisées
              </label>
              <div className="space-y-2">
                {form.techs.map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={t}
                      onChange={(e) => updateTech(i, e.target.value)}
                      className="flex-1 rounded-xl border border-input bg-background/50 px-4 py-2 text-sm outline-none focus:border-brand"
                      placeholder="Ex: React / Next.js, Tailwind CSS"
                    />
                    {form.techs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTech(i)}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTech}
                  className="text-xs font-semibold text-brand hover:underline"
                >
                  + Ajouter une technologie
                </button>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Fonctionnalités clés
              </label>
              <div className="space-y-2">
                {form.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={feat}
                      onChange={(e) => updateFeature(i, e.target.value)}
                      className="flex-1 rounded-xl border border-input bg-background/50 px-4 py-2 text-sm outline-none focus:border-brand"
                      placeholder="Ex: Système de réservation en ligne avec conciergerie"
                    />
                    {form.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(i)}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-xs font-semibold text-brand hover:underline"
                >
                  + Ajouter une fonctionnalité
                </button>
              </div>
            </div>

            {/* Results */}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Impact & Résultats *
              </label>
              <input
                value={form.results}
                onChange={(e) => setForm((f) => ({ ...f, results: e.target.value }))}
                required
                className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-brand"
                placeholder="Ex: 85% Ingrédients locaux · Expérience 5 étoiles · Réservation 24/7"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  URL du site (Optionnel)
                </label>
                <input
                  type="url"
                  value={form.siteUrl}
                  onChange={(e) => setForm((f) => ({ ...f, siteUrl: e.target.value }))}
                  className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-brand"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Lien Téléchargement APK (Optionnel)
                </label>
                <input
                  type="url"
                  value={form.apkUrl}
                  onChange={(e) => setForm((f) => ({ ...f, apkUrl: e.target.value }))}
                  className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-brand"
                  placeholder="https://drive.google.com/..."
                />
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
                disabled={saveMutation.isPending || uploadingImage}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:shadow-[var(--shadow-glow)] disabled:opacity-50"
              >
                {saveMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {form.id ? "Mettre à jour" : "Créer le projet"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
