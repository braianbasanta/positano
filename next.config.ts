import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Servir AVIF (y WebP de fallback) para el hero y demás imágenes: pesan
  // mucho menos que el PNG/JPG original y mejoran el LCP en móvil.
  images: {
    formats: ["image/avif", "image/webp"],
    // 75 (default de next/image, lo usa el hero) + 50 para los pósters de reels.
    // En Next 16 el valor de `quality` debe estar en esta lista o devuelve 400.
    qualities: [50, 75],
    // Pósters de los reels: viven en Vercel Blob como JPG crudos (~120-150 KB).
    // Whitelistar el host permite servirlos por /_next/image redimensionados y
    // en AVIF/WebP (~30-50 KB) sin re-subir nada. Ver ReelCard.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qlvwguodykkormm1.public.blob.vercel-storage.com",
      },
    ],
  },
  // 404 global propio. Hace falta `global-not-found` (no `not-found`) porque
  // la web tiene dos root layouts —(es) y (en)— y no hay layout raíz único.
  experimental: {
    globalNotFound: true,
  },
  // /vinos y /en/wines se unificaron en /bebidas y /en/drinks. Mantenemos el
  // 308 para no romper el enlace ya publicado ni perder el poco SEO acumulado.
  async redirects() {
    return [
      { source: "/vinos", destination: "/bebidas", permanent: true },
      { source: "/en/wines", destination: "/en/drinks", permanent: true },
    ];
  },
  // Las 7 URLs del WordPress antiguo (positanopizzeriabcn.com) se conservan con
  // el MISMO slug en esta web (/, /menu, /reservas, /nuestra-historia,
  // /aviso-legal, /politica-de-privacidad, /politica-de-cookies-ue), así que no
  // hace falta ningún 301 al cambiar de dominio: el SEO acumulado se mantiene.
};

export default nextConfig;
