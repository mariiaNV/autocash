"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { enhance } from "@/lib/enhance";

/** Підключає інтерактивність і анімації до серверної розмітки. */
export default function Enhance() {
  useEffect(() => enhance({ gsap, ScrollTrigger, Lenis }), []);
  return null;
}
