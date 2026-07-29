import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { z } from "zod";

export interface AiProjectAnalysis {
  category: string;
  recommendedStack: string[];
  suggestedFeatures: string[];
  estimatedTimeline: string;
  complexityScore: "Simple" | "Moyen" | "Complexe" | "Entreprise";
  aiSummary: string;
}

/**
 * Crée une instance du provider Groq via Vercel AI SDK
 */
function getGroqModel() {
  const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY,
  });
  return groq("llama-3.3-70b-versatile");
}

/**
 * Générateur IA Serveur via Vercel AI SDK + Groq (Llama 3.3 70B)
 */
async function callServerAiModel(systemPrompt: string, userPrompt: string): Promise<string> {
  // Groq via Vercel AI SDK generateText
  try {
    const model = getGroqModel();
    const { text } = await generateText({
      model,
      system: systemPrompt,
      prompt: userPrompt,
    });
    if (text && text.trim().length > 0) {
      return text.trim();
    }
  } catch (err) {
    console.error("[Vercel AI SDK / Groq] Erreur de génération :", err);
  }

  return "Je suis DisBot, l'assistant IA de l'agence Dis's Dev. Comment puis-je vous aider dans votre projet digital ?";
}

// Server Function TanStack Start : Chatbot IA 100% dynamique via Groq
export const chatBotServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ message: z.string() }).parse(data))
  .handler(async ({ data }): Promise<string> => {
    const systemPrompt = `Tu es DisBot, l'assistant virtuel officiel de l'agence digitale "Dis's Dev" basée à Toliara, Madagascar.
Spécialités : Création de sites web ultra-rapides (React 19, Next.js, TanStack), applications mobiles (iOS/Android React Native), UI/UX Design (Figma), Marketing Digital & SEO, et intégration de solutions IA.
Contact : herllandysamoroschristy@gmail.com | +261 34 97 487 75
Réponds de manière naturelle, professionnelle, chaleureuse et pertinente en français. Sois concis (3 à 5 phrases max).`;

    return await callServerAiModel(systemPrompt, data.message);
  });

// Server Function TanStack Start : Analyseur IA de projet 100% dynamique via Groq
export const analyzeProjectServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ idea: z.string() }).parse(data))
  .handler(async ({ data }): Promise<AiProjectAnalysis> => {
    const { idea } = data;

    const systemPrompt = `Tu es un expert architecte logiciel et chef de projet chez l'agence Dis's Dev.
Analyse l'idée de projet suivante et génère une réponse structurée au format JSON strict :
{
  "category": "Nom de la catégorie de projet (ex: App Mobile, E-commerce, SaaS IA)",
  "recommendedStack": ["Tech1", "Tech2", "Tech3"],
  "suggestedFeatures": ["Fonctionnalité 1", "Fonctionnalité 2", "Fonctionnalité 3"],
  "estimatedTimeline": "Estimation du délai (ex: 3 à 5 semaines)",
  "complexityScore": "Simple" ou "Moyen" ou "Complexe" ou "Entreprise",
  "aiSummary": "Explication vivante et personnalisée de l'analyse du projet."
}
Réponds UNIQUEMENT par le JSON, sans aucun texte avant ou après.`;

    const rawResponse = await callServerAiModel(systemPrompt, `Idée du client : "${idea}"`);

    try {
      const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          category: parsed.category || "Projet Digital Sur-mesure",
          recommendedStack: parsed.recommendedStack || ["React 19", "TypeScript", "Tailwind CSS v4"],
          suggestedFeatures: parsed.suggestedFeatures || ["Interface fluide", "Sécurité", "SEO"],
          estimatedTimeline: parsed.estimatedTimeline || "3 à 5 semaines",
          complexityScore: parsed.complexityScore || "Moyen",
          aiSummary: parsed.aiSummary || rawResponse,
        };
      }
    } catch (err) {
      console.warn("[IA Analyze JSON Error]", err);
    }

    return {
      category: "Projet Digital Sur-mesure",
      recommendedStack: ["React 19", "TypeScript", "Tailwind CSS v4", "Vercel AI SDK"],
      suggestedFeatures: ["Design Responsive Dark Mode", "Validation Zod", "Architecture Cloud"],
      estimatedTimeline: "2 à 4 semaines",
      complexityScore: "Moyen",
      aiSummary: rawResponse,
    };
  });
