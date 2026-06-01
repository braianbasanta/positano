export type Wine = {
  name: string;
  /** Bodega / productor (o cervecera). */
  producer?: string;
  /** Región de origen (DOP/DOC/IGT). */
  region?: string;
  /** Variedad(es) de uva (o estilo, en cervezas). */
  grape?: string;
  /** Precio de la botella / unidad. */
  price: string;
  /** Precio de la copa (si se sirve por copa). */
  glass?: string;
  /** Notas de cata. */
  notes?: string;
  notesEn?: string;
  /** Vino destacado de la carta. */
  featured?: boolean;
  /** Foto de la botella (ruta en /public). */
  image?: string;
};

export type WineCategory = {
  id: string;
  name: string;
  nameEn?: string;
  items: Wine[];
};

export const wines: WineCategory[] = [
  {
    id: "burbujas",
    name: "Burbujas",
    nameEn: "Sparkling",
    items: [
      {
        name: "Prosecco DOC Treviso Extra Dry",
        producer: "Maschio dei Cavalieri",
        region: "Veneto",
        grape: "85% Glera · 15% Bianchetta",
        price: "18,00 €",
        glass: "5,50 €",
        notes:
          "Suave, con notas de flores de acacia, manzana y pera. Burbuja fina, fresco y delicadamente afrutado.",
        notesEn:
          "Soft, with notes of acacia blossom, apple and pear. Fine bubbles, fresh and delicately fruity.",
      },
      {
        name: "Lambrusco Rosato Diamante",
        producer: "Colli Diamante",
        region: "Emilia-Romagna",
        grape: "Lambrusco",
        price: "16,90 €",
        featured: true,
        image: "/wines/vino-lambrusco-rosato-rosedibacco-01.jpg",
        notes:
          "Notas de frambuesa, granada y arándano rojo. Refrescante, suave y con un punto dulce.",
        notesEn:
          "Notes of raspberry, pomegranate and cranberry. Refreshing, soft and gently sweet.",
      },
      {
        name: "Lambrusco Rosso Diamante",
        producer: "Colli Diamante",
        region: "Emilia-Romagna",
        grape: "Lambrusco",
        price: "16,90 €",
        featured: true,
        image: "/wines/lambrusco-rosso.jpg",
        notes:
          "Notas de fresa y grosella. Sabroso, afrutado y con un punto dulce.",
        notesEn:
          "Notes of strawberry and redcurrant. Savoury, fruity and gently sweet.",
      },
    ],
  },
  {
    id: "rosados",
    name: "Rosados",
    nameEn: "Rosé",
    items: [
      {
        name: "Tempranillo Rosado",
        producer: "Finca Fella · Cala Rey",
        region: "Alpera",
        grape: "100% Tempranillo",
        price: "13,50 €",
        notes:
          "Color rosa claro. Aroma suave de fresa y frambuesa con una nota de mandarina. Suave y equilibrado.",
        notesEn:
          "Pale pink. Soft aroma of strawberry and raspberry with a hint of tangerine. Smooth and balanced.",
      },
    ],
  },
  {
    id: "blancos",
    name: "Blancos",
    nameEn: "Whites",
    items: [
      {
        name: "Bianco Salento IGT",
        producer: "Altana di Vico",
        region: "Puglia",
        grape: "Chardonnay · Malvasía",
        price: "12,90 €",
        notes:
          "Amarillo pajizo con reflejos dorados. Aromas fragantes de flores blancas, albaricoque y plátano. Seco, suave y sabroso.",
        notesEn:
          "Straw yellow with golden hints. Fragrant aromas of white flowers, apricot and banana. Dry, soft and flavourful.",
      },
      {
        name: "Grillo Sicilia DOC",
        producer: "Infinitum",
        region: "Sicilia",
        grape: "100% Grillo",
        price: "13,50 €",
        glass: "4,00 €",
        image: "/wines/vino-grillo-infinitum.jpg",
        notes:
          "Amarillo intenso. Aroma de fruta madura y tropical con una nota de madreselva. Sabroso, afrutado y de buen cuerpo.",
        notesEn:
          "Intense yellow. Aroma of ripe and tropical fruit with a hint of honeysuckle. Flavourful, fruity and full-bodied.",
      },
      {
        name: "Pinot Grigio Oltrepò Pavese DOC",
        producer: "Terre d'Oltrepò",
        region: "Lombardia",
        grape: "100% Pinot Grigio",
        price: "14,00 €",
        notes:
          "Amarillo pajizo, suave y delicado con notas de pera, manzana y flores blancas. Fresco y ligeramente seco.",
        notesEn:
          "Straw yellow, soft and delicate with notes of pear, apple and white flowers. Fresh and lightly dry.",
      },
      {
        name: "I Muri Bianco Puglia IGP",
        producer: "Vigneti del Salento",
        region: "Puglia",
        grape: "Malvasía · Chardonnay · Bombino",
        price: "16,00 €",
        glass: "5,50 €",
        notes:
          "Amarillo pajizo con reflejos dorados. Aroma intenso de fruta madura con toques de fruta amarilla. Fresco, fácil de beber y armónico.",
        notesEn:
          "Straw yellow with golden hints. Intense aroma of ripe fruit with notes of yellow fruit. Fresh, easy-drinking and harmonious.",
      },
      {
        name: "Verdejo-Sauvignon Blanc",
        producer: "Finca Fella · Cala Rey",
        region: "Alpera",
        grape: "70% Verdejo · 30% Sauvignon",
        price: "16,90 €",
        notes:
          "Amarillo con reflejos verdosos. Aroma potente de mango, piña y anís. Sabroso, dulce y refrescante.",
        notesEn:
          "Yellow with greenish hints. Powerful aroma of mango, pineapple and aniseed. Flavourful, sweet and refreshing.",
      },
      {
        name: "Fantini Chardonnay Terre di Chieti IGT",
        producer: "Fantini",
        region: "Abruzzo",
        grape: "100% Chardonnay",
        price: "18,00 €",
        notes:
          "Amarillo pajizo brillante, con aroma persistente de fruta tropical. De buen cuerpo, equilibrado e intenso.",
        notesEn:
          "Bright straw yellow, with a persistent tropical-fruit aroma. Full-bodied, balanced and intense.",
      },
      {
        name: "Soave Classico DOC",
        producer: "Villa Borghetti",
        region: "Veneto",
        grape: "Garganega · Trebbiano · Chardonnay",
        price: "19,90 €",
        notes:
          "Amarillo pajizo claro, con toques frutales de manzana y melocotón y delicadas notas florales. Fresco, sabroso y equilibrado.",
        notesEn:
          "Pale straw yellow, with fruity touches of apple and peach and delicate floral notes. Fresh, flavourful and balanced.",
      },
      {
        name: "Calalenta Pecorino Terre di Chieti IGT",
        producer: "Fantini",
        region: "Abruzzo",
        grape: "100% Pecorino",
        price: "24,00 €",
        notes:
          "Amarillo paja intenso, con aroma suave y fresco, notas frutales y buen cuerpo.",
        notesEn:
          "Intense straw yellow, with a soft, fresh aroma, fruity notes and good body.",
      },
      {
        name: "Falanghina del Sannio DOC",
        producer: "Feudi San Gregorio",
        region: "Campania",
        grape: "100% Falanghina",
        price: "26,00 €",
        notes:
          "Amarillo pajizo con reflejos verdosos. Aroma suave de flores blancas, paraguaya y melón. Fresco, suave y equilibrado.",
        notesEn:
          "Straw yellow with greenish hints. Soft aroma of white flowers, flat peach and melon. Fresh, soft and balanced.",
      },
      {
        name: "Lacryma Christi Bianco del Vesuvio DOC",
        producer: "Feudi San Gregorio",
        region: "Campania",
        grape: "90% Coda di Volpe · 10% Falanghina",
        price: "27,00 €",
        notes:
          "Amarillo pajizo con aromas de retama, manzana golden, mandarina y hierbas. Seco, fresco y mineral.",
        notesEn:
          "Straw yellow with aromas of broom, Golden apple, tangerine and herbs. Dry, fresh and mineral.",
      },
      {
        name: "Sauvignon Friuli Colli Orientali DOC",
        producer: "Sirch",
        region: "Friuli Venezia Giulia",
        grape: "100% Sauvignon",
        price: "30,00 €",
        notes:
          "Amarillo pajizo con reflejos verdosos. Aromas de menta, lima y pomelo. Fresco y suave con toques afrutados.",
        notesEn:
          "Straw yellow with greenish hints. Aromas of mint, lime and grapefruit. Fresh and soft with fruity touches.",
      },
    ],
  },
  {
    id: "tintos",
    name: "Tintos",
    nameEn: "Reds",
    items: [
      {
        name: "Salento Rosso IGT",
        producer: "Altana di Vico",
        region: "Puglia",
        grape: "Negroamaro · Malvasia Nera",
        price: "14,90 €",
        notes:
          "Tinto del Salento de fruta roja madura, suave y cálido, con taninos amables.",
        notesEn:
          "Salento red with ripe red fruit, soft and warm, with gentle tannins.",
      },
      {
        name: "Merlot Trentino DOC",
        region: "Trentino",
        grape: "100% Merlot",
        price: "15,90 €",
        notes:
          "Merlot alpino, afrutado y suave, con notas de ciruela y un final aterciopelado.",
        notesEn:
          "Alpine Merlot, fruity and smooth, with plum notes and a velvety finish.",
      },
      {
        name: "Montepulciano d'Abruzzo DOC",
        producer: "De Angelis",
        region: "Abruzzo",
        grape: "100% Montepulciano",
        price: "16,90 €",
        notes:
          "Aromas de ciruela negra, mora y grosella. De medio cuerpo, redondo y con buena persistencia.",
        notesEn:
          "Aromas of black plum, blackberry and redcurrant. Medium-bodied, round and persistent.",
      },
      {
        name: "Campania Aglianico IGT",
        region: "Campania",
        grape: "100% Aglianico",
        price: "19,90 €",
        notes:
          "Aglianico de Campania de fruta negra y especias. Estructurado, sabroso y persistente.",
        notesEn:
          "Campania Aglianico with black fruit and spice. Structured, savoury and persistent.",
      },
      {
        name: "Il Passo Verde Nero d'Avola DOP Bio",
        producer: "Vigneti Zabù",
        region: "Sicilia · 6 meses",
        grape: "100% Nero d'Avola",
        price: "21,00 €",
        image: "/wines/vino-il-passo-verde-nero-davola.jpg",
        notes:
          "Aroma potente de fruta roja madura, confitura de cereza y vainilla. De buen cuerpo, goloso, intenso y persistente. Vino ecológico.",
        notesEn:
          "Powerful aroma of ripe red fruit, cherry jam and vanilla. Full-bodied, generous, intense and persistent. Organic wine.",
      },
      {
        name: "Lacryma Christi Rosso del Vesuvio DOC",
        producer: "Feudi San Gregorio",
        region: "Campania",
        grape: "90% Piedirosso · 10% Aglianico",
        price: "24,90 €",
        notes:
          "Color rubí. Aromas de frutos del bosque con una placentera nota de pimienta. Seco y fresco, de medio cuerpo.",
        notesEn:
          "Ruby colour. Forest-fruit aromas with a pleasant peppery note. Dry and fresh, medium-bodied.",
      },
      {
        name: "Rubrato Aglianico Irpino DOC",
        producer: "Feudi San Gregorio",
        region: "Campania · 10 meses",
        grape: "100% Aglianico",
        price: "26,00 €",
        image: "/wines/vino-rubrato-aglianico.jpg",
        notes:
          "Aromas de ciruela, frutos del bosque, regaliz y una nota balsámica. De buen cuerpo, sabroso y seco.",
        notesEn:
          "Aromas of plum, forest fruits, liquorice and a balsamic note. Full-bodied, savoury and dry.",
      },
      {
        name: "Chianti Classico Riserva DOCG",
        region: "Toscana",
        grape: "Sangiovese",
        price: "29,90 €",
        notes:
          "Sangiovese de Toscana criado como Riserva: cereza, especias y un toque de pimienta negra. Intenso, elegante y de final largo.",
        notesEn:
          "Tuscan Sangiovese aged as a Riserva: cherry, spice and a touch of black pepper. Intense, elegant and long on the finish.",
      },
      {
        name: "Rosso di Montalcino DOC",
        producer: "Banfi",
        region: "Toscana · 12 meses",
        grape: "100% Sangiovese",
        price: "34,00 €",
        notes:
          "Rojo rubí, con aromas afrutados de moras y frambuesas y notas de café y tabaco. Amplio, armonioso y equilibrado, con buena persistencia.",
        notesEn:
          "Ruby red, with fruity aromas of blackberry and raspberry and notes of coffee and tobacco. Broad, harmonious and balanced, with good persistence.",
      },
    ],
  },
];

