import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { JsonLd } from "@/components/site/json-ld";
import { Providers } from "@/components/providers";
import { COMPANY } from "@/data/company";
import { SITE_URL } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Полусухая стяжка пола в Уфе · ${COMPANY.brand}`,
    template: `%s · ${COMPANY.brand}`,
  },
  description:
    "Механизированная полусухая стяжка пола в Уфе и Башкортостане: толщина слоя рядом с ценой, бесплатный замер, цена после замера не меняется. Квартиры, дома, коммерция, объекты от 1000 м².",
  openGraph: {
    title: `Полусухая стяжка пола в Уфе · ${COMPANY.brand}`,
    description:
      "Толщина слоя рядом с ценой. Бесплатный замер, после него цена не меняется. Квартиры, дома, объекты от 1000 м².",
    locale: "ru_RU",
    type: "website",
    siteName: COMPANY.brand,
  },
};

export const viewport: Viewport = {
  themeColor: "#131617",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-ink">
        <JsonLd />
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-md focus:bg-orange focus:px-4 focus:py-2 focus:text-ink"
          >
            К содержанию
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
