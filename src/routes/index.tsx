import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { AiChatbot } from "@/components/AiChatbot";
import { FadeInView } from "@/components/FadeInView";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dis's Dev — Agence digitale premium Madagascar (Web, Mobile & IA)" },
      {
        name: "description",
        content:
          "Dis's Dev transforme vos idées en solutions digitales d'excellence : sites web performants, applications mobiles, UI/UX design, marketing et intégrations IA.",
      },
      { property: "og:title", content: "Dis's Dev — De l'idée à la solution digitale" },
      {
        property: "og:description",
        content:
          "Agence digitale premium — Web, Mobile, UI/UX, Marketing, IA. Basée à Toliara, Madagascar.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-brand selection:text-brand-foreground">
      <Navbar />
      <main id="main-content">
        <Hero />
        <FadeInView direction="up" amount={0.15}>
          <Services />
        </FadeInView>
        <FadeInView direction="up" amount={0.15}>
          <WhyUs />
        </FadeInView>
        <FadeInView direction="up" amount={0.15}>
          <Process />
        </FadeInView>
        <FadeInView direction="up" amount={0.15}>
          <Projects />
        </FadeInView>
        <FadeInView direction="up" amount={0.15}>
          <Testimonials />
        </FadeInView>
        <FadeInView direction="up" amount={0.15}>
          <Contact />
        </FadeInView>
      </main>
      <Footer />
      {/* Widget Chatbot IA Flottant */}
      <AiChatbot />
    </div>
  );
}
