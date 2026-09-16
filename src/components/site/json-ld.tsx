import { COMPANY } from "@/data/company";
import { GEO_WITH_DATA } from "@/data/geo";
import { SITE_URL } from "@/lib/site";

/**
 * Разметка LocalBusiness для поиска и карт. Рейтинги сторонних сервисов сюда
 * намеренно не идут: Google не принимает чужие aggregateRating как свои.
 * Только связи (sameAs) - они и дают поиску склеить сайт с карточками.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY.brand,
    alternateName: COMPANY.brandPlain,
    description: `${COMPANY.tagline}: ${COMPANY.city} и ${COMPANY.region}.`,
    url: SITE_URL,
    telephone: COMPANY.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.city,
      addressRegion: COMPANY.region,
      streetAddress: COMPANY.baseAddress.replace(/^г\. Уфа,\s*/, ""),
      addressCountry: "RU",
    },
    areaServed: [COMPANY.city, COMPANY.region],
    sameAs: [COMPANY.telegramUrl, ...GEO_WITH_DATA.map((g) => g.url)],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
