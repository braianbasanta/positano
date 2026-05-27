export type Dish = {
  name: string;
  /** Clave estable 1:1 con el reel del plato (ver src/data/reels.ts). */
  slug: string;
  price: string;
  desc?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: Dish[];
};

export const menu: MenuCategory[] = [
  {
    id: "insalate",
    name: "Insalate",
    items: [
      {
        name: "Ensalada César",
        slug: "ensalada-cesar",
        price: "12,90 €",
        desc: "Variado de lechuga, pollo crujiente, virutas de parmesano DOP y picatostes.",
      },
      {
        name: "Ensalada de Queso de Cabra",
        slug: "ensalada-queso-cabra",
        price: "12,90 €",
        desc: "Queso de cabra con rúcula, nueces y miel.",
      },
    ],
  },
  {
    id: "antipasti",
    name: "Antipasti",
    items: [
      { name: "Olivas Sicilianas", slug: "olivas-sicilianas", price: "4,50 €" },
      {
        name: "Burrata Frita Pugliese",
        slug: "burrata-frita-pugliese",
        price: "14,50 €",
        desc: "Frita en base de pistacho y rellena de mermelada de tomate.",
      },
      {
        name: "Caprese de Búfala Campana DOP 2.0",
        slug: "caprese-bufala-dop",
        price: "13,90 €",
        desc: "Búfala campana DOP con trío de tomate amarillo, datterino y tomate seco.",
      },
      {
        name: "Provolone al Horno",
        slug: "provolone-al-horno",
        price: "13,90 €",
        desc: "Al horno con tomate cherry y pesto, acompañado de focaccia.",
      },
      {
        name: "Parmesana de Berenjena",
        slug: "parmesana-berenjena",
        price: "12,90 €",
        desc: "Berenjena gratinada en horno de leña.",
      },
      {
        name: "Montanaras Fritas",
        slug: "montanaras-fritas",
        price: "13,90 €",
        desc: "Delicada masa de pizza frita con tomate y parmesano.",
      },
      {
        name: "Albóndigas de Carne",
        slug: "albondigas-de-carne",
        price: "12,90 €",
        desc: "Albóndigas caseras mixtas con salsa de tomate y parmesano DOP.",
      },
      {
        name: "Calamares Fritos",
        slug: "calamares-fritos",
        price: "13,90 €",
        desc: "Aros de calamar fritos y crujientes.",
      },
      {
        name: "Carpaccio de Solomillo",
        slug: "carpaccio-solomillo",
        price: "17,90 €",
        desc: "De ternera, con rúcula y caviar de frambuesa.",
      },
      {
        name: "Steak Tartar",
        slug: "steak-tartar",
        price: "17,90 €",
        desc: "Ternera cruda, cebolla, alcaparras, perejil, mostaza, tabasco y huevo.",
      },
    ],
  },
  {
    id: "pasta",
    name: "La Nostra Pasta",
    items: [
      {
        name: "Lasaña Tradicional",
        slug: "lasana-tradicional",
        price: "14,90 €",
        desc: "Pasta fresca gratinada al horno con boloñesa, mozzarella y parmesano.",
      },
      {
        name: "Lasaña Vegetariana",
        slug: "lasana-vegetariana",
        price: "14,50 €",
        desc: "Pasta fresca gratinada con calabacín, pimiento, cebolla, champiñón y mozzarella.",
      },
      {
        name: "Tagliatelle con Albóndigas Caseras",
        slug: "tagliatelle-albondigas",
        price: "15,90 €",
        desc: "Salsa de tomate con albóndigas al ragú como las hacía la abuela, con parmesano.",
      },
      {
        name: "Paccheri Genovese",
        slug: "paccheri-genovese",
        price: "15,90 €",
        desc: "Carne de vacuno cocinada 48 h a baja temperatura, cebolla y parmesano DOP.",
      },
      {
        name: "Scialatelli a la Scarpariello",
        slug: "scialatelli-scarpariello",
        price: "14,90 €",
        desc: "Con tomatitos datterino y queso ahumado.",
      },
      {
        name: "Spaghetti Carbonara",
        slug: "spaghetti-carbonara",
        price: "17,90 €",
        desc: "En rueda de pecorino. Mínimo 2 personas (precio por persona).",
      },
      {
        name: "Tagliatelle con Trufa Fresca",
        slug: "tagliatelle-trufa",
        price: "21,90 €",
        desc: "Pasta fresca con trufa negra recién rallada.",
      },
      {
        name: "Linguini Frutti di Mare",
        slug: "linguini-frutti-di-mare",
        price: "18,90 €",
        desc: "Gambas, almejas, mejillones, sepia, langostino, tomate fresco y vino blanco.",
      },
      {
        name: "Scialatelli con Bogavante",
        slug: "scialatelli-bogavante",
        price: "21,90 €",
        desc: "Pasta fresca con bogavante, tomate amarillo y pistacho de Bronte.",
      },
      {
        name: "Paccheri con Cigala",
        slug: "paccheri-cigala",
        price: "18,90 €",
        desc: "Salsa con cigala, calamares, tomate y burrata pugliese.",
      },
    ],
  },
  {
    id: "pasta-fresca",
    name: "Pasta Fresca",
    items: [
      {
        name: "Raviolotto",
        slug: "raviolotto",
        price: "15,90 €",
        desc: "Relleno de ricotta y espinacas con salsa de mantequilla y salvia.",
      },
      {
        name: "Panciotti",
        slug: "panciotti",
        price: "15,90 €",
        desc: "Relleno de berenjena y scamorza con salsa de mantequilla y albahaca.",
      },
      {
        name: "Gnocchi Sorrentina",
        slug: "gnocchi-sorrentina",
        price: "13,90 €",
        desc: "Salsa de tomate, mozzarella, albahaca y parmesano DOP gratinado al horno.",
      },
    ],
  },
  {
    id: "risotti",
    name: "Risotti",
    items: [
      {
        name: "Risotto con Calabacín y Gambas",
        slug: "risotto-calabacin-gambas",
        price: "18,90 €",
        desc: "Con carpaccio de gambas y calabacín.",
      },
      {
        name: "Risotto ai Funghi",
        slug: "risotto-ai-funghi",
        price: "18,90 €",
        desc: "Con mixto de setas y aceite de trufa.",
      },
    ],
  },
  {
    id: "secondi",
    name: "Secondi",
    items: [
      {
        name: "Solomillo de Ternera",
        slug: "solomillo-ternera",
        price: "25,90 €",
        desc: "Salsa de pimienta negra, trufa fresca y parmentier de patatas.",
      },
      {
        name: "Filete de Salmón",
        slug: "filete-salmon",
        price: "20,90 €",
        desc: "Con pistacho de Bronte y verduras salteadas.",
      },
    ],
  },
  {
    id: "pizze",
    name: "Le Nostre Pizze",
    items: [
      {
        name: "Marinara",
        slug: "marinara",
        price: "7,90 €",
        desc: "Tomate Marrazzo, ajo, albahaca y aceite EVO.",
      },
      {
        name: "Margherita",
        slug: "margherita",
        price: "9,00 €",
        desc: "Tomate Marrazzo, fior di latte campano, albahaca y aceite EVO.",
      },
      {
        name: "Diavola",
        slug: "diavola",
        price: "14,90 €",
        desc: "Tomate Marrazzo, fior di latte campano, spianata picante y albahaca.",
      },
      {
        name: "Prosciutto e Funghi",
        slug: "prosciutto-e-funghi",
        price: "14,50 €",
        desc: "Tomate Marrazzo, fior di latte campano, jamón cocido, champiñones y albahaca.",
      },
      {
        name: "Capricciosa",
        slug: "capricciosa",
        price: "14,90 €",
        desc: "Tomate Marrazzo, fior di latte campano, jamón cocido, champiñones, alcachofas y olivas negras.",
      },
      {
        name: "Calzone Positano",
        slug: "calzone-positano",
        price: "14,90 €",
        desc: "Tomate Marrazzo, fior di latte campano, jamón cocido, ricotta y albahaca.",
      },
      {
        name: "Siciliana",
        slug: "siciliana",
        price: "17,00 €",
        desc: "Tomate Marrazzo, fior di latte campano, berenjena frita, láminas de ricotta salada y albahaca.",
      },
      {
        name: "Ibérica",
        slug: "iberica",
        price: "21,90 €",
        desc: "Tomate Marrazzo, fior di latte campano, jamón ibérico, láminas de parmesano y albahaca.",
      },
      {
        name: "Italia",
        slug: "italia",
        price: "17,50 €",
        desc: "Tomate Marrazzo, fior di latte campano, jamón de Parma 24 meses, rúcula y parmesano.",
      },
      {
        name: "Provola e Pepe",
        slug: "provola-e-pepe",
        price: "14,00 €",
        desc: "Tomate Marrazzo, provola ahumada, pimienta negra, albahaca y aceite EVO.",
      },
      {
        name: "Búfala",
        slug: "bufala",
        price: "14,90 €",
        desc: "Tomate Marrazzo, búfala campana DOP, albahaca y aceite EVO.",
      },
      {
        name: "Ortolana",
        slug: "ortolana",
        price: "14,50 €",
        desc: "Tomate Marrazzo, fior di latte campano, cebolla roja, pimiento y champiñones.",
      },
      {
        name: "Salsiccia e Friarelli",
        slug: "salsiccia-e-friarelli",
        price: "15,90 €",
        desc: "Fior di latte campano, butifarra casertana, friarielli y tarallo napolitano.",
      },
      {
        name: "Cinque Formaggi",
        slug: "cinque-formaggi",
        price: "16,90 €",
        desc: "Fior di latte campano, gorgonzola DOP, grana padano 24 meses, provolone y ricotta.",
      },
      {
        name: "Mortadella",
        slug: "mortadella",
        price: "20,00 €",
        desc: "Fior di latte campano, crema de pistacho de Bronte, mortadella IGP y burrata pugliese.",
      },
      {
        name: "Roma",
        slug: "roma",
        price: "18,90 €",
        desc: "Fior di latte campano, crema de alcachofa, guanciale crujiente y parmesano 24 meses.",
      },
      {
        name: "Eboli",
        slug: "eboli",
        price: "20,00 €",
        desc: "Fior di latte campano, provolone, spianata picante, cebolla roja y borde relleno de ricotta.",
      },
      {
        name: "Tartufo",
        slug: "tartufo",
        price: "21,90 €",
        desc: "Fior di latte campano, crema de trufa, yema de huevo, grana padano 24 meses y albahaca.",
      },
    ],
  },
];

