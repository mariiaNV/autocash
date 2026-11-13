import Image from "next/image";
import { ArrowUpRight, Check, MessageCircle, Send } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { localImages, site } from "@/lib/site";
import { Lines, Phones, SecLabel } from "./ui";

export default function FinalCta({ t }: { t: Dict }) {
  const f = t.final;
  const fm = t.form;
  const m = site.messengers;
  const services = Object.entries(fm.services) as [string, string][];
  return (
    <section className="sec final" id="contacts" aria-labelledby="final-title">
      <div className="final__nose" aria-hidden="true">
        <Image src={localImages.heroCar.srcMobile} alt="" width={1000} height={750} sizes="50vw" loading="lazy" />
      </div>
      <div className="wrap">
        <SecLabel n="04">{f.label}</SecLabel>
        <h2 className="final__title" id="final-title" data-split="">
          <Lines lines={[f.title[0], f.title[1], f.title[2], <span key="d">{f.title[3]}<span className="y">.</span></span>]} />
        </h2>

        <div className="final__grid">
          <div className="final__contact" data-reveal="">
            <p className="final__text">{f.text}</p>
            <Phones variant="list" label={f.call} className="final__phones" />
            <p className="final__hours mono">{f.hours}</p>
            {(m.telegram || m.viber || m.whatsapp) && <div className="final__msg">
              {m.telegram && <a className="msg-btn" href={m.telegram} target="_blank" rel="noopener noreferrer"><Send className="ic" aria-hidden="true" />Telegram</a>}
              {m.viber && <a className="msg-btn" href={m.viber}><MessageCircle className="ic" aria-hidden="true" />Viber</a>}
              {m.whatsapp && <a className="msg-btn" href={m.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle className="ic" aria-hidden="true" />WhatsApp</a>}
            </div>}
          </div>

          <form
            className="form"
            id="lead"
            noValidate
            data-reveal=""
            data-lead-form=""
            data-endpoint={site.leadEndpoint || undefined}
            data-err-name={fm.errName}
            data-err-phone={fm.errPhone}
            data-err-consent={fm.errConsent}
            data-err-send={`${fm.errSend} ${site.phone.display}`}
            data-sending={fm.sending}
            aria-labelledby="form-title"
          >
            <div className="form__head">
              <h3 className="mono mono--w" id="form-title">{fm.title}</h3>
              <span className="mono">{fm.time}</span>
            </div>
            <fieldset className="seg">
              <legend className="mono">{fm.legend}</legend>
              {services.map(([v, label], i) => (
                <label key={v}>
                  <input type="radio" name="service" value={v} defaultChecked={i === 0} />
                  <span>{label}</span>
                </label>
              ))}
            </fieldset>
            <div className="field__row">
              <label className="field">
                <input name="name" autoComplete="name" placeholder=" " required maxLength={60} aria-describedby="form-status" />
                <span>{fm.name}</span>
              </label>
              <label className="field">
                <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder=" " required maxLength={20} aria-describedby="form-status" />
                <span>{fm.phone}</span>
              </label>
            </div>
            <label className="field">
              <input name="car" placeholder=" " maxLength={80} />
              <span>{fm.car}</span>
            </label>
            <label className="consent">
              <input type="checkbox" name="consent" required />
              <span>{fm.consent}</span>
            </label>
            <button className="btn btn--y" type="submit" data-magnetic="">
              <span className="btn__label" data-submit-label="">{fm.submit}</span>
              <span className="btn__icon" aria-hidden="true"><ArrowUpRight className="ic" /><ArrowUpRight className="ic" /></span>
            </button>
            <p className="form__status" id="form-status" role="status" aria-live="polite" />
            <div className="form__done" tabIndex={-1}>
              <span className="form__done-ic"><Check className="ic" aria-hidden="true" /></span>
              <h3>{fm.doneTitle}</h3>
              <p>{fm.doneText}</p>
              <button type="button" className="link-u form__again" data-form-again="">{fm.again}</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
