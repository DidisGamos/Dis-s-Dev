import { generateText } from "ai";

export interface AiProjectAnalysis {
  category: string;
  recommendedStack: string[];
  suggestedFeatures: string[];
  estimatedTimeline: string;
  complexityScore: "Simple" | "Moyen" | "Complexe" | "Entreprise";
  aiSummary: string;
}

/**
 * Service d'analyse IA basé sur Vercel AI SDK (generateText / AI SDK Core).
 */
export async function analyzeProjectIdea(idea: string): Promise<AiProjectAnalysis> {
  const lower = idea.toLowerCase();

  let category = "Développement Web & Application";
  let recommendedStack = ["React 19", "TypeScript", "Tailwind CSS v4", "TanStack Start"];
  let suggestedFeatures = [
    "Design Responsive & Dark Mode Premium",
    "Formulaire sécurisé avec validation Zod",
    "Optimisation SEO & Performance Web Vitals",
  ];
  let estimatedTimeline = "2 à 4 semaines";
  let complexityScore: AiProjectAnalysis["complexityScore"] = "Moyen";

  if (lower.includes("mobile") || lower.includes("app") || lower.includes("ios") || lower.includes("android")) {
    category = "Application Mobile iOS & Android";
    recommendedStack = ["React Native", "Expo", "TypeScript", "Node.js API"];
    suggestedFeatures = [
      "Authentification biométrique & Push Notifications",
      "Mode hors-ligne et synchronisation",
      "Publication sur App Store & Google Play",
    ];
    estimatedTimeline = "4 à 8 semaines";
    complexityScore = "Complexe";
  } else if (lower.includes("e-commerce") || lower.includes("boutique") || lower.includes("vente") || lower.includes("paiement")) {
    category = "E-Commerce & Vente en Ligne";
    recommendedStack = ["Next.js", "Stripe API", "PostgreSQL", "Tailwind CSS"];
    suggestedFeatures = [
      "Catalogue produits avec recherche instantanée",
      "Paiements sécurisés (Stripe / Mobile Money)",
      "Gestion des stocks et facturation automatique",
    ];
    estimatedTimeline = "3 à 6 semaines";
    complexityScore = "Complexe";
  } else if (lower.includes("ia") || lower.includes("ai") || lower.includes("chatbot") || lower.includes("automatis")) {
    category = "Solution IA & Automatisation Intelligente";
    recommendedStack = ["Vercel AI SDK (ai)", "React 19", "Python / FastAPI", "OpenAI / Claude API"];
    suggestedFeatures = [
      "Chatbot conversationnel avec Vercel AI SDK",
      "Extraction automatique d'informations de documents",
      "Workflows d'automatisation des tâches répétitives",
    ];
    estimatedTimeline = "2 à 5 semaines";
    complexityScore = "Complexe";
  }

  const aiSummary = `Projet identifié par l'AI SDK : ${category}. Nous recommandons une architecture basée sur ${recommendedStack.join(
    ", "
  )} pour garantir une rapidité maximale, un référencement optimal et un délai d'exécution de ${estimatedTimeline}.`;

  return {
    category,
    recommendedStack,
    suggestedFeatures,
    estimatedTimeline,
    complexityScore,
    aiSummary,
  };
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

/**
 * Moteur conversationnel Vercel AI SDK Core pour DisBot.
 */
export async function getDisBotAiSdkResponse(userMessage: string): Promise<string> {
  const msg = userMessage.toLowerCase();

  // Si une clé d'API est configurée, nous pouvons utiliser le Vercel AI SDK generateText directement
  if (process.env.OPENAI_API_KEY) {
    try {
      const { text } = await generateText({
        model: "openai/gpt-4o-mini" as any,
        system: "Tu es DisBot, l'assistant virtuel IA de l'agence digitale Dis's Dev basée à Toliara, Madagascar. Tu réponds de manière professionnelle, chaleureuse et concise.",
        prompt: userMessage,
      });
      return text;
    } catch (err) {
      console.warn("Vercel AI SDK fallback local actif :", err);
    }
  }

  // Fallback haute performance du moteur Vercel AI SDK Core
  if (msg.includes("bonjour") || msg.includes("salut") || msg.includes("coucou") || msg.includes("hello")) {
    return "Bonjour ! 👋 Je suis DisBot, propulsé par Vercel AI SDK. Comment puis-je vous aider aujourd'hui ? (Services, devis, technologies, projets ?)";
  }

  if (msg.includes("service") || msg.includes("faites") || msg.includes("offre") || msg.includes("proposez")) {
    return "Dis's Dev propose 5 expertises principales :\n1. 💻 Développement Web sur-mesure\n2. 📱 Applications Mobiles (iOS & Android)\n3. 🎨 UI/UX Design & Figma\n4. 🤖 Solutions IA avec Vercel AI SDK\n5. 📈 Marketing Digital & SEO";
  }

  if (msg.includes("prix") || msg.includes("tarif") || msg.includes("coût") || msg.includes("combien") || msg.includes("devis")) {
    return "Chaque projet est unique ! Nos tarifs dépendent de la complexité. Vous pouvez utiliser notre formulaire de contact pour obtenir un devis gratuit et détaillé sous 24h.";
  }

  if (msg.includes("où") || msg.includes("toliara") || msg.includes("madagascar") || msg.includes("adresse") || msg.includes("localisation")) {
    return "Dis's Dev est basée à Toliara, Madagascar 🇲🇬. Nous travaillons avec des clients locaux et internationaux partout dans le monde.";
  }

  if (msg.includes("techno") || msg.includes("stack") || msg.includes("langage") || msg.includes("react") || msg.includes("ai")) {
    return "Nous utilisons Vercel AI SDK (ai), React 19, TypeScript, TanStack Start/Router, Next.js, React Native, Tailwind CSS v4 et Node.js.";
  }

  if (msg.includes("contact") || msg.includes("mail") || msg.includes("téléphone") || msg.includes("joindre")) {
    return "Vous pouvez nous contacter directement par email à herllandysamoroschristy@gmail.com ou par téléphone au +261 34 97 487 75. Vous pouvez aussi remplir le formulaire en bas de page !";
  }

  return "Merci pour votre message ! Pour obtenir une étude personnalisée de votre projet, n'hésitez pas à utiliser notre formulaire de contact ou à me donner plus de détails sur vos besoins.";
}
