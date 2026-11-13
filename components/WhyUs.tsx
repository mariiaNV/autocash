import Image from "next/image";
import { Eye } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { photos } from "@/lib/site";
import { Lines, SecLabel } from "./ui";

export default function WhyUs({ t }: { t: Dict }) {
  const w = t.why;
  return (
    <section className="sec why" id="advantages" aria-labelledby="why-title">
      <div className="wrap">
        <SecLabel n="02">{w.label}</SecLabel>
        <div className="why__grid">
          <div className="why__text">
            <h2 className="h2" id="why-title" data-split="">
              <Lines lines={[w.title[0], <span className="mu" key="a">{w.title[1]}</span>, <span className="mu" key="b">{w.title[2]}</span>]} />
            </h2>
            <p className="lead why__lead" data-reveal="">{w.lead}</p>

            <ul className="stats">
              {w.stats.map((s, i) => (
                <li className="stat" data-reveal="" key={s.label}>
                  <span className="mono">— 0{i + 1}</span>
                  <p className="stat__value">
                    <span className="stat__num">{s.value}</span>
                    {s.unit && <span className="stat__unit">{s.unit}</span>}
                  </p>
                  <p className="stat__label">{s.label}<span>{s.sub}</span></p>
                </li>
              ))}
            </ul>
          </div>

          <figure className="why__media" data-why-media="">
            <div className="why__frame ph">
              <Image src={photos.why.src} alt={w.imgAlt} fill sizes="(max-width: 900px) 100vw, 40vw" className="ph__img why__img" />
              <div className="why__light" aria-hidden="true" />
            </div>
            <div className="why__inset ph">
              <Image src={photos.inspect.src} alt={w.img2Alt} fill sizes="220px" className="ph__img" />
            </div>
            <figcaption className="why__badge">
              <span className="why__badge-ic" aria-hidden="true"><Eye className="ic" /></span>
              <span><strong>{w.badge}</strong><span>{w.badgeSub}</span></span>
            </figcaption>
          </figure>
        </div>

        <div className="process" id="process">
          <p className="mono" data-reveal="">{w.process}</p>
          <div className="process__rail" aria-hidden="true"><div className="process__fill" /></div>
          <ol className="process__steps">
            {w.steps.map((s) => (
              <li className="process__step" data-reveal="" key={s.n}>
                <span className="mono">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="process__note" data-reveal="">
            {w.chips.map((c) => <span className="chip" key={c}>{c}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
