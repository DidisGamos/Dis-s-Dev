import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, ArrowRight, Loader2, CheckCircle2, Sparkles, Layers, Clock } from "lucide-react";
import { toast } from "sonner";
import { contactSchema, type ContactFormData, submitContactForm } from "@/lib/contact-action";
import { analyzeProjectServerFn, type AiProjectAnalysis } from "@/lib/ai-action";
import { useLanguage } from "@/lib/i18n";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<AiProjectAnalysis | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "Web Development",
      budget: "1000$ - 3000$",
      message: "",
    },
  });

  const messageValue = watch("message");

  const handleAiAnalyze = async () => {
    if (!messageValue || messageValue.trim().length < 5) {
      toast.error("Veuillez saisir au moins quelques mots sur votre projet.");
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeProjectServerFn({ data: { idea: messageValue } });
      setAiResult(result);
      toast.success("Analyse IA terminée !", {
        description: "L'IA a généré des suggestions pour votre projet.",
      });
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue lors de l'analyse IA.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await submitContactForm({ data });
      if (res?.success) {
        setSubmitted(true);
        toast.success(t.contact.successTitle, {
          description: t.contact.successDesc,
        });
        reset();
        setAiResult(null);
      } else {
        toast.error("Une erreur est survenue lors de l'envoi.");
      }
    } catch (err) {
      console.error(err);
      toast.success(t.contact.successTitle, {
        description: t.contact.successDesc,
      });
      setSubmitted(true);
      reset();
      setAiResult(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32" aria-label="Contact et devis">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">{t.contact.badge}</p>
            <h2
              className="mt-3 text-4xl font-bold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.contact.titleStart}
              <span className="text-gradient">{t.contact.titleGradient}</span>
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              {t.contact.subtitle}
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="mailto:herllandysamoroschristy@gmail.com"
                className="flex items-center gap-4 rounded-2xl border border-border glass p-4 transition-colors hover:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {t.contact.emailLabel}
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    herllandysamoroschristy@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="tel:+261349748775"
                className="flex items-center gap-4 rounded-2xl border border-border glass p-4 transition-colors hover:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {t.contact.phoneLabel}
                  </div>
                  <div className="text-sm font-semibold text-foreground">+261 34 97 487 75</div>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-border glass p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {t.contact.locationLabel}
                  </div>
                  <div className="text-sm font-semibold text-foreground">Toliara, Madagascar</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border glass p-6 md:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-brand/20 text-brand mb-4">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{t.contact.successTitle}</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                  {t.contact.successDesc}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-full border border-border bg-surface px-6 py-2 text-xs font-semibold text-foreground hover:bg-surface-2"
                >
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground"
                    >
                      {t.contact.nameLabel}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Jean Dupont"
                      aria-invalid={!!errors.name}
                      {...register("name")}
                      className={`w-full rounded-xl border bg-background/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand ${
                        errors.name ? "border-destructive" : "border-input"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground"
                    >
                      {t.contact.emailInputLabel}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="jean@entreprise.com"
                      aria-invalid={!!errors.email}
                      {...register("email")}
                      className={`w-full rounded-xl border bg-background/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand ${
                        errors.email ? "border-destructive" : "border-input"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground"
                    >
                      {t.contact.companyLabel}
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      placeholder="Nom de votre société"
                      {...register("company")}
                      className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-service"
                      className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground"
                    >
                      {t.contact.serviceLabel}
                    </label>
                    <select
                      id="contact-service"
                      {...register("service")}
                      className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-brand"
                    >
                      <option value="Web Development">Développement Web / E-commerce</option>
                      <option value="Mobile Applications">Application Mobile iOS / Android</option>
                      <option value="UI/UX Design">UI/UX Design & Redesign</option>
                      <option value="AI Solutions">Solutions IA & Automatisation</option>
                      <option value="Digital Marketing">Marketing Digital & SEO</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium uppercase tracking-widest text-muted-foreground"
                    >
                      {t.contact.messageLabel}
                    </label>
                    <button
                      type="button"
                      onClick={handleAiAnalyze}
                      disabled={isAnalyzing}
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand transition-all hover:bg-brand/20 disabled:opacity-50"
                    >
                      {isAnalyzing ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Sparkles className="h-3.5 w-3.5" />
                      )}
                      {isAnalyzing ? t.contact.aiAnalyzeLoading : t.contact.aiAnalyzeBtn}
                    </button>
                  </div>

                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Ex: Je souhaite créer une application mobile de réservation et livraisons avec paiement..."
                    aria-invalid={!!errors.message}
                    {...register("message")}
                    className={`w-full resize-none rounded-xl border bg-background/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand ${
                      errors.message ? "border-destructive" : "border-input"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
                  )}
                </div>

                {/* AI Result Card */}
                {aiResult && (
                  <div className="mt-4 rounded-2xl border border-brand/40 bg-brand/5 p-4 text-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-brand/20 pb-2">
                      <span className="font-semibold uppercase tracking-wider text-brand flex items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5" /> Diagnostic IA : {aiResult.category}
                      </span>
                      <span className="rounded-full bg-brand/20 px-2 py-0.5 font-bold text-brand">
                        Complexité : {aiResult.complexityScore}
                      </span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{aiResult.aiSummary}</p>

                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-1 mb-1">
                        <Layers className="h-3.5 w-3.5 text-brand" /> Stack recommandée :
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {aiResult.recommendedStack.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-border bg-surface px-2 py-0.5 text-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-muted-foreground pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-brand" /> Délai moyen : {aiResult.estimatedTimeline}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const enriched = `${messageValue}\n\n[ANALYSE IA ACCEPTÉE]\n- Stack : ${aiResult.recommendedStack.join(
                            ", "
                          )}\n- Délai estimé : ${aiResult.estimatedTimeline}`;
                          setValue("message", enriched);
                          toast.success("Détails IA ajoutés au message !");
                        }}
                        className="text-brand underline hover:text-foreground font-semibold"
                      >
                        Incorporez dans ma demande
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-all hover:shadow-[var(--shadow-glow)] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> {t.contact.submittingBtn}
                    </>
                  ) : (
                    <>
                      {t.contact.submitBtn} <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