export type FeaturedDish = Dish & { tag: string };

export const featured: FeaturedDish[] = [
  {
    tag: "Pizza",
    name: "Margherita",
    slug: "margherita",
    price: "9,00 €",
    desc: "Tomate Marrazzo, fior di latte campano y albahaca.",
  },
  {
    tag: "Pizza",
    name: "Tartufo",
    slug: "tartufo",
    price: "21,90 €",
    desc: "Crema de trufa, yema de huevo y grana padano 24 meses.",
  },
  {
    tag: "Pasta",
    name: "Tagliatelle con Trufa Fresca",
    slug: "tagliatelle-trufa",
    price: "21,90 €",
    desc: "Pasta fresca con trufa negra recién rallada.",
  },
  {
    tag: "Pizza",
    name: "Diavola",
    slug: "diavola",
    price: "14,90 €",
    desc: "Tomate Marrazzo, fior di latte campano y spianata picante.",
  },
  {
    tag: "Pasta",
    name: "Linguini Frutti di Mare",
    slug: "linguini-frutti-di-mare",
    price: "18,90 €",
    desc: "Gambas, almejas, mejillones, sepia y langostino.",
  },
  {
    tag: "Secondi",
    name: "Solomillo de Ternera",
    slug: "solomillo-ternera",
    price: "25,90 €",
    desc: "Pimienta negra, trufa fresca y parmentier de patatas.",
  },
];

/** Todos los slugs en orden de carta — para navegar el visor de reels. */
export const allDishes: Dish[] = menu.flatMap((category) => category.items);
