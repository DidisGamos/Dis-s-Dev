import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Language = "fr" | "en";

export interface Translations {
  nav: {
    home: string;
    services: string;
    about: string;
    process: string;
    projects: string;
    testimonials: string;
    contact: string;
    cta: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleGradient: string;
    titleEnd: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    tags: string;
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    startProject: string;
    items: Array<{
      title: string;
      desc: string;
      details: string[];
    }>;
  };
  whyUs: {
    badge: string;
    title: string;
    subtitle: string;
    advantages: string[];
    metrics: Array<{ k: string; v: string }>;
  };
  process: {
    badge: string;
    title: string;
    subtitle: string;
    steps: Array<{ n: string; t: string; d: string }>;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    similarCta: string;
    viewDetails: string;
    demoTitle: string;
    deviceDesktop: string;
    deviceMobile: string;
    aboutProject: string;
    keyFeatures: string;
    techUsed: string;
    impact: string;
    requestSimilar: string;
    visitSite: string;
    downloadApk: string;
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      role: string;
      content: string;
      rating: number;
    }>;
  };
  contact: {
    badge: string;
    titleStart: string;
    titleGradient: string;
    subtitle: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    nameLabel: string;
    emailInputLabel: string;
    companyLabel: string;
    serviceLabel: string;
    messageLabel: string;
    aiAnalyzeBtn: string;
    aiAnalyzeLoading: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successDesc: string;
    sendAnother: string;
  };
  footer: {
    tagline: string;
    rights: string;
  };
  notFound: {
    title: string;
    desc: string;
    backHome: string;
  };
  errorPage: {
    title: string;
    desc: string;
    retry: string;
    home: string;
  };
  bot: {
    welcome: string;
    typing: string;
    placeholder: string;
  };
}

