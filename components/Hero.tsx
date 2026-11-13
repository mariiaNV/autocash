import Image from "next/image";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { localImages, site } from "@/lib/site";
import type { CSSProperties } from "react";
import { Btn } from "./ui";

const floorLines = [
  ...Array.from({ length: 11 }, (_, i) => {
    const y = (Math.pow((i + 1) / 11, 2.1) * 400).toFixed(1);
    return <line key={`h${i}`} x1="0" x2="1600" y1={y} y2={y} />;
  }),
  ...Array.from({ length: 29 }, (_, i) => {
    const k = i - 14;
    return <line key={`v${i}`} x1={1000 + k * 22} y1="0" x2={1000 + k * 230} y2="400" />;
  }),
];

export default function Hero({ t }: { t: Dict }) {
  const h = t.hero;
  const car = localImages.heroCar;
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__spot" />
        <div className="hero__cone" />
        <div className="hero__horizon" />
        <svg className="hero__floor" viewBox="0 0 1600 400" preserveAspectRatio="none">{floorLines}</svg>
      </div>

      <div className="wrap hero__content">
        <div className="hero__top">
          <div className="hero__headline">
            <p className="hero__kicker mono" data-hero-fade="">{h.kicker}</p>
            <h1 className="hero__title" id="hero-title">
              <span className="line"><span className="line-inner">{h.title[0]}</span></span>{" "}
              <span className="line"><span className="line-inner"><span className="outline">{h.title[1]}</span> {h.title[2]}</span></span>
              <span className="sr-only"> {h.srTitle}</span>
            </h1>
          </div>

          <div className="hero__lead">
            <p className="hero__sub" data-hero-fade="">{h.sub}</p>
            <div className="hero__ctas" data-hero-fade="">
              <Btn href="#lead" service="sell">{h.cta}</Btn>
              <Btn href={site.phone.href} variant="o" icon={<Phone className="ic" />}>{h.call}</Btn>
            </div>
            <div className="hero__phones" data-hero-fade="" aria-label={h.call}>
              <a href={site.phone.href}>{site.phone.display}</a>
              <a href={site.secondaryPhone.href}>{site.secondaryPhone.display}</a>
            </div>
          </div>

          <aside className="hero__eval" aria-label={h.evalTitle} data-hero-fade="">
            <div className="hero__eval-row">
              <span className="mono mono--w">{h.evalTitle}</span>
              <span className="pulse" aria-hidden="true" />
            </div>
            <strong>{h.evalText}</strong>
            <a href="#lead" data-service="sell">
              <span>{h.evalLink}</span>
              <ArrowUpRight className="ic" aria-hidden="true" />
            </a>
          </aside>
        </div>

        <div className="hero__carwrap">
          <div className="hero__car">
            <div className="hero__car-in">
              <div className="hero__shadow" aria-hidden="true" />
              <Image
                className="hero__img"
                src={car.src}
                alt={h.carAlt}
                width={car.width}
                height={car.height}
                priority
                sizes="(max-width: 900px) 120vw, 62vw"
              />
              <div className="hero__refl" aria-hidden="true">
                <Image src={car.srcMobile} alt="" width={car.width} height={car.height} sizes="(max-width: 900px) 120vw, 62vw" />
              </div>
              <div
                className="hero__sheen"
                aria-hidden="true"
                style={{ "--hero-mask": `url("${car.srcMobile}")` } as CSSProperties}
              />
            </div>
          </div>
        </div>
        <div className="hero__scrim" aria-hidden="true" />

        <div className="hero__bottom">
          <p className="geo" data-hero-fade="">
            <span className="geo__pin" aria-hidden="true"><MapPin className="ic" /></span>
            <span>
              <strong>{h.geo}</strong>
              <span className="mono">46.48° N · 30.72° E · {h.geoSub}</span>
            </span>
          </p>
          <div className="hero__meta" data-hero-fade="">
            <div className="hero__specs mono">
              {h.specs.map((s, i) => (
                <span key={s}><b>0{i + 1}</b> {s}</span>
              ))}
            </div>
            <a className="scroll-hint" href="#choose">
              <span className="mono">{h.scroll}</span>
              <span className="scroll-hint__track" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
