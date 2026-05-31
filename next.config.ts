import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Servir AVIF (y WebP de fallback) para el hero y demás imágenes: pesan
  // mucho menos que el PNG/JPG original y mejoran el LCP en móvil.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // 404 global propio. Hace falta `global-not-found` (no `not-found`) porque
  // la web tiene dos root layouts —(es) y (en)— y no hay layout raíz único.
  experimental: {
    globalNotFound: true,
  },
  // Las 7 URLs del WordPress antiguo (positanopizzeriabcn.com) se conservan con
  // el MISMO slug en esta web (/, /menu, /reservas, /nuestra-historia,
  // /aviso-legal, /politica-de-privacidad, /politica-de-cookies-ue), así que no
  // hace falta ningún 301 al cambiar de dominio: el SEO acumulado se mantiene.
};

export default nextConfig;
