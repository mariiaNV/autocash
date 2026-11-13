import { Fragment, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "y" | "o";
  size?: "sm";
  service?: string;
  magnetic?: boolean;
  icon?: ReactNode;
  className?: string;
  ariaLabel?: string;
};

/** Кнопка з «перескоком» стрілки. Для tel: передайте icon={<Phone .../>} */
export function Btn({ href, children, variant = "y", size, service, magnetic = true, icon, className = "", ariaLabel }: BtnProps) {
  const ic = icon ?? <ArrowUpRight className="ic" />;
  return (
    <a
      className={`btn btn--${variant}${size ? ` btn--${size}` : ""} ${className}`.trim()}
      href={href}
      data-service={service}
      data-magnetic={magnetic ? "" : undefined}
      aria-label={ariaLabel}
    >
      <span className="btn__label">{children}</span>
      <span className="btn__icon" aria-hidden="true">
        {ic}
        {ic}
      </span>
    </a>
  );
}

export function Lines({ lines, className }: { lines: ReactNode[]; className?: string }) {
  return (
    <>
      {lines.map((l, i) => (
        <Fragment key={i}>
          <span className="line">
            <span className={`line-inner${className && i > 0 ? ` ${className}` : ""}`}>{l}</span>
          </span>
          {i < lines.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}

export function SecLabel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <p className="sec-label mono" data-reveal="">
      <span className="sec-label__n">{n}</span> {children}
    </p>
  );
}

/** Піктограми класів авто (за табличкою автомийки) */
export function ClassIcon({ k }: { k: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  const wheels = (a: number, b: number) => (
    <>
      <circle cx={a} cy="19" r="2.4" {...common} />
      <circle cx={b} cy="19" r="2.4" {...common} />
    </>
  );
  const body: Record<string, ReactNode> = {
    A: <path d="M3 18v-3l3-1 3-4h9l4 4 3 .8V18h-2.6M6.6 18H3m6 0h8.4" {...common} />,
    B: <path d="M3 18v-6l3-4h14l4 4.5V18h-2.6M6.6 18H3m6 0h8.4M6 12h18" {...common} />,
    C: <path d="M3 18V9l2-3h15l3 4 2 1v7h-2.6M6.6 18H3m6 0h8.4M5 11h20" {...common} />,
    D: <path d="M3 18V7l2-3h17l3 5v9h-2.6M6.6 18H3m6 0h8.4M3 11h22" {...common} />,
  };
  return (
    <svg className="cls-ic" viewBox="0 0 28 23" aria-hidden="true">
      {body[k]}
      {wheels(8.5, 20)}
    </svg>
  );
}
