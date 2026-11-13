import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return {
    name: "AVTOCASH — викуп авто та автоломбард в Одесі",
    short_name: "AVTOCASH",
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#0A0A0A",
    icons: [{ src: `${basePath}/icon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
