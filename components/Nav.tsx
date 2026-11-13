import { Phone } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { site, type Locale } from "@/lib/site";
import { Btn } from "./ui";

function Logo({ label }: { label: string }) {
  return (
    <a className="logo" href="#top" aria-label={label}>
      <span className="logo__word">
        AVTO<b>CASH</b>
        <span className="logo__dot" aria-hidden="true" />
      </span>
    </a>
  );
}

function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  return (
    <div className="lang" role="group" aria-label={label}>
      {(["uk", "ru"] as Locale[]).map((l) => (
        <a
          key={l}
          href={localePath(l)}
          hrefLang={l}
          lang={l}
          data-lang={l}
          aria-current={l === locale ? "true" : undefined}
          className={l === locale ? "is-active" : undefined}
        >
          {l === "uk" ? "UA" : "RU"}
        </a>
      ))}
    </div>
  );
}

export default function Nav({ t, locale }: { t: Dict; locale: Locale }) {
  return (
    <>
      <header className="nav" id="nav">
        <div className="wrap nav__in">
          <Logo label={t.nav.home} />
          <nav aria-label={t.nav.aria} className="nav__menu">
            <ul className="nav__links">
              {t.nav.links.map((l) => (
                <li key={l.label} data-nav="">
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="nav__phone" href={site.phone.href} data-nav="">
            <Phone className="ic" aria-hidden="true" />
            {site.phone.display}
          </a>
          <div data-nav="">
            <LangSwitch locale={locale} label={t.nav.lang} />
          </div>
          <Btn href="#lead" size="sm" className="nav__cta" service="sell">
            {t.nav.cta}
          </Btn>
          <button className="burger" type="button" aria-expanded="false" aria-controls="mnav" aria-label={t.nav.open} data-label-open={t.nav.open} data-label-close={t.nav.close}>
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className="mnav" id="mnav" aria-label={t.nav.mobile} hidden>
        <ul>
          {t.nav.links.map((l, i) => (
            <li key={l.label}>
              <a href={l.href}>
                {l.label} <span className="mono">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mnav__foot">
          <LangSwitch locale={locale} label={t.nav.lang} />
          <a className="nav__phone nav__phone--lg" href={site.phone.href}>
            <Phone className="ic" aria-hidden="true" />
            {site.phone.display}
          </a>
          <Btn href="#lead" magnetic={false} service="sell">
            {t.nav.cta}
          </Btn>
        </div>
      </div>
    </>
  );
}
