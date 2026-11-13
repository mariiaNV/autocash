import type { Dict } from "@/lib/i18n";
import { prices, type Locale } from "@/lib/site";
import { ClassIcon } from "./ui";

const fmt = (n: number) => n.toLocaleString("uk-UA").replace(/ /g, " ");

/**
 * Прайс автомийки. Без JS показує всі категорії підряд; enhance.ts вмикає вкладки
 * та (на телефоні) перемикач класу авто — тоді видно одну колонку цін.
 */
export default function PriceList({ t, locale }: { t: Dict; locale: Locale }) {
  const w = t.wash;
  return (
    <div className="price" id="prices" data-price="" data-cls="0" data-reveal="">
      <div className="price__head">
        <h3 className="price__title">{w.priceTitle}</h3>
        <p className="price__note">{w.priceNote}</p>
      </div>

      <div className="price__tabs" role="tablist" aria-label={w.priceTitle} data-price-tabs="" hidden>
        {prices.map((g, i) => (
          <button key={g.id} type="button" role="tab" id={`tab-${g.id}`} aria-controls={`pg-${g.id}`} aria-selected={i === 0} tabIndex={i === 0 ? 0 : -1} data-tab={g.id}>
            {w.tabs[g.id]}
          </button>
        ))}
      </div>

      <p className="price__legend mono">
        {w.classes.map((c) => (
          <span key={c.k}><b>{c.k}</b> — {c.label}</span>
        ))}
      </p>

      <div className="price__cls" role="radiogroup" aria-label={w.classLabel} data-price-cls="" hidden>
        <span className="mono">{w.classLabel}</span>
        <div>
          {w.classes.map((c, i) => (
            <button key={c.k} type="button" role="radio" aria-checked={i === 0} data-c={i} title={c.label}>
              <ClassIcon k={c.k} /> <b>{c.k}</b>
            </button>
          ))}
        </div>
        <span className="price__cls-name" aria-live="polite" data-cls-name="">{w.classes[0].label}</span>
      </div>

      {prices.map((g) => (
        <div className="price__group" role="tabpanel" id={`pg-${g.id}`} aria-labelledby={`tab-${g.id}`} key={g.id} data-group={g.id}>
          <h4 className="price__group-title mono">{w.tabs[g.id]}</h4>
          <table className="price__table">
            <thead>
              <tr>
                <th scope="col">{w.service}</th>
                {w.classes.map((c, i) => (
                  <th scope="col" data-c={i} key={c.k} title={c.label}>
                    <span className="price__th"><ClassIcon k={c.k} /><b>{c.k}</b></span>
                    <span className="sr-only">{c.label}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {g.rows.map((r) => (
                <tr key={r.uk}>
                  <th scope="row">{r[locale]}</th>
                  {r.p ? (
                    r.p.map((v, i) => (
                      <td data-c={i} key={i}>{fmt(v)}</td>
                    ))
                  ) : (
                    <td colSpan={4} className="price__from">
                      {w.from} {fmt(r.from!)} <span>{w.currency}</span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
