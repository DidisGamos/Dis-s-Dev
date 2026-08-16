import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function runSeed() {
  console.log("🌱 Début du seed de la base de données...");

  // 1. Services Seed
  const existingServices = await prisma.service.count();
  if (existingServices === 0) {
    console.log("➕ Insertion des services...");
    const services = [
      {
        title: "Web Development",
        description:
          "Sites web modernes, performants, sécurisés et optimisés pour la conversion SEO & E-commerce.",
        icon: "Code2",
        details: [
          "React / Next.js / TanStack",
          "E-commerce & SaaS",
          "Architecture Cloud rapide",
          "SEO & Performance Web Vitals",
        ],
        order: 0,
        isActive: true,
      },
      {
        title: "Applications Mobiles",
        description:
          "Applications mobiles iOS & Android fluides avec une expérience utilisateur optimale.",
        icon: "Smartphone",
        details: [
          "Apps iOS & Android",
          "UI/UX Intuitif",
          "Mode Hors Ligne",
          "Notifications Push & API",
        ],
        order: 1,
        isActive: true,
      },
      {
        title: "UI/UX Design",
        description:
          "Interfaces captivantes et systèmes de design pensés pour maximiser l'engagement.",
        icon: "Palette",
        details: [
          "Prototypage Figma",
          "Design Systems",
          "Recherche Utilisateur",
          "Audit d'Ergonomie",
        ],
        order: 2,
        isActive: true,
      },
      {
        title: "Marketing Digital",
        description:
          "Stratégies de croissance digitale sur-mesure pour développer votre audience et booster vos ventes.",
        icon: "TrendingUp",
        details: [
          "Référencement SEO / SEA",
          "Stratégie de Contenu",
          "Acquisition de Leads",
          "Analyse de Données",
        ],
        order: 3,
        isActive: true,
      },
      {
        title: "Solutions IA & Automatisation",
        description:
          "Intégration d'agents IA, chatbots sur-mesure et automatisation des processus d'affaires.",
        icon: "Bot",
        details: [
          "Chatbots intelligents",
          "Intégration LLM / OpenAI",
          "Automatisation de Workflows",
          "Analyse prédictive",
        ],
        order: 4,
        isActive: true,
      },
    ];

    for (const s of services) {
      await prisma.service.create({ data: s });
    }
  } else {
    console.log(`ℹ️ ${existingServices} services déjà présents.`);
  }

  // 2. Stats Seed
  const existingStats = await prisma.stat.count();
  if (existingStats === 0) {
    console.log("➕ Insertion des statistiques...");
    const stats = [
      { value: "+50", label: "Projets livrés", order: 0, isActive: true },
      { value: "+100", label: "Idées transformées", order: 1, isActive: true },
      { value: "24/7", label: "Support & Maintenance", order: 2, isActive: true },
      { value: "100%", label: "Satisfaction client", order: 3, isActive: true },
    ];

    for (const s of stats) {
      await prisma.stat.create({ data: s });
    }
  } else {
    console.log(`ℹ️ ${existingStats} statistiques déjà présentes.`);
  }

  // 3. Advantages Seed
  const existingAdvantages = await prisma.advantage.count();
  if (existingAdvantages === 0) {
    console.log("➕ Insertion des avantages...");
    const advantages = [
      { text: "Solutions 100% sur-mesure adaptées à vos objectifs", order: 0, isActive: true },
      { text: "Design moderne, épuré et orienté conversion", order: 1, isActive: true },
      { text: "Stack technique moderne, rapide et ultra-sécurisée", order: 2, isActive: true },
      { text: "Accompagnement personnalisé et suivi continu", order: 3, isActive: true },
      { text: "Innovation continue et intégration de solutions IA", order: 4, isActive: true },
    ];

    for (const a of advantages) {
      await prisma.advantage.create({ data: a });
    }
  } else {
    console.log(`ℹ️ ${existingAdvantages} avantages déjà présents.`);
  }

  // 4. Process Steps Seed
  const existingProcess = await prisma.processStep.count();
  if (existingProcess === 0) {
    console.log("➕ Insertion des étapes de processus...");
    const steps = [
      {
        stepNumber: "01",
        title: "Cadrage & Stratégie",
        description:
          "Nous analysons vos besoins, définissons le cahier des charges et la vision produit.",
        order: 0,
        isActive: true,
      },
      {
        stepNumber: "02",
        title: "Conception & UI/UX",
        description:
          "Création des maquettes interactives, wireframes et prototypes fidèles à votre marque.",
        order: 1,
        isActive: true,
      },
      {
        stepNumber: "03",
        title: "Développement Agile",
        description:
          "Écriture d'un code propre, rapide et optimisé pour le SEO avec des tests rigoureux.",
        order: 2,
        isActive: true,
      },
      {
        stepNumber: "04",
        title: "Livraison & Suivi",
        description:
          "Déploiement en ligne, formation à la prise en main et support technique continu.",
        order: 3,
        isActive: true,
      },
    ];

    for (const step of steps) {
      await prisma.processStep.create({ data: step });
    }
  } else {
    console.log(`ℹ️ ${existingProcess} étapes de processus déjà présentes.`);
  }

  // 5. Projects Seed
  const existingProjects = await prisma.project.count();
  if (existingProjects === 0) {
    console.log("➕ Insertion des projets...");
    const projects = [
      {
        title: "Maison Savanna",
        category: "Gastronomie & Luxe",
        shortDesc:
          "Restaurant gastronomique à Toliara — L'art de savourer autrement et haute cuisine contemporaine.",
        fullDesc:
          "Maison Savanna est une table gastronomique contemporaine d'exception située face au lagon de la Baie de Saint-Augustin à Toliara. Le site offre une immersion sensorielle complète : découverte de la philosophie du Chef Exécutif Andry Ravelojaona, consultation interactive de la carte & plats signatures (Filet de Zébu au Voatsiperifery, Crevettes flambées au Dzama), exploration des espaces raffinés (Le Grand Restaurant, Terrasse du Lagon, Chef's Table) et réservation de table en ligne avec conciergerie intégrée.",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
        techs: ["React / Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Design UI/UX Luxe", "Online Booking"],
        features: [
          "Système de réservation de table en ligne & service conciergerie haut de gamme",
          "Carte gastronomique interactive : plats signatures, accords mets & vins et valorisation du terroir malgache",
          "Immersion visuelle & espaces : Le Grand Restaurant, Terrasse du Lagon, Chef's Table (8 couverts) & Salon privé",
        ],
        results: "85% Ingrédients locaux · Expérience digitale 5 étoiles · Réservation fluide 24/7",
        siteUrl: "https://m-savana.vercel.app/",
        apkUrl: null,
        order: 0,
        isActive: true,
      },
      {
        title: "SAFEWAY",
        category: "Web Application",
        shortDesc: "RÉSEAU DE VÉRIFICATION EN DIRECT — Connaissez votre trajet avant d'y monter.",
        fullDesc:
          "SAFEWAY est un réseau de vérification en direct pour la sécurité des transports. Scannez n'importe quelle plaque pour obtenir un score de sécurité instantané, partagez votre trajet en direct avec vos proches et déclenchez les secours en un seul clic — chaque trajet est vérifié.",
        imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80",
        techs: ["React", "TypeScript", "Tailwind CSS", "Live Geolocation", "SOS Emergency Network"],
        features: [
          "Vérification instantanée de plaque : score de sécurité, note et historique chauffeur en direct",
          "Partage de trajet en temps réel : itinéraire, chauffeur et heure d'arrivée transmises à vos proches",
          "Urgence SOS en 1 clic : alerte instantanée avec position et détails du véhicule",
        ],
        results: "10 000+ taxis vérifiés · 50 000+ passagers actifs · Réponse SOS 24/7",
        siteUrl: "https://safeway-plateform.vercel.app/",
        apkUrl: null,
        order: 1,
        isActive: true,
      },
      {
        title: "Design Course",
        category: "Mobile App",
        shortDesc:
          "Application mobile d'apprentissage du design UI/UX avec cours interactifs et certifications.",
        fullDesc:
          "Une application mobile éducative complète dédiée à l'apprentissage du design UI/UX. Elle propose des parcours de formation structurés, des cours vidéo HD, des exercices pratiques interactifs, un système de progression avec badges et certifications, ainsi qu'une communauté intégrée pour échanger entre apprenants et mentors.",
        imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80",
        techs: ["React Native", "TypeScript", "Firebase", "Expo", "Lottie Animations"],
        features: [
          "Cours vidéo HD avec progression personnalisée",
          "Exercices pratiques et quiz interactifs",
          "Système de badges, certifications et classements",
        ],
        results: "+10k apprenants actifs et taux de complétion de 78% sur les parcours.",
        siteUrl: null,
        apkUrl: "https://drive.google.com/file/d/1Wk1hcRyPRFGDMdfuBegWRun7aoCui-DG/view?usp=sharing",
        order: 2,
        isActive: true,
      },
      {
        title: "Zotra",
        category: "Transport & Mobilité",
        shortDesc: "Nouvelle mobilité à Toliara — Déplacez-vous à Toliara avec confiance.",
        fullDesc:
          "Zotra est la solution de mobilité intelligente développée pour Toliara, Madagascar. Que ce soit pour l'université, le travail ou l'aéroport, réservez votre transport en 4 étapes simples avec validation réactive et support 24/7.",
        imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80",
        techs: ["React", "TypeScript", "Tailwind CSS", "Android APK", "Web & Mobile App"],
        features: [
          "Réservation rapide en quelques secondes depuis votre smartphone",
          "Service fiable & examiné avec validation en moins de 5 min",
          "Conçu spécifiquement pour les besoins locaux de transport à Madagascar",
        ],
        results: "100% Fiable · 24/7 Disponible · Support < 5 min · Présence locale à Toliara",
        siteUrl: "https://zotra-page.vercel.app/",
        apkUrl: null,
        order: 3,
        isActive: true,
      },
      {
        title: "Brand Market",
        category: "E-Commerce & B2B",
        shortDesc:
          "Marketplace B2B & B2C internationale — Sourcing direct usine, devis RFQ et fabricants vérifiés.",
        fullDesc:
          "Brand Market est une marketplace e-commerce globale connectant les acheteurs et les fournisseurs mondiaux avec devis direct usine, marquage OEM personnalisé et Garantie Commerciale.",
        imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80",
        techs: ["React / Next.js", "TypeScript", "Tailwind CSS", "Vercel", "B2B RFQ Engine", "Global Trade"],
        features: [
          "Demandes de devis direct usine (RFQ) et personnalisation de logo OEM",
          "Garantie Commerciale & protection des commandes auprès de fabricants vérifiés",
          "Catalogue multi-catégories, remises groupées B2B et promos déstockage",
        ],
        results: "+500 fabricants vérifiés · Offres B2B exclusives · Expédition mondiale 24/7",
        siteUrl: "https://brand-market-one.vercel.app/",
        apkUrl: null,
        order: 4,
        isActive: true,
      },
    ];

    for (const p of projects) {
      await prisma.project.create({ data: p });
    }
  } else {
    console.log(`ℹ️ ${existingProjects} projets déjà présents.`);
  }

  // 6. Testimonials Seed
  const existingTestimonials = await prisma.testimonial.count();
  if (existingTestimonials === 0) {
    console.log("➕ Insertion des témoignages...");
    const testimonials = [
      {
        name: "Haja R.",
        role: "CEO, Madagascar Logistics",
        content:
          "Dis's Dev a transformé notre système de réservation web. Leur réactivité et leur maîtrise technique dépassent nos attentes. Une vraie équipe de pros !",
        rating: 5,
        order: 0,
        isActive: true,
      },
      {
        name: "Sarah M.",
        role: "Fondatrice, E-Shop Luxury",
        content:
          "Notre taux de conversion a augmenté de 70% après la refonte UI/UX réalisée par Dis's Dev. Le site est d'une rapidité incroyable et très facile à utiliser.",
        rating: 5,
        order: 1,
        isActive: true,
      },
      {
        name: "Jean-Philippe B.",
        role: "CTO, FinTech Solution",
        content:
          "L'intégration d'IA et l'automatisation de nos flux clients ont été gérées de main de maître. Un accompagnement 5 étoiles du début à la fin.",
        rating: 5,
        order: 2,
        isActive: true,
      },
    ];

    for (const t of testimonials) {
      await prisma.testimonial.create({ data: t });
    }
  } else {
    console.log(`ℹ️ ${existingTestimonials} témoignages déjà présents.`);
  }

  console.log("✅ Seed terminé avec succès !");
  await prisma.$disconnect();
}

runSeed().catch((err) => {
  console.error("❌ Erreur pendant le seed :", err);
  process.exit(1);
});
