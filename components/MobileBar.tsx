import { Phone } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Btn } from "./ui";

/** Липка панель «Подзвонити / Оцінити» на телефонах — зʼявляється після першого екрана (enhance.ts). */
export default function MobileBar({ t }: { t: Dict }) {
  return (
    <div className="mbar" id="mbar">
      <a className="mbar__call" href={site.phone.href} aria-label={t.mbar.call}>
        <Phone className="ic" aria-hidden="true" />
      </a>
      <Btn href="#lead" magnetic={false} service="sell">{t.mbar.cta}</Btn>
    </div>
  );
}