const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      home: "Accueil",
      services: "Services",
      about: "À propos",
      process: "Processus",
      projects: "Projets",
      testimonials: "Témoignages",
      contact: "Contact",
      cta: "Discuter",
    },
    hero: {
      badge: "Agence digitale premium — Madagascar",
      titleStart: "Transformons vos ",
      titleGradient: "idées",
      titleEnd: " en solutions digitales.",
      subtitle:
        "Nous créons des expériences digitales modernes sur-mesure : sites web ultra-rapides, applications mobiles intuitives, design UI/UX captivant et intégrations d'IA avancées.",
      ctaPrimary: "Discuter de votre projet",
      ctaSecondary: "Découvrir nos services",
      tags: "Développement Web · Mobile · UI/UX · Marketing Digital · IA",
    },
    services: {
      badge: "Nos Expertises",
      title: "Une expertise complète, un seul partenaire.",
      subtitle:
        "De l'analyse de votre besoin jusqu'à la mise en production, nous concevons chaque brique de votre écosystème digital.",
      startProject: "Démarrer un projet",
      items: [
        {
          title: "Web Development",
          desc: "Sites web modernes, performants, sécurisés et optimisés pour la conversion SEO & E-commerce.",
          details: ["React / Next.js / TanStack", "E-commerce & SaaS", "Architecture Cloud rapide", "SEO & Performance Web Vitals"],
        },
        {
          title: "Applications Mobiles",
          desc: "Applications mobiles iOS & Android fluides avec une expérience utilisateur optimale.",
          details: ["Apps iOS & Android", "UI/UX Intuitif", "Mode Hors Ligne", "Notifications Push & API"],
        },
        {
          title: "UI/UX Design",
          desc: "Interfaces captivantes et systèmes de design pensés pour maximiser l'engagement.",
          details: ["Prototypage Figma", "Design Systems", "Recherche Utilisateur", "Audit d'Ergonomie"],
        },
        {
          title: "Marketing Digital",
          desc: "Stratégies de croissance digitale sur-mesure pour développer votre audience et booster vos ventes.",
          details: ["Référencement SEO / SEA", "Stratégie de Contenu", "Acquisition de Leads", "Analyse de Données"],
        },
        {
          title: "Solutions IA & Automatisation",
          desc: "Intégration d'agents IA, chatbots sur-mesure et automatisation des processus d'affaires.",
          details: ["Chatbots intelligents", "Intégration LLM / OpenAI", "Automatisation de Workflows", "Analyse prédictive"],
        },
      ],
    },
    whyUs: {
      badge: "Pourquoi nous",
      title: "Pourquoi choisir Dis's Dev ?",
      subtitle:
        "Une équipe d'experts passionnés, une méthodologie axée sur le résultat produit et un souci du détail sans compromis.",
      advantages: [
        "Solutions 100% sur-mesure adaptées à vos objectifs",
        "Design moderne, épuré et orienté conversion",
        "Stack technique moderne, rapide et ultra-sécurisée",
        "Accompagnement personnalisé et suivi continu",
        "Innovation continue et intégration de solutions IA",
      ],
      metrics: [
        { k: "+50", v: "Projets livrés" },
        { k: "+100", v: "Idées transformées" },
        { k: "24/7", v: "Support & Maintenance" },
        { k: "100%", v: "Satisfaction client" },
      ],
    },
    process: {
      badge: "Notre Processus",
      title: "De l'idée à la mise en ligne.",
      subtitle: "Une méthodologie éprouvée et transparente à chaque étape de votre projet.",
      steps: [
        { n: "01", t: "Cadrage & Stratégie", d: "Nous analysons vos besoins, définissons le cahier des charges et la vision produit." },
        { n: "02", t: "Conception & UI/UX", d: "Création des maquettes interactives, wireframes et prototypes fidèles à votre marque." },
        { n: "03", t: "Développement Agile", d: "Écriture d'un code propre, rapide et optimisé pour le SEO avec des tests rigoureux." },
        { n: "04", t: "Livraison & Suivi", d: "Déploiement en ligne, formation à la prise en main et support technique continu." },
      ],
    },
    projects: {
      badge: "Portfolio",
      title: "Des projets pensés pour convertir.",
      subtitle: "Découvrez une sélection de nos réalisations web, mobiles et IA conçues pour booster la croissance de nos clients.",
      similarCta: "Discuter d'un projet similaire",
      viewDetails: "En savoir plus",
      demoTitle: "Détails du projet",
      deviceDesktop: "Écran Desktop",
      deviceMobile: "Vue Mobile",
      aboutProject: "À propos du projet",
      keyFeatures: "Fonctionnalités clés",
      techUsed: "Technologies utilisées",
      impact: "Impact & Résultats",
      requestSimilar: "Demander une étude similaire",
      visitSite: "Visiter le site",
      downloadApk: "Télécharger l'APK",
    },
    testimonials: {
      badge: "Témoignages",
      title: "Ce que disent nos clients.",
      subtitle: "La satisfaction de nos partenaires est notre meilleure carte de visite.",
      items: [
        {
          name: "Haja R.",
          role: "CEO, Madagascar Logistics",
          content: "Dis's Dev a transformé notre système de réservation web. Leur réactivité et leur maîtrise technique dépassent nos attentes. Une vraie équipe de pros !",
          rating: 5,
        },
        {
          name: "Sarah M.",
          role: "Fondatrice, E-Shop Luxury",
          content: "Notre taux de conversion a augmenté de 70% après la refonte UI/UX réalisée par Dis's Dev. Le site est d'une rapidité incroyable et très facile à utiliser.",
          rating: 5,
        },
        {
          name: "Jean-Philippe B.",
          role: "CTO, FinTech Solution",
          content: "L'intégration d'IA et l'automatisation de nos flux clients ont été gérées de main de maître. Un accompagnement 5 étoiles du début à la fin.",
          rating: 5,
        },
      ],
    },
    contact: {
      badge: "Contact & Devis IA",
      titleStart: "Votre projet commence ",
      titleGradient: "ici.",
      subtitle:
        "Décrivez votre idée. Vous pouvez également utiliser notre Assistant IA pour concevoir instantanément la stack technique et les fonctionnalités de votre projet !",
      emailLabel: "Email direct",
      phoneLabel: "Téléphone & WhatsApp",
      locationLabel: "Localisation",
      nameLabel: "Nom complet *",
      emailInputLabel: "Email *",
      companyLabel: "Entreprise (Optionnel)",
      serviceLabel: "Service souhaité",
      messageLabel: "Description du projet *",
      aiAnalyzeBtn: "Analyser mon idée avec l'IA",
      aiAnalyzeLoading: "Analyse...",
      submitBtn: "Envoyer ma demande de projet",
      submittingBtn: "Traitement & Envoi IA en cours...",
      successTitle: "Merci pour votre message !",
      successDesc: "Notre équipe va analyser votre demande et revenir vers vous sous 24 heures ouvrées.",
      sendAnother: "Envoyer un autre message",
    },
    footer: {
      tagline: "De l'idée à la solution digitale. Agence web, mobile & IA basée à Toliara, Madagascar.",
      rights: "Dis's Dev. Tous droits réservés.",
    },
    notFound: {
      title: "Page non trouvée",
      desc: "La page que vous recherchez n'existe pas ou a été déplacée.",
      backHome: "Retourner à l'accueil",
    },
    errorPage: {
      title: "Une erreur est survenue",
      desc: "Un problème est survenu lors du chargement. Vous pouvez réessayer ou revenir à l'accueil.",
      retry: "Réessayer",
      home: "Accueil",
    },
    bot: {
      welcome: "Bonjour ! Je suis DisBot (propulsé par Vercel AI SDK & Groq Llama 3.3 70B). Posez-moi vos questions sur nos services, nos tarifs ou votre futur projet !",
      typing: "AI SDK génère une réponse...",
      placeholder: "Posez votre question à l'IA...",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About Us",
      process: "Process",
      projects: "Projects",
      testimonials: "Testimonials",
      contact: "Contact",
      cta: "Let's Talk",
    },
    hero: {
      badge: "Premium Digital Agency — Madagascar",
      titleStart: "Transforming your ",
      titleGradient: "ideas",
      titleEnd: " into digital solutions.",
      subtitle:
        "We build modern, custom digital experiences: ultra-fast websites, intuitive mobile apps, captivating UI/UX design, and advanced AI integrations.",
      ctaPrimary: "Discuss your project",
      ctaSecondary: "Explore our services",
      tags: "Web Development · Mobile · UI/UX · Digital Marketing · AI",
    },
    services: {
      badge: "Our Expertise",
      title: "Complete expertise, single partner.",
      subtitle:
        "From requirements analysis to production deployment, we design every brick of your digital ecosystem.",
      startProject: "Start a project",
      items: [
        {
          title: "Web Development",
          desc: "Modern, high-performance, secure websites optimized for conversion, SEO & E-commerce.",
          details: ["React / Next.js / TanStack", "E-commerce & SaaS", "Fast Cloud Architecture", "SEO & Core Web Vitals"],
        },
        {
          title: "Mobile Applications",
          desc: "Fluid iOS & Android mobile apps delivering optimal user experiences.",
          details: ["iOS & Android Apps", "Intuitve UI/UX", "Offline Mode", "Push Notifications & API"],
        },
        {
          title: "UI/UX Design",
          desc: "Captivating interfaces and design systems crafted to maximize user engagement.",
          details: ["Figma Prototyping", "Design Systems", "User Research", "Usability Audit"],
        },
        {
          title: "Digital Marketing",
          desc: "Tailored digital growth strategies to grow your audience and boost sales.",
          details: ["SEO / SEA Optimization", "Content Strategy", "Lead Acquisition", "Data Analytics"],
        },
        {
          title: "AI & Automation",
          desc: "Integration of AI agents, custom chatbots, and business process automation.",
          details: ["Smart Chatbots", "LLM / OpenAI Integration", "Workflow Automation", "Predictive Analytics"],
        },
      ],
    },
    whyUs: {
      badge: "Why Us",
      title: "Why Choose Dis's Dev?",
      subtitle:
        "A team of passionate experts, a product-driven methodology, and an uncompromised attention to detail.",
      advantages: [
        "100% custom solutions aligned with your goals",
        "Modern, clean, conversion-oriented design",
        "Modern, ultra-fast and secure tech stack",
        "Personalized support and continuous monitoring",
        "Continuous innovation with AI solutions",
      ],
      metrics: [
        { k: "+50", v: "Projects Delivered" },
        { k: "+100", v: "Ideas Transformed" },
        { k: "24/7", v: "Support & Maintenance" },
        { k: "100%", v: "Client Satisfaction" },
      ],
    },
    process: {
      badge: "Our Process",
      title: "From idea to launch.",
      subtitle: "A proven, transparent methodology at every stage of your project.",
      steps: [
        { n: "01", t: "Discovery & Strategy", d: "We analyze your needs, define specifications, and outline product vision." },
        { n: "02", t: "Design & UI/UX", d: "Crafting interactive mockups, wireframes, and prototypes true to your brand." },
        { n: "03", t: "Agile Development", d: "Writing clean, fast, SEO-optimized code with rigorous testing." },
        { n: "04", t: "Launch & Support", d: "Online deployment, onboarding training, and continuous technical support." },
      ],
    },
    projects: {
      badge: "Portfolio",
      title: "Projects designed to convert.",
      subtitle: "Discover a selection of our web, mobile, and AI achievements built to drive client growth.",
      similarCta: "Discuss a similar project",
      viewDetails: "Learn More",
      demoTitle: "Project Details",
      deviceDesktop: "Desktop View",
      deviceMobile: "Mobile View",
      aboutProject: "About the Project",
      keyFeatures: "Key Features",
      techUsed: "Technologies Used",
      impact: "Impact & Results",
      requestSimilar: "Request Similar Project",
      visitSite: "Visit Website",
      downloadApk: "Download APK",
    },
    testimonials: {
      badge: "Testimonials",
      title: "What our clients say.",
      subtitle: "Our partners' satisfaction is our strongest endorsement.",
      items: [
        {
          name: "Haja R.",
          role: "CEO, Madagascar Logistics",
          content: "Dis's Dev transformed our web booking system. Their responsiveness and technical expertise exceeded our expectations. A true team of professionals!",
          rating: 5,
        },
        {
          name: "Sarah M.",
          role: "Founder, E-Shop Luxury",
          content: "Our conversion rate increased by 70% after the UI/UX redesign by Dis's Dev. The site is incredibly fast and intuitive to use.",
          rating: 5,
        },
        {
          name: "Jean-Philippe B.",
          role: "CTO, FinTech Solution",
          content: "AI integration and workflow automation were expertly handled. 5-star support from start to finish.",
          rating: 5,
        },
      ],
    },
    contact: {
      badge: "Contact & AI Quote",
      titleStart: "Your project starts ",
      titleGradient: "here.",
      subtitle:
        "Describe your idea. You can also use our AI Assistant to instantly generate your project's tech stack and key features!",
      emailLabel: "Direct Email",
      phoneLabel: "Phone & WhatsApp",
      locationLabel: "Location",
      nameLabel: "Full Name *",
      emailInputLabel: "Email *",
      companyLabel: "Company (Optional)",
      serviceLabel: "Desired Service",
      messageLabel: "Project Description *",
      aiAnalyzeBtn: "Analyze my idea with AI",
      aiAnalyzeLoading: "Analyzing...",
      submitBtn: "Send Project Inquiry",
      submittingBtn: "Processing & Sending via AI...",
      successTitle: "Thank you for your message!",
      successDesc: "Our team will review your inquiry and get back to you within 24 hours.",
      sendAnother: "Send another message",
    },
    footer: {
      tagline: "From idea to digital solution. Web, mobile & AI agency based in Toliara, Madagascar.",
      rights: "Dis's Dev. All rights reserved.",
    },
    notFound: {
      title: "Page Not Found",
      desc: "The page you are looking for does not exist or has been moved.",
      backHome: "Back to Home",
    },
    errorPage: {
      title: "An error occurred",
      desc: "A problem occurred while loading. You can try again or return to home.",
      retry: "Try Again",
      home: "Home",
    },
    bot: {
      welcome: "Hello! I'm DisBot (powered by Vercel AI SDK & Groq Llama 3.3 70B). Ask me anything about our services, pricing, or your upcoming project!",
      typing: "AI SDK generating response...",
      placeholder: "Ask AI your question...",
    },
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("dis_dev_lang") as Language;
    if (saved && (saved === "fr" || saved === "en")) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("dis_dev_lang", newLang);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
