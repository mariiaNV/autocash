import type { Metadata, Viewport } from "next";
import { getDict } from "@/lib/i18n";
import { site } from "@/lib/site";
import "./globals.css";

const t = getDict("uk");

const bootScript = `(function(){try{
var h=history,d=document.documentElement;
if("scrollRestoration" in h)h.scrollRestoration="manual";
var n=performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];
if(!n||n.type==="reload"||n.type==="back_forward"){if(location.hash)h.replaceState(null,"",location.pathname+location.search);window.scrollTo(0,0);}
if(!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("js-anim");setTimeout(function(){d.classList.remove("js-anim")},3500);}
}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: t.meta.title,
  description: t.meta.description,
  applicationName: site.brand,
};

export const viewport: Viewport = { themeColor: "#0A0A0A", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={t.htmlLang} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        {/* До першого кадру: (1) після оновлення сторінка завжди відкривається зверху, без стрибків
            до збереженої позиції чи #якоря; (2) прехайд інтро-анімації, щоб не було «мигання». */}
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a className="skip" href="#main">{t.skip}</a>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
