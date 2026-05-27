// Mapeo archivo original .mp4 -> slug del plato (compartido por compress + upload).
// 47 entradas: cada plato de src/data/menu.ts tiene exactamente un reel.
// Los 15 archivos restantes de la carpeta WeTransfer (postres + salados no
// listados en la carta + duplicado de burrata) quedan fuera de alcance.

export const SOURCE_DIR =
  "/Users/braian/Downloads/wetransfer_tartufo_positano_gourmeats-mp4_2026-04-21_1502";

/** @type {{ file: string; slug: string }[]} */
export const REELS = [
  // Insalate
  { file: "Ensalada cesar_ Positano_Gourmeats.mp4", slug: "ensalada-cesar" },
  { file: "Ensalada de queso de cabra_Positano_Gourmeats .mp4", slug: "ensalada-queso-cabra" },
  // Antipasti
  { file: "Olivas sicilianas_positano_gourmeats.mp4", slug: "olivas-sicilianas" },
  { file: "BURRATA FRITA PUGLIESE_POSITANO_GOURMEATS.mp4", slug: "burrata-frita-pugliese" },
  { file: "caprese de bufala dop 2.0_positano_gourmeats.mp4", slug: "caprese-bufala-dop" },
  { file: "PROVOLONE AL HORNO CON TOMATE CHERRY Y PESTO_POSITANO_GOURMEATS.mp4", slug: "provolone-al-horno" },
  { file: "PARMESANA DE BERENJENA GRATINADA EN HORNO DE LEÑA_POSITANO_GOURMEATS.mp4", slug: "parmesana-berenjena" },
  { file: "MONTANARAS FRITAS CON TOMATE Y PARMESANO_POSITANO_GOURMEATS.mp4", slug: "montanaras-fritas" },
  { file: "ALBONDIGAS DE CARNE CON TOMATE Y PARMESANO_POSITANO_GOURMEATS.mp4", slug: "albondigas-de-carne" },
  { file: "CALAMARES FRITOS_POSITANO_GOURMEATS.mp4", slug: "calamares-fritos" },
  { file: "CARPACCIO DE SOLOMILLO DE TERNERA_POSITANO_GOURMEATS.mp4", slug: "carpaccio-solomillo" },
  { file: "STEAK TARTAR_POSITANO_GOURMEATS.mp4", slug: "steak-tartar" },
  // La Nostra Pasta
  { file: "LASAÑA TRADICIONAL_POSITANO_GOURMEATS.mp4", slug: "lasana-tradicional" },
  { file: "LASAÑA DE VERDURAS_POSITANO_GOURMEATS.mp4", slug: "lasana-vegetariana" },
  { file: "TAGLIATELLE CON ALBÓNDIGAS CASERAS_POSITANO_GOURMEATS.mp4", slug: "tagliatelle-albondigas" },
  { file: "PACCHERI GENOVESE_POSITANO_GOURMEATS.mp4", slug: "paccheri-genovese" },
  { file: "SCIALATELLI A LA SCARPARIELLO_POSITANO_GOURMEATS.mp4", slug: "scialatelli-scarpariello" },
  { file: "SPAGHETTI CARBONARA_POSITANO_GOURMEATS.mp4", slug: "spaghetti-carbonara" },
  { file: "TAGLIATELLE CON TRUFA FRESCA_POSITANO_GOURMEATS.mp4", slug: "tagliatelle-trufa" },
  { file: "LINGUINI FRUTTI DI MARE_POSITANO_GOURMEATS.mp4", slug: "linguini-frutti-di-mare" },
  { file: "SCIALATELLI CON BOGAVANTE_POSITANO_GOURMEATS.mp4", slug: "scialatelli-bogavante" },
  { file: "PACCHERI CON CIGALA_POSITANO_GOURMEATS.mp4", slug: "paccheri-cigala" },
  // Pasta Fresca
  { file: "Relleno de ricotta y espinacas con salsa de mantequilla y salvia_positano_gourmeats.mp4", slug: "raviolotto" },
  { file: "PANCIOTTI_POSITANO_GOURMEATS.mp4", slug: "panciotti" },
  { file: "GNOCCHI SORRENTINA_POSITANO_GOURMEATS.mp4", slug: "gnocchi-sorrentina" },
  // Risotti
  { file: "RISOTTO CON CALABACÍN Y GAMBAS_POSITANO_GOURMEATS.mp4", slug: "risotto-calabacin-gambas" },
  { file: "RISOTTO AI FUNGHI_POSITANO_GOURMEATS.mp4", slug: "risotto-ai-funghi" },
  // Secondi
  { file: "SOLOMILLO DE TERNERA_POSITANO_GOURMEATS.mp4", slug: "solomillo-ternera" },
  { file: "FILETE DE SALMÓN_POSITANO_GOURMEATS.mp4", slug: "filete-salmon" },
  // Le Nostre Pizze
  { file: "MARINARA_POSITANO_GOURMEATS.mp4", slug: "marinara" },
  { file: "MARGHERITA_POSITANO_GOURMEATS.mp4", slug: "margherita" },
  { file: "DIAVOLA_POSITANO_GOURMEATS.mp4", slug: "diavola" },
  { file: "PROSCIUTTO E FUNGHI_POSITANO_GOURMEATS.mp4", slug: "prosciutto-e-funghi" },
  { file: "CAPRICCIOSA_POSITANO_GOURMEATS.mp4", slug: "capricciosa" },
  { file: "CALZONE POSITANO_POSITANO_GOURMEATS.mp4", slug: "calzone-positano" },
  { file: "SICILIANA_POSITANO_GOURMEATS.mp4", slug: "siciliana" },
  { file: "IBÉRICA_POSITANO_GOURMEATS.mp4", slug: "iberica" },
  { file: "ITALIA_POSITANO_GOURMEATS.mp4", slug: "italia" },
  { file: "PROVOLA E PEPE_POSITANO_GOURMEATS.mp4", slug: "provola-e-pepe" },
  { file: "BÚFALA_POSITANO_GOURMEATS.mp4", slug: "bufala" },
  { file: "ORTOLANA_POSITANO_GOURMEATS.mp4", slug: "ortolana" },
  { file: "SALSICCIA E FRIARELLI_POSITANO_GOURMEATS.mp4", slug: "salsiccia-e-friarelli" },
  { file: "CINQUE FORMAGGI_POSITANO_GOURMEATS.mp4", slug: "cinque-formaggi" },
  { file: "MORTADELLA_POSITANO_GOURMEATS.mp4", slug: "mortadella" },
  { file: "ROMA_POSITANO_GOURMEATS.mp4", slug: "roma" },
  { file: "EBOLI_POSITANO_GOURMEATS.mp4", slug: "eboli" },
  { file: "TARTUFO_POSITANO_GOURMEATS.mp4", slug: "tartufo" },
];
