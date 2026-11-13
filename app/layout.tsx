import type { Metadata, Viewport } from "next";
import { getDict } from "@/lib/i18n";
import { site } from "@/lib/site";
import "./globals.css";

const t = getDict("uk");

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: t.meta.title,
  description: t.meta.description,
  applicationName: site.brand,
};

export const viewport: Viewport = { themeColor: "#0A0A0A", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={t.htmlLang}>
      <head><link rel="preconnect" href="https://images.unsplash.com" /></head>
      <body>
        <a className="skip" href="#main">{t.skip}</a>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
