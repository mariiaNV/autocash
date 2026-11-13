import { getDict } from "@/lib/i18n";
import { site, type Locale } from "@/lib/site";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ServiceChooser from "@/components/ServiceChooser";
import Marquee from "@/components/Marquee";
import WhyUs from "@/components/WhyUs";
import CarWash from "@/components/CarWash";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import Enhance from "@/components/Enhance";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = getDict(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: site.brand,
    slogan: t.slogan,
    description: t.meta.description,
    url: site.url + (locale === "ru" ? "/ru" : "/"),
    image: site.url + "/og.jpg",
    telephone: site.phone.href.replace("tel:", ""),
    inLanguage: t.htmlLang,
    address: {
      "@type": "PostalAddress",
      streetAddress: "вулиця Балківська, 130",
      addressLocality: locale === "ru" ? "Одесса" : "Одеса",
      addressRegion: locale === "ru" ? "Одесская область" : "Одеська область",
      addressCountry: "UA",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.city.lat, longitude: site.city.lng },
    areaServed: [{ "@type": "City", name: locale === "ru" ? "Одесса" : "Одеса" }, { "@type": "AdministrativeArea", name: locale === "ru" ? "Одесская область" : "Одеська область" }],
    makesOffer: t.footer.serviceLinks.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  };

  return (
    <>
      <Nav t={t} locale={locale} />
      <main id="main">
        <Hero t={t} />
        <ServiceChooser t={t} />
        <Marquee t={t} />
        <WhyUs t={t} />
        <CarWash t={t} locale={locale} />
        <Marquee t={t} reverse />
        <FinalCta t={t} />
      </main>
      <Footer t={t} />
      <MobileBar t={t} />
      <Enhance />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
