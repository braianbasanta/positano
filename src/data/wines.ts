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
  notesIt?: string;
  notesFr?: string;
  notesDe?: string;
  notesNl?: string;
  /** Vino destacado de la carta. */
  featured?: boolean;
  /** Foto de la botella (ruta en /public). */
  image?: string;
};

export type WineCategory = {
  id: string;
  name: string;
  nameEn?: string;
  nameIt?: string;
  nameFr?: string;
  nameDe?: string;
  nameNl?: string;
  items: Wine[];
};

export const wines: WineCategory[] = [
  {
    id: "burbujas",
    name: "Burbujas",
    nameEn: "Sparkling",
    nameIt: "Spumante",
    nameFr: "Mousseux",
    nameDe: "Schaumwein",
    nameNl: "Mousserend",
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
        notesIt: "Morbido, con sentori di fiori d’acacia, mela e pera. Bollicine fini, fresco e delicatamente fruttato.",
        notesFr: "Doux, avec des notes de fleur d'acacia, de pomme et de poire. Bulles fines, frais et délicatement fruité.",
        notesDe: "Weich, mit Noten von Akazienblüten, Apfel und Birne. Feine Perlage, frisch und zart fruchtig.",
        notesNl: "Zacht, met tonen van acaciabloesem, appel en peer. Fijne bubbels, fris en subtiel fruitig.",
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
        notesIt: "Note di lampone, melograno e mirtillo rosso. Rinfrescante, morbido e delicatamente dolce.",
        notesFr: "Notes de framboise, de grenade et de canneberge. Rafraîchissant, moelleux et légèrement sucré.",
        notesDe: "Noten von Himbeere, Granatapfel und Preiselbeere. Erfrischend, weich und sanft süß.",
        notesNl: "Tonen van framboos, granaatappel en cranberry. Verfrissend, zacht en lichtzoet.",
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
        notesIt: "Note di fragola e ribes rosso. Saporito, fruttato e delicatamente dolce.",
        notesFr: "Notes de fraise et de groseille. Savoureux, fruité et légèrement sucré.",
        notesDe: "Noten von Erdbeere und roter Johannisbeere. Herzhaft, fruchtig und sanft süß.",
        notesNl: "Tonen van aardbei en rode bessen. Hartig, fruitig en lichtzoet.",
      },
    ],
  },
  {
    id: "rosados",
    name: "Rosados",
    nameEn: "Rosé",
    nameIt: "Rosé",
    nameFr: "Rosé",
    nameDe: "Rosé",
    nameNl: "Rosé",
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
        notesIt: "Rosa pallido. Profumo delicato di fragola e lampone con un accenno di mandarino. Morbido ed equilibrato.",
        notesFr: "Robe rose pâle. Arômes délicats de fraise et de framboise, avec une touche de mandarine. Bouche souple et équilibrée.",
        notesDe: "Blassrosa. Zartes Aroma von Erdbeere und Himbeere mit einem Hauch von Mandarine. Weich und ausgewogen.",
        notesNl: "Lichtroze. Zacht aroma van aardbei en framboos met een vleugje mandarijn. Soepel en evenwichtig.",
      },
    ],
  },
  {
    id: "blancos",
    name: "Blancos",
    nameEn: "Whites",
    nameIt: "Vini bianchi",
    nameFr: "Vins blancs",
    nameDe: "Weißweine",
    nameNl: "Witte wijnen",
    items: [
      {
        name: "Bianco Salento IGT",
        producer: "Altana di Vico",
        region: "Puglia",
        grape: "Chardonnay · Malvasía",
        price: "12,90 €",
        image: "/wines/vino-bianco-salento.jpg",
        notes:
          "Amarillo pajizo con reflejos dorados. Aromas fragantes de flores blancas, albaricoque y plátano. Seco, suave y sabroso.",
        notesEn:
          "Straw yellow with golden hints. Fragrant aromas of white flowers, apricot and banana. Dry, soft and flavourful.",
        notesIt: "Giallo paglierino con riflessi dorati. Profumi intensi di fiori bianchi, albicocca e banana. Secco, morbido e saporito.",
        notesFr: "Robe jaune paille aux reflets dorés. Arômes parfumés de fleurs blanches, d'abricot et de banane. Sec, souple et savoureux.",
        notesDe: "Strohgelb mit goldenen Reflexen. Duftende Aromen von weißen Blüten, Aprikose und Banane. Trocken, weich und geschmacksintensiv.",
        notesNl: "Strogeel met gouden accenten. Geurige aroma’s van witte bloemen, abrikoos en banaan. Droog, zacht en smaakvol.",
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
        notesIt: "Giallo intenso. Profumo di frutta matura e tropicale con un accenno di caprifoglio. Saporito, fruttato e corposo.",
        notesFr: "Robe jaune intense. Nez de fruits mûrs et tropicaux avec une touche de chèvrefeuille. Savoureux, fruité et corsé.",
        notesDe: "Intensives Gelb. Aroma von reifen und tropischen Früchten mit einem Hauch von Geißblatt. Geschmacksintensiv, fruchtig und vollmundig.",
        notesNl: "Intens geel. Geur van rijp en tropisch fruit met een vleugje kamperfoelie. Smaakvol, fruitig en vol van smaak.",
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
        notesIt: "Giallo paglierino, morbido e delicato con sentori di pera, mela e fiori bianchi. Fresco e leggermente secco.",
        notesFr: "Robe jaune paille, souple et délicat, avec des notes de poire, de pomme et de fleurs blanches. Frais et légèrement sec.",
        notesDe: "Strohgelb, weich und zart mit Noten von Birne, Apfel und weißen Blüten. Frisch und leicht trocken.",
        notesNl: "Strogeel, zacht en delicaat met tonen van peer, appel en witte bloemen. Fris en licht droog.",
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
        notesIt: "Giallo paglierino con riflessi dorati. Profumo intenso di frutta matura con note di frutta gialla. Fresco, beverino e armonioso.",
        notesFr: "Robe jaune paille aux reflets dorés. Nez intense de fruits mûrs avec des notes de fruits jaunes. Frais, facile à boire et harmonieux.",
        notesDe: "Strohgelb mit goldenen Reflexen. Intensives Aroma von reifen Früchten mit Noten von gelben Früchten. Frisch, leicht zu trinken und harmonisch.",
        notesNl: "Strogele kleur met gouden accenten. Intens aroma van rijp fruit met tonen van geel fruit. Fris, makkelijk drinkbaar en harmonieus.",
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
        notesIt: "Giallo con riflessi verdognoli. Profumo intenso di mango, ananas e anice. Saporito, dolce e rinfrescante.",
        notesFr: "Robe jaune aux reflets verdâtres. Arômes puissants de mangue, d'ananas et d'anis. Savoureux, doux et rafraîchissant.",
        notesDe: "Gelb mit grünlichen Reflexen. Kräftiges Aroma von Mango, Ananas und Anis. Vollmundig, süß und erfrischend.",
        notesNl: "Geel met groene tinten. Krachtig aroma van mango, ananas en anijs. Smaakvol, zoet en verfrissend.",
      },
      {
        name: "Fantini Chardonnay Terre di Chieti IGT",
        producer: "Fantini",
        region: "Abruzzo",
        grape: "100% Chardonnay",
        price: "18,00 €",
        image: "/wines/vino-fantini-chardonnay.jpg",
        notes:
          "Amarillo pajizo brillante, con aroma persistente de fruta tropical. De buen cuerpo, equilibrado e intenso.",
        notesEn:
          "Bright straw yellow, with a persistent tropical-fruit aroma. Full-bodied, balanced and intense.",
        notesIt: "Giallo paglierino brillante, con un profumo persistente di frutta tropicale. Corposo, equilibrato e intenso.",
        notesFr: "Robe jaune paille éclatante, avec un arôme persistant de fruits tropicaux. Corsé, équilibré et intense.",
        notesDe: "Leuchtendes Strohgelb mit einem anhaltenden Aroma nach tropischen Früchten. Vollmundig, ausgewogen und intensiv.",
        notesNl: "Helder strogele kleur, met een aanhoudend aroma van tropisch fruit. Vol, evenwichtig en intens.",
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
        notesIt: "Giallo paglierino chiaro, con sentori fruttati di mela e pesca e delicate note floreali. Fresco, saporito ed equilibrato.",
        notesFr: "Robe jaune paille pâle, avec des notes fruitées de pomme et de pêche et de délicates notes florales. Frais, savoureux et équilibré.",
        notesDe: "Blasses Strohgelb mit fruchtigen Noten von Apfel und Pfirsich sowie zarten blumigen Anklängen. Frisch, aromatisch und ausgewogen.",
        notesNl: "Licht strogeel, met fruitige accenten van appel en perzik en subtiele bloemige tonen. Fris, smaakvol en evenwichtig.",
      },
      {
        name: "Calalenta Pecorino Terre di Chieti IGT",
        producer: "Fantini",
        region: "Abruzzo",
        grape: "100% Pecorino",
        price: "24,00 €",
        image: "/wines/vino-calalenta-pecorino.jpg",
        notes:
          "Amarillo paja intenso, con aroma suave y fresco, notas frutales y buen cuerpo.",
        notesEn:
          "Intense straw yellow, with a soft, fresh aroma, fruity notes and good body.",
        notesIt: "Giallo paglierino intenso, con un profumo delicato e fresco, note fruttate e un buon corpo.",
        notesFr: "Robe jaune paille intense, avec un nez doux et frais, des notes fruitées et un bon corps.",
        notesDe: "Intensives Strohgelb, mit einem sanften, frischen Aroma, fruchtigen Noten und gutem Körper.",
        notesNl: "Intens strogeel, met een zacht, fris aroma, fruitige tonen en een goede body.",
      },
      {
        name: "Falanghina del Sannio DOC",
        producer: "Feudi San Gregorio",
        region: "Campania",
        grape: "100% Falanghina",
        price: "26,00 €",
        image: "/wines/vino-falanghina-sannio.jpg",
        notes:
          "Amarillo pajizo con reflejos verdosos. Aroma suave de flores blancas, paraguaya y melón. Fresco, suave y equilibrado.",
        notesEn:
          "Straw yellow with greenish hints. Soft aroma of white flowers, flat peach and melon. Fresh, soft and balanced.",
        notesIt: "Giallo paglierino con riflessi verdognoli. Profumo delicato di fiori bianchi, pesca matura e melone. Fresco, morbido ed equilibrato.",
        notesFr: "Robe jaune paille aux reflets verdâtres. Nez délicat de fleurs blanches, de pêche mûre et de melon. Frais, souple et équilibré.",
        notesDe: "Strohgelb mit grünlichen Reflexen. Zartes Aroma von weißen Blüten, reifem Pfirsich und Melone. Frisch, zart und ausgewogen.",
        notesNl: "Strogeel met groenachtige tinten. Zacht aroma van witte bloemen, perzik en meloen. Fris, zacht en evenwichtig.",
      },
      {
        name: "Lacryma Christi Bianco del Vesuvio DOC",
        producer: "Feudi San Gregorio",
        region: "Campania",
        grape: "90% Coda di Volpe · 10% Falanghina",
        price: "27,00 €",
        image: "/wines/vino-lacryma-christi-bianco.jpg",
        notes:
          "Amarillo pajizo con aromas de retama, manzana golden, mandarina y hierbas. Seco, fresco y mineral.",
        notesEn:
          "Straw yellow with aromas of broom, Golden apple, tangerine and herbs. Dry, fresh and mineral.",
        notesIt: "Giallo paglierino con sentori di ginestra, mela Golden, mandarino ed erbe aromatiche. Secco, fresco e minerale.",
        notesFr: "Robe jaune paille aux arômes de genêt, de pomme Golden, de mandarine et d'herbes aromatiques. Sec, frais et minéral.",
        notesDe: "Strohgelb mit Aromen von Ginster, Golden Apple, Mandarine und Kräutern. Trocken, frisch und mineralisch.",
        notesNl: "Strogeel van kleur met aroma's van brem, Golden-appel, mandarijn en kruiden. Droog, fris en mineraal.",
      },
      {
        name: "Sauvignon Friuli Colli Orientali DOC",
        producer: "Sirch",
        region: "Friuli Venezia Giulia",
        grape: "100% Sauvignon",
        price: "30,00 €",
        image: "/wines/vino-sauvignon-friuli.jpg",
        notes:
          "Amarillo pajizo con reflejos verdosos. Aromas de menta, lima y pomelo. Fresco y suave con toques afrutados.",
        notesEn:
          "Straw yellow with greenish hints. Aromas of mint, lime and grapefruit. Fresh and soft with fruity touches.",
        notesIt: "Giallo paglierino con riflessi verdognoli. Profumi di menta, lime e pompelmo. Fresco e morbido, con note fruttate.",
        notesFr: "Robe jaune paille aux reflets verdâtres. Arômes de menthe, de citron vert et de pamplemousse. Frais et souple, avec des notes fruitées.",
        notesDe: "Strohgelb mit grünlichen Reflexen. Aromen von Minze, Limette und Grapefruit. Frisch und weich mit fruchtigen Noten.",
        notesNl: "Strogeel met groenachtige tinten. Aroma’s van munt, limoen en grapefruit. Fris en zacht met fruitige accenten.",
      },
    ],
  },
  {
    id: "tintos",
    name: "Tintos",
    nameEn: "Reds",
    nameIt: "Rossi",
    nameFr: "Vins rouges",
    nameDe: "Rotweine",
    nameNl: "Rode wijnen",
    items: [
      {
        name: "Salento Rosso IGT",
        producer: "Altana di Vico",
        region: "Puglia",
        grape: "Negroamaro · Malvasia Nera",
        price: "14,90 €",
        image: "/wines/vino-salento-rosso.jpg",
        notes:
          "Tinto del Salento de fruta roja madura, suave y cálido, con taninos amables.",
        notesEn:
          "Salento red with ripe red fruit, soft and warm, with gentle tannins.",
        notesIt: "Rosso del Salento con sentori di frutta rossa matura, morbido e avvolgente, con tannini delicati.",
        notesFr: "Vin rouge du Salento aux arômes de fruits rouges mûrs, souple et chaleureux, aux tanins doux.",
        notesDe: "Ein Rotwein aus dem Salento mit Noten von reifen roten Früchten, weich und warm, mit sanften Tanninen.",
        notesNl: "Rode wijn uit Salento met rijp rood fruit, zacht en warm, met milde tannines.",
      },
      {
        name: "Merlot Trentino DOC",
        region: "Trentino",
        grape: "100% Merlot",
        price: "15,90 €",
        image: "/wines/vino-merlot-trentino.jpg",
        notes:
          "Merlot alpino, afrutado y suave, con notas de ciruela y un final aterciopelado.",
        notesEn:
          "Alpine Merlot, fruity and smooth, with plum notes and a velvety finish.",
        notesIt: "Merlot alpino, fruttato e morbido, con note di prugna e un retrogusto vellutato.",
        notesFr: "Merlot alpin, fruité et moelleux, aux notes de prune et à la finale veloutée.",
        notesDe: "Alpine Merlot, fruchtig und geschmeidig, mit Noten von Pflaumen und einem samtigen Abgang.",
        notesNl: "Alpine Merlot, fruitig en soepel, met tonen van pruimen en een fluweelzachte afdronk.",
      },
      {
        name: "Montepulciano d'Abruzzo DOC",
        producer: "De Angelis",
        region: "Abruzzo",
        grape: "100% Montepulciano",
        price: "16,90 €",
        image: "/wines/vino-montepulciano-abruzzo.jpg",
        notes:
          "Aromas de ciruela negra, mora y grosella. De medio cuerpo, redondo y con buena persistencia.",
        notesEn:
          "Aromas of black plum, blackberry and redcurrant. Medium-bodied, round and persistent.",
        notesIt: "Aromi di prugna nera, mora e ribes rosso. Di medio corpo, rotondo e persistente.",
        notesFr: "Arômes de prune noire, de mûre et de groseille. Moyennement corsé, rond et persistant.",
        notesDe: "Aromen von schwarzen Pflaumen, Brombeeren und roten Johannisbeeren. Mittelkräftig, rund und lang anhaltend.",
        notesNl: "Aroma's van zwarte pruim, bramen en rode bessen. Medium body, rond en lang in de afdronk.",
      },
      {
        name: "Campania Aglianico IGT",
        region: "Campania",
        grape: "100% Aglianico",
        price: "19,90 €",
        image: "/wines/vino-campania-aglianico.jpg",
        notes:
          "Aglianico de Campania de fruta negra y especias. Estructurado, sabroso y persistente.",
        notesEn:
          "Campania Aglianico with black fruit and spice. Structured, savoury and persistent.",
        notesIt: "Aglianico campano con note di frutta nera e spezie. Strutturato, sapido e persistente.",
        notesFr: "Aglianico de Campanie aux arômes de fruits noirs et d'épices. Structuré, savoureux et persistant.",
        notesDe: "Aglianico aus Kampanien mit Noten von schwarzen Früchten und Gewürzen. Strukturiert, würzig und lang anhaltend.",
        notesNl: "Aglianico uit Campania met tonen van zwart fruit en kruiden. Gestructureerd, hartig en met een lange afdronk.",
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
        notesIt: "Aroma intenso di frutta rossa matura, confettura di ciliegie e vaniglia. Corposo, generoso, intenso e persistente. Vino biologico.",
        notesFr: "Arôme puissant de fruits rouges mûrs, de confiture de cerises et de vanille. Corsé, généreux, intense et persistant. Vin bio.",
        notesDe: "Kräftiges Aroma von reifen roten Früchten, Kirschkonfitüre und Vanille. Vollmundig, üppig, intensiv und lang anhaltend. Bio-Wein.",
        notesNl: "Krachtig aroma van rijp rood fruit, kersenjam en vanille. Vol, rijk, intens en langdurig. Biologische wijn.",
      },
      {
        name: "Lacryma Christi Rosso del Vesuvio DOC",
        producer: "Feudi San Gregorio",
        region: "Campania",
        grape: "90% Piedirosso · 10% Aglianico",
        price: "24,90 €",
        image: "/wines/vino-lacryma-christi-rosso.jpg",
        notes:
          "Color rubí. Aromas de frutos del bosque con una placentera nota de pimienta. Seco y fresco, de medio cuerpo.",
        notesEn:
          "Ruby colour. Forest-fruit aromas with a pleasant peppery note. Dry and fresh, medium-bodied.",
        notesIt: "Colore rubino. Aromi di frutti di bosco con una piacevole nota pepata. Secco e fresco, di medio corpo.",
        notesFr: "Couleur rubis. Arômes de fruits des bois avec une agréable note poivrée. Sec et frais, moyennement corsé.",
        notesDe: "Rubinrote Farbe. Aromen von Waldfrüchten mit einer angenehmen pfeffrigen Note. Trocken und frisch, von mittlerem Körper.",
        notesNl: "Robijnrode kleur. Aroma’s van bosvruchten met een aangename peperige toets. Droog en fris, met een gemiddelde body.",
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
        notesIt: "Aromi di prugna, frutti di bosco, liquirizia e una nota balsamica. Corposo, sapido e secco.",
        notesFr: "Arômes de prune, de fruits des bois, de réglisse et une note balsamique. Corsé, savoureux et sec.",
        notesDe: "Aromen von Pflaume, Waldfrüchten, Lakritz und einer balsamischen Note. Vollmundig, würzig und trocken.",
        notesNl: "Aroma's van pruim, bosvruchten, zoethout en een vleugje balsamico. Vol van smaak, hartig en droog.",
      },
      {
        name: "Chianti Classico Riserva DOCG",
        region: "Toscana",
        grape: "Sangiovese",
        price: "29,90 €",
        image: "/wines/vino-chianti-classico-riserva.jpg",
        notes:
          "Sangiovese de Toscana criado como Riserva: cereza, especias y un toque de pimienta negra. Intenso, elegante y de final largo.",
        notesEn:
          "Tuscan Sangiovese aged as a Riserva: cherry, spice and a touch of black pepper. Intense, elegant and long on the finish.",
        notesIt: "Sangiovese toscano invecchiato come Riserva: ciliegia, spezie e un tocco di pepe nero. Intenso, elegante e con un finale lungo.",
        notesFr: "Un Sangiovese toscan élevé en tant que « Riserva » : arômes de cerise, d'épices et une touche de poivre noir. Intense, élégant et avec une longue finale.",
        notesDe: "Ein toskanischer Sangiovese, als Riserva gereift: Kirsche, Gewürze und ein Hauch von schwarzem Pfeffer. Intensiv, elegant und mit langem Abgang.",
        notesNl: "Toscaanse Sangiovese, gerijpt als Riserva: kersen, kruiden en een vleugje zwarte peper. Intens, elegant en met een lange afdronk.",
      },
      {
        name: "Rosso di Montalcino DOC",
        producer: "Banfi",
        region: "Toscana · 12 meses",
        grape: "100% Sangiovese",
        price: "34,00 €",
        image: "/wines/vino-rosso-montalcino.jpg",
        notes:
          "Rojo rubí, con aromas afrutados de moras y frambuesas y notas de café y tabaco. Amplio, armonioso y equilibrado, con buena persistencia.",
        notesEn:
          "Ruby red, with fruity aromas of blackberry and raspberry and notes of coffee and tobacco. Broad, harmonious and balanced, with good persistence.",
        notesIt: "Rosso rubino, con aromi fruttati di mora e lampone e sentori di caffè e tabacco. Ampio, armonioso ed equilibrato, con una buona persistenza.",
        notesFr: "Rouge rubis, aux arômes fruités de mûre et de framboise, avec des notes de café et de tabac. Ample, harmonieux et équilibré, avec une belle longueur en bouche.",
        notesDe: "Rubinrot, mit fruchtigen Aromen von Brombeere und Himbeere sowie Noten von Kaffee und Tabak. Vollmundig, harmonisch und ausgewogen, mit gutem Abgang.",
        notesNl: "Robuust rood, met fruitige aroma’s van bramen en frambozen en tonen van koffie en tabak. Vol, harmonieus en evenwichtig, met een mooie afdronk.",
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
    nameIt: "Birre",
    nameFr: "Bières",
    nameDe: "Biere",
    nameNl: "Bieren",
    items: [
      {
        name: "Caña Estrella",
        grape: "Lager · de barril",
        price: "3,30 €",
        notes: "Estrella Damm tirada de barril, fresca y ligera.",
        notesEn: "Estrella Damm on tap, fresh and light.",
        notesIt: "Estrella Damm alla spina, fresca e leggera.",
        notesFr: "Estrella Damm à la pression, fraîche et légère.",
        notesDe: "Estrella Damm vom Fass, frisch und leicht.",
        notesNl: "Estrella Damm van de tap, fris en licht.",
      },
      {
        name: "Caña Clara",
        grape: "Lager · de barril",
        price: "3,30 €",
        notes: "Cerveza clara de barril, suave y refrescante.",
        notesEn: "Light lager on tap, smooth and refreshing.",
        notesIt: "Birra chiara alla spina, morbida e rinfrescante.",
        notesFr: "Bière blonde légère à la pression, douce et rafraîchissante.",
        notesDe: "Helles Lagerbier vom Fass, mild und erfrischend.",
        notesNl: "Licht bier van de tap, zacht en verfrissend.",
      },
      {
        name: "Jarra Estrella",
        grape: "Lager · jarra",
        price: "5,90 €",
        notes: "Estrella Damm en jarra.",
        notesEn: "Estrella Damm by the pint.",
        notesIt: "Estrella Damm alla pinta.",
        notesFr: "Estrella Damm à la pinte.",
        notesDe: "Estrella Damm als Pint.",
        notesNl: "Estrella Damm per pint.",
      },
      {
        name: "Jarra Clara",
        grape: "Lager · jarra",
        price: "5,90 €",
        notes: "Cerveza clara en jarra.",
        notesEn: "Light lager by the pint.",
        notesIt: "Birra chiara alla spina, una pinta.",
        notesFr: "Une bière blonde légère à la pinte.",
        notesDe: "Helles Lagerbier im Pint.",
        notesNl: "Licht bier per pint.",
      },
      {
        name: "Turia",
        producer: "Turia",
        grape: "Tostada",
        price: "3,90 €",
        notes: "Cerveza tostada valenciana, maltosa y suave.",
        notesEn: "Valencian amber beer, malty and smooth.",
        notesIt: "Birra ambrata valenciana, maltata e morbida.",
        notesFr: "Bière ambrée valencienne, maltée et onctueuse.",
        notesDe: "Valencianisches Amberbier, malzig und mild.",
        notesNl: "Valenciaans amberbier, moutig en zacht.",
      },
      {
        name: "Jarra Turia",
        grape: "Tostada · jarra",
        price: "6,00 €",
        notes: "Turia tostada en jarra.",
        notesEn: "Turia amber beer by the pint.",
        notesIt: "Birra ambrata Turia alla pinta.",
        notesFr: "Une pinte de bière ambrée Turia.",
        notesDe: "Turia Amber-Bier, ein Pint.",
        notesNl: "Turia amberbier per pint.",
      },
      {
        name: "Peroni Nastro Azzurro",
        producer: "Peroni",
        region: "Italia",
        grape: "Lager",
        price: "3,50 €",
        image: "/wines/cerveza-peroni.jpg",
        notes: "Lager italiana, ligera, crujiente y muy bebible.",
        notesEn: "Italian lager, light, crisp and very drinkable.",
        notesIt: "Birra chiara italiana, leggera, fresca e molto beverina.",
        notesFr: "Bière blonde italienne, légère, rafraîchissante et très agréable à boire.",
        notesDe: "Italienisches Lagerbier, leicht, spritzig und sehr süffig.",
        notesNl: "Italiaans pils, licht, fris en heel lekker om te drinken.",
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
        notesIt: "Birra ambrata doppio malto, intensa e maltata, dal corpo corposo.",
        notesFr: "Bière ambrée double malt, intense et maltée, au corps puissant.",
        notesDe: "Doppelt gemälztes Bernsteinfarbenes Bier, intensiv und malzig, mit kräftigem Körper.",
        notesNl: "Dubbelgemout amberbier, intens en moutig, met een krachtige body.",
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
        notesIt: "Birra chiara siciliana prodotta con sale marino siciliano. Leggera, saporita e molto rinfrescante.",
        notesFr: "Bière blonde sicilienne brassée avec du sel marin de Sicile. Légère, savoureuse et très rafraîchissante.",
        notesDe: "Sizilianisches Lagerbier, gebraut mit Meersalz aus Sizilien. Leicht, würzig und sehr erfrischend.",
        notesNl: "Siciliaans pils, gebrouwen met zeezout uit Sicilië. Licht, hartig en heel verfrissend.",
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
        notesIt: "Birra chiara analcolica (0,0%), leggera e rinfrescante.",
        notesFr: "Bière blonde sans alcool (0,0 %), légère et rafraîchissante.",
        notesDe: "Alkoholfreies Lagerbier (0,0 %), leicht und erfrischend.",
        notesNl: "Alcoholvrij pils (0,0%), licht en verfrissend.",
      },
      {
        name: "Free Damm Tostada",
        producer: "Damm",
        region: "Barcelona",
        grape: "Tostada 0,0 % · sin alcohol",
        price: "3,90 €",
        image: "/wines/cerveza-free-damm-tostada.jpg",
        notes: "Tostada sin alcohol (0,0 %), maltosa y suave.",
        notesEn: "Alcohol-free amber beer (0.0%), malty and smooth.",
        notesIt: "Birra ambrata analcolica (0,0%), dal gusto maltato e morbido.",
        notesFr: "Bière ambrée sans alcool (0,0 %), maltée et douce.",
        notesDe: "Alkoholfreies bernsteinfarbenes Bier (0,0 %), malzig und mild.",
        notesNl: "Alcoholvrij amberbier (0,0%), moutig en zacht.",
      },
    ],
  },
  {
    id: "cervezas-artesanales",
    name: "Cervezas Artesanales",
    nameEn: "Craft Beers",
    nameIt: "Birre artigianali",
    nameFr: "Bières artisanales",
    nameDe: "Craft-Biere",
    nameNl: "Ambachtelijke bieren",
    items: [
      {
        name: "Kbirr Cuore di Napoli",
        producer: "Kbirr",
        region: "Nápoles, Italia",
        grape: "Artesana",
        price: "4,50 €",
        image: "/wines/cerveza-kbirr-cuore-napoli.jpg",
        notes: "Cerveza artesana napolitana, con carácter y de gran personalidad.",
        notesEn: "Neapolitan craft beer, characterful and full of personality.",
        notesIt: "Birra artigianale napoletana, ricca di carattere e personalità.",
        notesFr: "Une bière artisanale napolitaine, pleine de caractère et de personnalité.",
        notesDe: "Neapolitanisches Craft-Bier, charaktervoll und voller Persönlichkeit.",
        notesNl: "Napolitaans ambachtelijk bier, karaktervol en vol persoonlijkheid.",
      },
      {
        name: "Kbirr Natavota Lager",
        producer: "Kbirr",
        region: "Nápoles, Italia",
        grape: "Lager artesana · 5,2 %",
        price: "4,50 €",
        image: "/wines/cerveza-kbirr-natavota.jpg",
        notes: "Lager artesana napolitana, limpia y equilibrada.",
        notesEn: "Neapolitan craft lager, clean and balanced.",
        notesIt: "Lager artigianale napoletana, pulita ed equilibrata.",
        notesFr: "Bière blonde artisanale napolitaine, pure et équilibrée.",
        notesDe: "Neapolitanisches Craft-Lagerbier, rein und ausgewogen.",
        notesNl: "Napolitaans ambachtelijk pilsbier, zuiver en evenwichtig.",
      },
      {
        name: "Kbirr Pulcinella",
        producer: "Kbirr",
        region: "Nápoles, Italia",
        grape: "Artesana · 5,2 %",
        price: "4,50 €",
        image: "/wines/cerveza-kbirr-pulcinella.jpg",
        notes: "Artesana napolitana, suave y aromática.",
        notesEn: "Neapolitan craft beer, smooth and aromatic.",
        notesIt: "Birra artigianale napoletana, morbida e aromatica.",
        notesFr: "Bière artisanale napolitaine, douce et aromatique.",
        notesDe: "Neapolitanisches Craft-Bier, mild und aromatisch.",
        notesNl: "Napolitaans ambachtelijk bier, zacht en aromatisch.",
      },
      {
        name: "Kbirr Nata Vot Strong & Chocolate",
        producer: "Kbirr",
        region: "Nápoles, Italia",
        grape: "Strong ale · chocolate",
        price: "4,90 €",
        image: "/wines/cerveza-kbirr-natavot-chocolate.jpg",
        notes: "Artesana napolitana intensa, con notas de chocolate.",
        notesEn: "Intense Neapolitan craft beer, with chocolate notes.",
        notesIt: "Birra artigianale napoletana dal gusto intenso, con note di cioccolato.",
        notesFr: "Bière artisanale napolitaine intense, aux notes de chocolat.",
        notesDe: "Kräftiges neapolitanisches Craft-Bier mit Schokoladennoten.",
        notesNl: "Krachtig Napolitaans ambachtelijk bier, met chocoladetonen.",
      },
      {
        name: "IPA Baladin",
        producer: "Baladin",
        region: "Piemonte, Italia",
        grape: "IPA artesana",
        price: "4,50 €",
        image: "/wines/cerveza-ipa-baladin.jpg",
        notes: "IPA artesana italiana, lupulada, aromática y con carácter.",
        notesEn: "Italian craft IPA, hoppy, aromatic and full of character.",
        notesIt: "IPA artigianale italiana, luppolata, aromatica e piena di carattere.",
        notesFr: "IPA artisanale italienne, houblonnée, aromatique et pleine de caractère.",
        notesDe: "Italienisches Craft-IPA, hopfig, aromatisch und voller Charakter.",
        notesNl: "Italiaanse ambachtelijke IPA, hoppig, aromatisch en vol karakter.",
      },
    ],
  },
];

export type FeaturedWine = Wine & {
  tag: string;
  tagEn: string;
  tagIt?: string;
  tagFr?: string;
  tagDe?: string;
  tagNl?: string;
};

/** Los dos Lambruscos destacados, mostrados en cabecera de la carta. */
export const featuredWines: FeaturedWine[] = wines
  .flatMap((c) => c.items)
  .filter((w) => w.featured)
  .map((w) => ({
    ...w,
    tag: "Lambrusco · Emilia-Romagna",
    tagEn: "Lambrusco · Emilia-Romagna",
    tagIt: "Lambrusco · Emilia-Romagna",
    tagFr: "Lambrusco · Émilie-Romagne",
    tagDe: "Lambrusco · Emilia-Romagna",
    tagNl: "Lambrusco · Emilia-Romagna",
  }));
