import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JetBrains_Mono, Manrope, Unbounded } from "next/font/google";
import { getDict, locales, localePath } from "@/lib/i18n";
import { site, type Locale } from "@/lib/site";

type Params = Promise<{ locale: string }>;

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const t = getDict(locale as Locale);
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: site.brand,
    alternates: {
      canonical: localePath(locale as Locale),
      languages: { uk: "/", ru: "/ru", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: site.brand,
      locale: t.ogLocale,
      alternateLocale: locale === "uk" ? ["ru_UA"] : ["uk_UA"],
      url: localePath(locale as Locale),
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: ["/og.jpg"] },
    robots: { index: true, follow: true },
    formatDetection: { telephone: true },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  return children;
}