/**
 * Cervezas. Reutilizan el tipo Wine: `producer` = cervecera, `grape` = estilo.
 * Precios y nombres según el TPV (Gloria / Last.app) de Positano.
 */
export const beers: WineCategory[] = [
  {
    id: "cervezas",
    name: "Cervezas",
    nameEn: "Beers",
    items: [
      {
        name: "Caña Estrella",
        grape: "Lager · de barril",
        price: "3,30 €",
        notes: "Estrella Damm tirada de barril, fresca y ligera.",
        notesEn: "Estrella Damm on tap, fresh and light.",
      },
      {
        name: "Caña Clara",
        grape: "Lager · de barril",
        price: "3,30 €",
        notes: "Cerveza clara de barril, suave y refrescante.",
        notesEn: "Light lager on tap, smooth and refreshing.",
      },
      {
        name: "Jarra Estrella",
        grape: "Lager · jarra",
        price: "5,90 €",
        notes: "Estrella Damm en jarra.",
        notesEn: "Estrella Damm by the pint.",
      },
      {
        name: "Jarra Clara",
        grape: "Lager · jarra",
        price: "5,90 €",
        notes: "Cerveza clara en jarra.",
        notesEn: "Light lager by the pint.",
      },
      {
        name: "Turia",
        producer: "Turia",
        grape: "Tostada",
        price: "3,90 €",
        notes: "Cerveza tostada valenciana, maltosa y suave.",
        notesEn: "Valencian amber beer, malty and smooth.",
      },
      {
        name: "Jarra Turia",
        grape: "Tostada · jarra",
        price: "6,00 €",
        notes: "Turia tostada en jarra.",
        notesEn: "Turia amber beer by the pint.",
      },
      {
        name: "Peroni Nastro Azzurro",
        producer: "Peroni",
        region: "Italia",
        grape: "Lager",
        price: "3,50 €",
        notes: "Lager italiana, ligera, crujiente y muy bebible.",
        notesEn: "Italian lager, light, crisp and very drinkable.",
      },
      {
        name: "Voll-Damm Doble Malta",
        producer: "Damm",
        region: "Barcelona",
        grape: "Märzenbier · doble malta",
        price: "3,90 €",
        image: "/wines/cerveza-voll-damm.jpg",
        notes:
          "Cerveza tostada de doble malta, intensa y maltosa, de cuerpo potente.",
        notesEn:
          "Double-malt amber beer, intense and malty, with a powerful body.",
      },
      {
        name: "Birra Messina Cristalli di Sale",
        producer: "Birra Messina",
        region: "Sicilia",
        grape: "Lager · cristales de sal",
        price: "3,90 €",
        image: "/wines/cerveza-birra-messina.jpg",
        notes:
          "Lager siciliana elaborada con sal marina de Sicilia. Ligera, sápida y muy refrescante.",
        notesEn:
          "Sicilian lager brewed with sea salt from Sicily. Light, savoury and very refreshing.",
      },
      {
        name: "Free Damm",
        producer: "Damm",
        region: "Barcelona",
        grape: "Lager 0,0 % · sin alcohol",
        price: "3,90 €",
        image: "/wines/cerveza-free-damm-01.jpg",
        notes: "Lager sin alcohol (0,0 %), ligera y refrescante.",
        notesEn: "Alcohol-free lager (0.0%), light and refreshing.",
      },
      {
        name: "Free Damm Tostada",
        producer: "Damm",
        region: "Barcelona",
        grape: "Tostada 0,0 % · sin alcohol",
        price: "3,90 €",
        notes: "Tostada sin alcohol (0,0 %), maltosa y suave.",
        notesEn: "Alcohol-free amber beer (0.0%), malty and smooth.",
      },
    ],
  },
  {
    id: "cervezas-artesanales",
    name: "Cervezas Artesanales",
    nameEn: "Craft Beers",
    items: [
      {
        name: "Kbirr Cuore di Napoli",
        producer: "Kbirr",
        region: "Nápoles, Italia",
        grape: "Artesana",
        price: "4,50 €",
        notes: "Cerveza artesana napolitana, con carácter y de gran personalidad.",
        notesEn: "Neapolitan craft beer, characterful and full of personality.",
      },
      {
        name: "Kbirr Natavota Lager",
        producer: "Kbirr",
        region: "Nápoles, Italia",
        grape: "Lager artesana · 5,2 %",
        price: "4,50 €",
        notes: "Lager artesana napolitana, limpia y equilibrada.",
        notesEn: "Neapolitan craft lager, clean and balanced.",
      },
      {
        name: "Kbirr Pulcinella",
        producer: "Kbirr",
        region: "Nápoles, Italia",
        grape: "Artesana · 5,2 %",
        price: "4,50 €",
        notes: "Artesana napolitana, suave y aromática.",
        notesEn: "Neapolitan craft beer, smooth and aromatic.",
      },
      {
        name: "Kbirr Nata Vot Strong & Chocolate",
        producer: "Kbirr",
        region: "Nápoles, Italia",
        grape: "Strong ale · chocolate",
        price: "4,90 €",
        notes: "Artesana napolitana intensa, con notas de chocolate.",
        notesEn: "Intense Neapolitan craft beer, with chocolate notes.",
      },
      {
        name: "IPA Baladin",
        producer: "Baladin",
        region: "Piemonte, Italia",
        grape: "IPA artesana",
        price: "4,50 €",
        notes: "IPA artesana italiana, lupulada, aromática y con carácter.",
        notesEn: "Italian craft IPA, hoppy, aromatic and full of character.",
      },
    ],
  },
];

export type FeaturedWine = Wine & { tag: string; tagEn: string };

/** Los dos Lambruscos destacados, mostrados en cabecera de la carta. */
export const featuredWines: FeaturedWine[] = wines
  .flatMap((c) => c.items)
  .filter((w) => w.featured)
  .map((w) => ({
    ...w,
    tag: "Lambrusco · Emilia-Romagna",
    tagEn: "Lambrusco · Emilia-Romagna",
  }));
