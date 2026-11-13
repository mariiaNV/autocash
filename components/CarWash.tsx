import Image from "next/image";
import { Droplet } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { localImages, type Locale } from "@/lib/site";
import PriceList from "./PriceList";
import { Btn, Lines } from "./ui";

export default function CarWash({ t, locale }: { t: Dict; locale: Locale }) {
  const w = t.wash;
  const img = localImages.carwash;
  return (
    <section className="sec wash" id="wash" aria-labelledby="wash-title">
      <div className="wrap">
        <div className="wash__brand" data-reveal="">
          <span className="wash__logo">
            <span className="logo__dot" aria-hidden="true" />AVTOCASH <b>{w.brandSub}</b>
          </span>
          <span className="mono"><span className="sec-label__n">03</span>&nbsp; {w.label}</span>
        </div>

        <div className="wash__grid">
          <div className="wash__text">
            <div>
              <h2 className="h2" id="wash-title" data-split="">
                <Lines lines={[w.title[0], <span className="mu" key="a">{w.title[1]}</span>, <span className="mu" key="b">{w.title[2]}</span>]} />
              </h2>
              <p className="wash__sub" data-reveal="">{w.sub}</p>
            </div>
            <div data-reveal="">
              <p className="wash__bridge"><Droplet className="ic" aria-hidden="true" /><span>{w.infra}</span></p>
              <div className="wash__cta">
                <Btn href="#lead" variant="o" service="wash">{w.cta}</Btn>
              </div>
            </div>
          </div>

          <figure className="wash__visual" data-wash-visual="">
            <div className="wash__visual-in">
              <Image src={img.src} alt={w.imgAlt} width={img.width} height={img.height} sizes="(max-width: 900px) 100vw, 58vw" className="wash__photo" />
            </div>
            <div className="wash__grade" aria-hidden="true" />
            <div className="wash__led" aria-hidden="true" />
            <figcaption className="wash__caption">
              <span className="mono">AVTOCASH WASH</span>
              <span className="mono">{w.caption}</span>
            </figcaption>
          </figure>
        </div>

        <PriceList t={t} locale={locale} />
      </div>
    </section>
  );
}
