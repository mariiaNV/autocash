import { ArrowUpRight, Phone } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function Footer({ t }: { t: Dict }) {
  const f = t.footer;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <a className="logo" href="#top" aria-label={t.nav.home}>
              <span className="logo__word">AVTO<b>CASH</b><span className="logo__dot" aria-hidden="true" /></span>
            </a>
            <p className="footer__slogan">{t.slogan}</p>
            <p className="footer__about">{f.about}</p>
          </div>
          <div>
            <h4 className="mono">{f.services}</h4>
            <ul>
              {f.serviceLinks.map((l, i) => (
                <li key={l}><a href={i === 3 ? "#wash" : "#choose"}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mono">{f.company}</h4>
            <ul>{f.companyLinks.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
          </div>
          <div>
            <h4 className="mono">{f.contacts}</h4>
            <ul>
              <li><a className="footer__tel" href={site.phone.href}><Phone className="ic" aria-hidden="true" />{site.phone.display}</a></li>
              <li>{f.city}</li>
              <li>{f.hours}</li>
              <li><a className="footer__cta" href="#lead">{t.nav.cta} <ArrowUpRight className="ic" aria-hidden="true" /></a></li>
            </ul>
          </div>
        </div>
        <div className="footer__mega" aria-hidden="true">AVTOCASH<i /></div>
        <div className="footer__legal">
          <p>{f.legal}</p>
          <p>© {new Date().getFullYear()} AVTOCASH. {f.rights} · {f.photos}</p>
        </div>
      </div>
    </footer>
  );
}
