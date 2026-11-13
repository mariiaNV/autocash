import type { Dict } from "@/lib/i18n";

/** Безперервна бігуча стрічка: чистий CSS (translateX -50% на подвоєному треку), без JS. */
export default function Marquee({ t, reverse = false }: { t: Dict; reverse?: boolean }) {
  const group = (hidden: boolean) => (
    <div className="marquee__group" aria-hidden={hidden ? "true" : undefined}>
      {t.marquee.map((m) => (
        <span className="marquee__item" key={m}>
          {m}
          <i className="marquee__sep" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee${reverse ? " marquee--rev" : ""}`} role="marquee" aria-label={t.marquee.join(" • ")}>
      <div className="marquee__track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
