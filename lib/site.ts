/**
 * Єдиний конфіг AVTOCASH. Усе, що позначено TODO, потрібно уточнити в клієнта перед запуском реклами.
 */
export const site = {
  brand: "AVTOCASH",
  url: "https://avtocash.od.ua", // TODO: бойовий домен (canonical, sitemap, Open Graph)
  phone: {
    display: "095 001 42 46",
    href: "tel:+380950014246",
  },
  secondaryPhone: { display: "068 909 89 79", href: "tel:+380689098979" },
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
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80`;
export const photos = {
  sell: { src: u("photo-1727893512947-8bdc773ceb02"), credit: "Mehmet Talha Onuk / Unsplash" },
  pledge: { src: u("photo-1763729805496-b5dbf7f00c79"), credit: "Jakub Żerdzicki / Unsplash" },
  pawn: { src: u("photo-1727893390456-eb52017d99e0"), credit: "Mehmet Talha Onuk / Unsplash" },
  why: { src: u("photo-1727893467393-24bc37e8a117"), credit: "Mehmet Talha Onuk / Unsplash" },
  inspect: { src: u("photo-1792792999828-74b071329fdd"), credit: "Unsplash" },
} as const;

export const localImages = {
  heroCar: { src: assetPath("/images/hero-range.png"), srcMobile: assetPath("/images/hero-range.png"), width: 2534, height: 1901 },
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
      { uk: "Експрес", ru: "Экспресс", p: [130, 140, 150, 170] },
      { uk: "Верх", ru: "Верх", p: [150, 160, 170, 200] },
      { uk: "Верх у 2 фази, нано-мийка", ru: "Верх в 2 фазы, нано-мойка", p: [220, 250, 300, 300] },
      { uk: "Віск рідкий", ru: "Воск жидкий", p: [80, 80, 80, 80] },
      { uk: "Віск твердий «Soft-99»", ru: "Воск твёрдый «Soft-99»", p: [300, 300, 350, 400] },
      { uk: "Чорніння гуми", ru: "Чернение резины", p: [50, 50, 60, 60] },
      { uk: "Блиск зовнішнього пластику", ru: "Блеск внешнего пластика", p: [100, 100, 120, 120] },
    ],
  },
  {
    id: "int",
    rows: [
      { uk: "Прибирання салону", ru: "Уборка салона", p: [150, 150, 170, 170] },
      { uk: "Прибирання салону 2 (посилене)", ru: "Уборка салона 2 (усиленная)", p: [300, 300, 340, 340] },
      { uk: "Прибирання багажника", ru: "Уборка багажника", p: [60, 70, 70, 100] },
      { uk: "Полірування пластику", ru: "Полировка пластика", p: [80, 80, 100, 100] },
      { uk: "Кондиціонер шкіри", ru: "Кондиционер кожи", p: [120, 120, 150, 200] },
      { uk: "Кондиціонер тканинних сидінь", ru: "Кондиционер тканевых сидений", p: [150, 150, 200, 200] },
      { uk: "Хімчистка тканинних килимків", ru: "Химчистка тканевых ковриков", p: [100, 100, 100, 100] },
    ],
  },
  {
    id: "extra",
    rows: [
      { uk: "Антидощ на лобове скло", ru: "Антидождь на лобовое стекло", p: [200, 200, 250, 300] },
      { uk: "Мийка двигуна", ru: "Мойка двигателя", p: [250, 250, 300, 300] },
      // TODO: звірити значення класу B — на фото прайсу цифра нечітка (прочитано як 900)
      { uk: "Глибоке очищення лаку", ru: "Глубокая очистка лака", p: [800, 900, 1000, 1000] },
      { uk: "Видалення бітуму", ru: "Удаление битума", p: null, from: 100 },
      { uk: "Очищення хромованих деталей", ru: "Очистка хромированных деталей", p: null, from: 150 },
      { uk: "Глибоке очищення дисків і вихлопних труб", ru: "Глубокая очистка дисков и выхлопных труб", p: null, from: 200 },
      { uk: "Полірування оптики", ru: "Полировка оптики", p: null, from: 400 },
      { uk: "Полірування кузова", ru: "Полировка кузова", p: null, from: 2000 },
      { uk: "Хімчистка салону", ru: "Химчистка салона", p: null, from: 2000 },
    ],
  },
];

export type Locale = "uk" | "ru";
export type Service = "sell" | "pledge" | "pawn" | "wash";
