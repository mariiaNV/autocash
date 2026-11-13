import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { photos } from "@/lib/site";
import { Lines, SecLabel } from "./ui";

export default function ServiceChooser({ t }: { t: Dict }) {
  const c = t.choose;
  return (
    <section className="sec choose" id="choose" aria-labelledby="choose-title">
      <div className="wrap">
        <SecLabel n="01">{c.label}</SecLabel>
        <div className="choose__head">
          <h2 className="h2" id="choose-title" data-split="">
            <Lines lines={[c.title[0], <span className="mu" key="m">{c.title[1]}</span>]} />
          </h2>
          <p className="lead" data-reveal="">{c.lead}</p>
        </div>

        <div className="panels">
          {c.panels.map((p, i) => {
            const ph = photos[p.key as keyof typeof photos];
            return (
              <a className="panel" href="#lead" data-service={p.key} data-panel="" key={p.key}>
                <div className="panel__media ph">
                  <Image src={ph.src} alt={p.alt} fill sizes="(max-width: 900px) 100vw, 45vw" className="ph__img" />
                </div>
                <div className="panel__shade" aria-hidden="true" />
                <div className="panel__top">
                  <span className="panel__num">0{i + 1} <i>/ 03</i></span>
                  <span className="panel__go" aria-hidden="true"><ArrowUpRight className="ic" /></span>
                </div>
                <div className="panel__body">
                  <h3 className="panel__title">
                    {p.title.map((l, j) => (
                      <span key={j}>{l}{j < p.title.length - 1 && <br />}</span>
                    ))}
                  </h3>
                  <p className="panel__text">{p.text}</p>
                  <div className="panel__more">
                    <div>
                      <ul>{p.more.map((m) => <li key={m}>{m}</li>)}</ul>
                      <span className="panel__cta">{p.cta} <ArrowUpRight className="ic" aria-hidden="true" /></span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
