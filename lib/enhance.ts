/**
 * AVTOCASH — уся інтерактивність сторінки в одному модулі (progressive enhancement).
 * Розмітка повністю серверна: без JS контент видно, посилання й телефони працюють.
 * Використовується і в Next.js (components/Enhance.tsx), і в статичному превʼю.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
type Deps = { gsap?: any; ScrollTrigger?: any; Lenis?: any };

export function enhance(deps: Deps = {}): () => void {
  const doc = document.documentElement;
  const $ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => c.querySelector<T>(s) as T | null;
  const $$ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => Array.from(c.querySelectorAll<T>(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const off: (() => void)[] = [];
  const on = (el: EventTarget, ev: string, fn: any, opt?: any) => { el.addEventListener(ev, fn, opt); off.push(() => el.removeEventListener(ev, fn, opt)); };
  let lenis: any = null;

  /* ---------- зображення: якщо віддалене фото не завантажилось — показуємо оформлений фолбек */
  $$<HTMLImageElement>(".ph img").forEach((img) => {
    const fail = () => img.closest(".ph")?.classList.add("is-broken");
    if (img.complete && img.naturalWidth === 0) fail();
    on(img, "error", fail);
  });

  /* ---------- навігація: стан при скролі, ховання вниз / показ вгору, мобільна панель */
  const nav = $("#nav"), mbar = $("#mbar"), hero = $(".hero");
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) {
      nav.classList.toggle("is-scrolled", y > 24);
      nav.classList.toggle("is-hidden", y > lastY && y > 420 && !doc.classList.contains("menu-open"));
    }
    if (mbar && hero) mbar.classList.toggle("is-on", y > hero.offsetHeight * 0.7);
    lastY = y;
  };
  on(window, "scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- мобільне меню */
  const burger = $<HTMLButtonElement>(".burger"), mnav = $("#mnav");
  const setMenu = (open: boolean) => {
    if (!burger || !mnav) return;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", (open ? burger.dataset.labelClose : burger.dataset.labelOpen) || "");
    if (open) {
      mnav.hidden = false;
      requestAnimationFrame(() => mnav.classList.add("is-open"));
    } else {
      mnav.classList.remove("is-open");
      window.setTimeout(() => { if (!mnav.classList.contains("is-open")) mnav.hidden = true; }, 700);
    }
    doc.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (lenis) (open ? lenis.stop() : lenis.start());
    if (open) window.setTimeout(() => $<HTMLAnchorElement>("a", mnav)?.focus({ preventScroll: true }), 80);
  };
  if (burger) on(burger, "click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  if (mnav) $$("a", mnav).forEach((a) => on(a, "click", () => setMenu(false)));
  on(document, "keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape" && doc.classList.contains("menu-open")) { setMenu(false); burger?.focus(); }
  });
  on(window, "resize", () => { if (window.innerWidth > 1180 && doc.classList.contains("menu-open")) setMenu(false); });

  /* ---------- перемикач мови: зберігаємо якір секції */
  $$<HTMLAnchorElement>("[data-lang]").forEach((a) => on(a, "click", () => {
    if (location.hash && a.href.indexOf("#") < 0) a.href = a.getAttribute("href") + location.hash;
  }));

  /* ---------- CTA → попередній вибір послуги у формі */
  const form = $<HTMLFormElement>("[data-lead-form]");
  on(document, "click", (e: MouseEvent) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-service]");
    const v = el?.dataset.service;
    if (!v || !form) return;
    const r = $<HTMLInputElement>(`input[name="service"][value="${v}"]`, form);
    if (r) r.checked = true;
  });

  /* ---------- форма заявки */
  if (form) {
    const status = $(".form__status", form)!;
    const label = $("[data-submit-label]", form)!;
    const submitText = label.textContent || "";
    const btn = $<HTMLButtonElement>('button[type="submit"]', form)!;
    const phone = form.elements.namedItem("phone") as HTMLInputElement;
    // мʼяке форматування українського номера
    on(phone, "input", () => {
      let d = phone.value.replace(/\D/g, "");
      if (!d) return;
      if (d.startsWith("0")) d = "38" + d;
      if (!d.startsWith("380")) return;
      d = d.slice(0, 12);
      const p = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 8), d.slice(8, 10), d.slice(10, 12)];
      phone.value = `+${p[0]} (${p[1]}${p[1].length === 3 ? ")" : ""}${p[2] ? " " + p[2] : ""}${p[3] ? "-" + p[3] : ""}${p[4] ? "-" + p[4] : ""}`;
    });
    const fail = (msg: string, field?: HTMLElement | null) => {
      status.textContent = msg; status.classList.add("is-error");
      field?.focus();
      form.querySelectorAll("[aria-invalid]").forEach((n) => n.removeAttribute("aria-invalid"));
      field?.setAttribute("aria-invalid", "true");
    };
    on(form, "submit", async (e: Event) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const tel = String(fd.get("phone") || "").replace(/\D/g, "");
      const ds = form.dataset;
      if (name.length < 2) return fail(ds.errName || "", form.elements.namedItem("name") as HTMLElement);
      if (tel.length < 10 || tel.length > 13) return fail(ds.errPhone || "", phone);
      if (!fd.get("consent")) return fail(ds.errConsent || "", form.elements.namedItem("consent") as HTMLElement);
      form.querySelectorAll("[aria-invalid]").forEach((n) => n.removeAttribute("aria-invalid"));
      status.textContent = ""; status.classList.remove("is-error");
      btn.disabled = true; form.classList.add("is-sending"); label.textContent = ds.sending || "…";
      try {
        if (ds.endpoint) {
          const res = await fetch(ds.endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ service: fd.get("service"), name, phone: tel, car: fd.get("car"), lang: doc.lang, page: location.href }),
          });
          if (!res.ok) throw new Error(String(res.status));
        } else {
          await new Promise((r) => setTimeout(r, 700)); // демо-режим: endpoint не налаштований
        }
        form.classList.add("is-done");
        $<HTMLElement>(".form__done", form)?.focus();
      } catch {
        fail(ds.errSend || "");
      } finally {
        btn.disabled = false; form.classList.remove("is-sending"); label.textContent = submitText;
      }
    });
    const again = $("[data-form-again]", form);
    if (again) on(again, "click", () => { form.reset(); form.classList.remove("is-done"); ($<HTMLInputElement>('input[name="name"]', form))?.focus(); });
  }

  /* ---------- прайс: вкладки + клас авто (мобільний) */
  $$("[data-price]").forEach((root) => {
    const tabs = $$<HTMLButtonElement>("[role=tab]", root);
    const groups = $$<HTMLElement>("[data-group]", root);
    const tabBar = $("[data-price-tabs]", root), clsBar = $("[data-price-cls]", root);
    if (tabBar) tabBar.hidden = false;
    if (clsBar) clsBar.hidden = false;
    root.classList.add("is-tabs");
    const select = (id: string, focus = false) => {
      tabs.forEach((t) => {
        const a = t.dataset.tab === id;
        t.setAttribute("aria-selected", String(a)); t.tabIndex = a ? 0 : -1;
        if (a && focus) t.focus();
      });
      groups.forEach((g) => { g.hidden = g.dataset.group !== id; });
    };
    tabs.forEach((t, i) => {
      on(t, "click", () => select(t.dataset.tab!));
      on(t, "keydown", (e: KeyboardEvent) => {
        const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        select(tabs[(i + d + tabs.length) % tabs.length].dataset.tab!, true);
      });
    });
    select(tabs[0]?.dataset.tab || "ext");
    const clsBtns = $$<HTMLButtonElement>("[data-price-cls] [data-c]", root);
    const nameEl = $("[data-cls-name]", root);
    clsBtns.forEach((b) => on(b, "click", () => {
      root.dataset.cls = b.dataset.c;
      clsBtns.forEach((x) => x.setAttribute("aria-checked", String(x === b)));
      if (nameEl) nameEl.textContent = b.title;
    }));
  });

  /* ---------- outline-кнопка: заливка з точки входу курсора */
  $$(".btn--o").forEach((b) => on(b, "pointerenter", (e: PointerEvent) => {
    const r = b.getBoundingClientRect();
    b.style.setProperty("--mx", `${e.clientX - r.left}px`);
    b.style.setProperty("--my", `${e.clientY - r.top}px`);
  }));

  /* ======================================================================
     MOTION — GSAP + ScrollTrigger + Lenis (тільки якщо доступні й немає reduced-motion)
     ====================================================================== */
  const { gsap, ScrollTrigger: ST, Lenis } = deps;
  if (!gsap || !ST || reduce) return () => off.forEach((f) => f());

  gsap.registerPlugin(ST);
  doc.classList.add("anim");

  if (Lenis) {
    try {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 0.95 });
      lenis.on("scroll", ST.update);
      const raf = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      off.push(() => { gsap.ticker.remove(raf); lenis.destroy(); });
      on(document, "click", (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
        const id = a?.getAttribute("href");
        if (!a || !id || id.length < 2) return;
        const t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        lenis.scrollTo(t, { offset: id === "#lead" ? -110 : -20, duration: 1.3 });
        history.replaceState(null, "", id);
      });
    } catch { lenis = null; }
  }

  const E = "expo.out";
  const ctx = gsap.context(() => {
    /* intro */
    const navItems = nav ? [$(".logo", nav), ...$$("[data-nav]", nav), $(".nav__cta", nav), $(".burger", nav)].filter(Boolean) : [];
    const heroFades = $$("[data-hero-fade]");
    gsap.set(".hero__title .line-inner", { yPercent: 115 });
    gsap.set(heroFades, { autoAlpha: 0, y: 24 });
    gsap.set(navItems, { autoAlpha: 0, y: -14 });
    gsap.set(".hero__car-in", { autoAlpha: 0, x: 120, scale: 0.97 });
    gsap.set([".hero__spot", ".hero__cone"], { autoAlpha: 0 });
    gsap.timeline({ defaults: { ease: E } })
      .to([".hero__spot", ".hero__cone"], { autoAlpha: 1, duration: 2.2, ease: "power2.out" }, 0)
      .to(".hero__car-in", { autoAlpha: 1, x: 0, scale: 1, duration: 2, ease: "power3.out" }, 0.15)
      .to(navItems, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.05 }, 0.3)
      .to(".hero__title .line-inner", { yPercent: 0, duration: 1.4, stagger: 0.12 }, 0.35)
      .to(heroFades, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.7);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } })
        .to(".hero__car", { xPercent: -7, scale: 1.06, ease: "none" }, 0)
        .to(".hero__headline", { yPercent: -35, autoAlpha: 0.2, ease: "none" }, 0)
        .to(".hero__eval", { yPercent: -50, ease: "none" }, 0)
        .to(".hero__spot", { yPercent: 18, ease: "none" }, 0)
        .to(".hero__floor", { yPercent: 12, ease: "none" }, 0);
      if (!finePointer || !hero) return;
      const cx = gsap.quickTo(".hero__car-in", "x", { duration: 1.2, ease: "power3" });
      const cy = gsap.quickTo(".hero__car-in", "y", { duration: 1.2, ease: "power3" });
      const sx = gsap.quickTo(".hero__spot", "x", { duration: 1.6, ease: "power3" });
      const move = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5;
        cx(nx * -20); cy(ny * -8); sx(nx * 60);
      };
      hero.addEventListener("pointermove", move);
      return () => hero.removeEventListener("pointermove", move);
    });
    mm.add("(max-width: 900px)", () => {
      gsap.to(".hero__car", { xPercent: -6, ease: "none", scrollTrigger: { trigger: ".hero__carwrap", start: "top 70%", end: "bottom top", scrub: true } });
    });

    /* заголовки секцій */
    $$("[data-split]").forEach((h) => {
      if (h.closest(".hero")) return;
      const lines = $$(".line-inner", h);
      gsap.set(lines, { yPercent: 115 });
      ST.create({ trigger: h, start: "top 88%", once: true, onEnter: () => gsap.to(lines, { yPercent: 0, duration: 1.3, ease: E, stagger: 0.1 }) });
    });

    /* загальний reveal */
    const rev = $$("[data-reveal]");
    gsap.set(rev, { autoAlpha: 0, y: 32 });
    ST.batch(rev, { start: "top 90%", once: true, onEnter: (b: Element[]) => gsap.to(b, { autoAlpha: 1, y: 0, duration: 1.1, ease: E, stagger: 0.07, overwrite: true }) });

    /* панелі послуг + 3D-нахил */
    const panels = $$("[data-panel]");
    gsap.from(panels, { y: 80, autoAlpha: 0, duration: 1.3, ease: E, stagger: 0.12, scrollTrigger: { trigger: ".panels", start: "top 85%", once: true } });
    if (finePointer) panels.forEach((p) => {
      const rx = gsap.quickTo(p, "rotationX", { duration: 0.8, ease: "power3" });
      const ry = gsap.quickTo(p, "rotationY", { duration: 0.8, ease: "power3" });
      gsap.set(p, { transformPerspective: 1400 });
      p.addEventListener("pointermove", (e: PointerEvent) => {
        const r = p.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 5); rx(((e.clientY - r.top) / r.height - 0.5) * -4);
      });
      p.addEventListener("pointerleave", () => { rx(0); ry(0); });
    });

    /* «Чому ми»: фото розкривається, світло ковзає, вставка «спливає» */
    const media = $("[data-why-media]");
    if (media) {
      gsap.fromTo($(".why__frame", media), { clipPath: "inset(14% 10% 14% 10% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", ease: "none",
        scrollTrigger: { trigger: media, start: "top 90%", end: "top 35%", scrub: 0.6 } });
      gsap.fromTo($(".why__img", media), { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: media, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from([$(".why__inset", media), $(".why__badge", media)], { y: 60, autoAlpha: 0, duration: 1.2, ease: E, stagger: 0.15,
        scrollTrigger: { trigger: media, start: "top 60%", once: true } });
      gsap.to($(".why__inset", media), { yPercent: -18, ease: "none", scrollTrigger: { trigger: media, start: "top bottom", end: "bottom top", scrub: true } });
    }

    /* цифри */
    $$(".stat__num").forEach((n) => gsap.from(n, { yPercent: 40, autoAlpha: 0, duration: 1.3, ease: E, scrollTrigger: { trigger: n, start: "top 92%", once: true } }));

    /* лінія процесу */
    gsap.fromTo(".process__fill", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".process", start: "top 75%", end: "bottom 60%", scrub: 0.8 } });

    /* автомийка */
    const wv = $("[data-wash-visual]");
    if (wv) {
      gsap.fromTo(wv, { clipPath: "inset(10% 8% 10% 8% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", ease: "none",
        scrollTrigger: { trigger: wv, start: "top 92%", end: "top 35%", scrub: 0.6 } });
      gsap.fromTo($(".wash__visual-in", wv), { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.04, ease: "none",
        scrollTrigger: { trigger: wv, start: "top bottom", end: "bottom top", scrub: true } });
    }

    /* фінал */
    gsap.fromTo(".final__nose", { xPercent: 16, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, ease: "none",
      scrollTrigger: { trigger: ".final", start: "top 85%", end: "top 25%", scrub: 0.8 } });

    /* магнітні кнопки */
    if (finePointer) $$("[data-magnetic]").forEach((b) => {
      const mx = gsap.quickTo(b, "x", { duration: 0.6, ease: "power3" }), my = gsap.quickTo(b, "y", { duration: 0.6, ease: "power3" });
      b.addEventListener("pointermove", (e: PointerEvent) => {
        const r = b.getBoundingClientRect();
        mx((e.clientX - r.left - r.width / 2) * 0.16); my((e.clientY - r.top - r.height / 2) * 0.28);
      });
      b.addEventListener("pointerleave", () => { mx(0); my(0); });
    });
  });

  const refresh = () => ST.refresh();
  (document as any).fonts?.ready?.then(refresh);
  on(window, "load", refresh);

  return () => {
    ctx.revert();
    off.forEach((f) => f());
    doc.classList.remove("anim");
  };
}
