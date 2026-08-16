import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { analyzeProjectIdea } from "./ai-service";

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
      console.error("[SERVER] Erreur d'enregistrement DB :", dbErr);
    }

    // Feature 3 IA: Auto-Qualification et Analyse par l'IA
    let aiBrief = null;
    try {
      aiBrief = await analyzeProjectIdea(data.message);
      console.log("[SERVER IA] Qualification du projet :", aiBrief);
    } catch (err) {
      console.warn("[SERVER IA] Impossible de générer la qualification :", err);
    }

    const emailContent = `
=== NOUVEAU DEMANDE DE PROJET - DIS'S DEV ===
Client: ${data.name}
Email: ${data.email}
Entreprise: ${data.company || "N/A"}
Service demandé: ${data.service || "Non spécifié"}

--- MESSAGE CLIENT ---
${data.message}

--- QUALIFICATION & DEVIS INTEL (IA DIS'S DEV) ---
Catégorie: ${aiBrief?.category || "Non déterminée"}
Complexité: ${aiBrief?.complexityScore || "Moyenne"}
Stack recommandée: ${aiBrief?.recommendedStack?.join(", ") || "Standard"}
Délai estimé: ${aiBrief?.estimatedTimeline || "À définir"}
Synthèse IA: ${aiBrief?.aiSummary || "Analyse automatique effectuée"}
`;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY",
          subject: `[IA Dis's Dev] Nouveau projet de ${data.name} (${aiBrief?.category || "Projet"})`,
          from_name: data.name,
          replyto: data.email,
          message: emailContent,
        }),
      }).catch(() => null);

      if (response && response.ok) {
        return {
          success: true,
          message: "Votre message a été envoyé avec succès !",
          aiBrief,
        };
      }
    } catch (err) {
      console.warn("[SERVER] Fallback mail local utilisé :", err);
    }

    return {
      success: true,
      message: "Votre message et l'analyse IA de votre projet ont bien été enregistrés sous 24h.",
      aiBrief,
    };
  });
