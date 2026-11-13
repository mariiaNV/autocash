/**
 * Єдиний конфіг AVTOCASH. Усе, що позначено TODO, потрібно уточнити в клієнта перед запуском реклами.
 */
export const site = {
  brand: "AVTOCASH",
  url: "https://avtocash.od.ua", // TODO: бойовий домен (canonical, sitemap, Open Graph)
  phone: { display: "095 001 42 46", href: "tel:+380950014246", operator: "Vodafone" },
  secondaryPhone: { display: "068 909 89 79", href: "tel:+380689098979", operator: "Kyivstar" },
  address: "вулиця Балківська, 130, Одеса",
  city: { lat: 46.4825, lng: 30.7233 }, // Одеса
  /** Мессенджери: залиште порожнім — кнопка не показується (жодних «мертвих» кнопок). */
  messengers: {
    telegram: "", // TODO: напр. "https://t.me/avtocash"
    viber: "", // TODO: напр. "viber://chat?number=%2B380..."
    whatsapp: "", // TODO: напр. "https://wa.me/380..."
  },
  /** Endpoint прийому заявок (CRM / Telegram-бот / вебхук). Порожньо — демо-режим без відправки. */
  leadEndpoint: process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "",
  /**
   * ДЕМОНСТРАЦІЙНІ показники (за брифом). Це не підтверджена статистика компанії —
   * замініть на фактичні дані після погодження з клієнтом.
   */
  statsAreDemo: true,
} as const;

export const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

/** Фото послуг — Unsplash License (безкоштовно, комерційне використання дозволене). */
// w= обовʼязковий: без нього Unsplash віддає оригінал 4000+ px (кілька МБ на фото).
const u = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75&w=${w}`;
export const photos = {
  sell: { src: u("photo-1727893512947-8bdc773ceb02"), credit: "Mehmet Talha Onuk / Unsplash" },
  pledge: { src: u("photo-1763729805496-b5dbf7f00c79"), credit: "Jakub Żerdzicki / Unsplash" },
  pawn: { src: u("photo-1727893390456-eb52017d99e0"), credit: "Mehmet Talha Onuk / Unsplash" },
  why: { src: u("photo-1727893467393-24bc37e8a117"), credit: "Mehmet Talha Onuk / Unsplash" },
  inspect: { src: u("photo-1792792999828-74b071329fdd", 600), credit: "Unsplash" },
} as const;

export const localImages = {
  // WebP з прозорістю: 150 КБ замість 4 МБ PNG. Оригінал — public/images/hero-range.png.
  heroCar: { src: assetPath("/images/hero-range-1800.webp"), srcMobile: assetPath("/images/hero-range-1000.webp"), width: 1800, height: 1350 },
  carwash: { src: assetPath("/images/carwash.webp"), width: 680, height: 510 },
} as const;

/* ---------------------------------------------------------------------------
   Прайс автомийки — перенесено з фото прайсу клієнта (фото №3), без змін цін.
   Колонки A–D — класи авто за піктограмами на табличці.
   null у колонці = ціна «від» (одна для всіх класів).
   --------------------------------------------------------------------------- */
export type PriceRow = { uk: string; ru: string; p: [number, number, number, number] | null; from?: number };
export type PriceGroup = { id: "ext" | "int" | "extra"; rows: PriceRow[] };

export const prices: PriceGroup[] = [
  {
    id: "ext",
    rows: [
      { uk: "Експрес", ru: "Экспресс", p: [300, 300, 350, 400] },
      { uk: "Верх", ru: "Верх", p: [350, 400, 450, 500] },
      { uk: "Віск", ru: "Воск", p: [250, 250, 250, 250] },
      { uk: "Чорніння гуми", ru: "Чернение резины", p: [100, 100, 100, 100] },
    ],
  },
  {
    id: "int",
    rows: [
      { uk: "Салон", ru: "Салон", p: [350, 350, 400, 400] },
      { uk: "Шкіра", ru: "Кожа", p: [200, 200, 200, 200] },
      { uk: "Пластик", ru: "Пластик", p: [200, 200, 250, 200] },
    ],
  },
  {
    id: "extra",
    rows: [
      { uk: "Бітум", ru: "Битум", p: [100, 100, 100, 150] },
      { uk: "Двигун", ru: "Двигатель", p: [350, 350, 350, 350] },
      { uk: "Твердий віск", ru: "Твердый воск", p: [400, 400, 900, 1000] },
      { uk: "Хімчистка салону", ru: "Химчистка салона", p: null, from: 3500 },
    ],
  },
];

export type Locale = "uk" | "ru";
export type Service = "sell" | "pledge" | "pawn" | "wash";
