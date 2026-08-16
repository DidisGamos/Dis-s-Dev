import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { useLanguage, LanguageProvider } from "../lib/i18n";

function NotFoundComponent() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t.notFound.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t.notFound.desc}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t.notFound.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t } = useLanguage();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t.errorPage.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t.errorPage.desc}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t.errorPage.retry}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t.errorPage.home}
          </a>
        </div>
      </div>
    </div>
  );
}

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Dis's Dev",
  url: "https://dis-dev.pages.dev",
  logo: "https://dis-dev.pages.dev/favicon.ico",
  description:
    "Agence digitale premium à Toliara, Madagascar spécialisée en création web, applications mobiles, UI/UX design et solutions IA.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toliara",
    addressCountry: "MG",
  },
  telephone: "+261349748775",
  email: "herllandysamoroschristy@gmail.com",
  sameAs: ["https://github.com/DidisGamos/Dis-s-Dev"],
  priceRange: "$$",
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dis's Dev — Agence Digitale Premium (Web, Mobile, UI/UX & IA)" },
      {
        name: "description",
        content:
          "Dis's Dev transforme vos idées en solutions digitales d'excellence : sites web performants, applications mobiles, design UI/UX et intégration IA à Madagascar.",
      },
      { name: "author", content: "Dis's Dev" },
      { name: "keywords", content: "agence digitale, développement web, application mobile, UI UX Madagascar, Toliara, IA, React, Nextjs" },
      
      /* OpenGraph Meta Tags */
      { property: "og:title", content: "Dis's Dev — Agence Digitale Premium" },
      {
        property: "og:description",
        content: "De l'idée à la solution digitale. Web, Mobile, UI/UX & IA.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Dis's Dev" },
      { property: "og:locale", content: "fr_FR" },

      /* Twitter Cards */
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Dis's Dev — Agence Digitale Premium" },
      {
        name: "twitter:description",
        content: "Création web, apps mobiles, UI/UX & solutions IA.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body>
        {children}
        <Toaster position="bottom-right" theme="dark" richColors />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Outlet />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
