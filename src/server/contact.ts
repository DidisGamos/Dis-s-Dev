import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import prisma from "@/lib/prisma";

export const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "La description doit contenir au moins 10 caractères"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const submitContactForm = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    console.log("[SERVER] Nouveau message de contact reçu :", data);

    try {
      // 1. Sauvegarde dans la base de données
      await prisma.contactMessage.create({
        data: {
          name: data.name,
          email: data.email,
          company: data.company || null,
          service: data.service || null,
          budget: data.budget || null,
          message: data.message,
        },
      });
    } catch (dbErr) {
      console.error("[SERVER] Erreur d'enregistrement DB du message de contact :", dbErr);
    }

    try {
      // 2. Intégration Web3Forms si configuré
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY",
          subject: `Nouveau projet de ${data.name} (${data.company || "Particulier"})`,
          from_name: data.name,
          replyto: data.email,
          message: `Nom: ${data.name}\nEmail: ${data.email}\nEntreprise: ${data.company || 'N/A'}\nService: ${data.service || 'Non spécifié'}\nBudget: ${data.budget || 'Non spécifié'}\n\nMessage:\n${data.message}`,
        }),
      }).catch(() => null);

      if (response && response.ok) {
        return { success: true, message: "Votre message a été envoyé avec succès !" };
      }
    } catch (err) {
      console.warn("[SERVER] Fallback d'envoi mail utilisé :", err);
    }

    return {
      success: true,
      message: "Votre message a bien été pris en compte. Notre équipe vous recontacte sous 24h.",
    };
  });

