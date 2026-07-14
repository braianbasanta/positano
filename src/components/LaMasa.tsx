import Image from "next/image";
import Lemon from "./Lemon";
import LemonBranch from "./LemonBranch";
import Reveal from "./Reveal";
import type { Locale } from "@/lib/i18n";

const COPY = {
  es: {
    alt: "Nuestro pizzaiolo boleando a mano la masa de fermentación de 48 horas en Positano",
    eyebrow: "La masa",
    heading: "Tiempo, harina y paciencia",
    p1: "Nuestra masa fermenta lentamente durante 48 horas a temperatura controlada. Sin prisas ni levaduras forzadas — solo harina 0 multicereales italiana, agua, sal marina y tiempo. El resultado: ligera, alveolada y fácil de digerir.",
    p2: "Y porque lo que llega a la mesa importa, el resto del producto también viene de Italia: tomate San Marzano DOP, mozzarella di bufala campana y aceite de oliva virgen extra del sur. Cada ingrediente, donde tiene que estar.",
    quote: "«La buena pizza empieza dos días antes.»",
    cta: "Descubre nuestra pizzería napolitana",
    ctaHref: "/pizza-napolitana-barcelona",
    journey: "El viaje de la masa",
    dias: [
      { num: "01", eyebrow: "0 h", title: "Preparamos la fermentación", text: "Mezclamos harina tipo 0 multicereales italiana, agua, sal marina y apenas una pizca de levadura. Amasamos hasta lograr una textura sedosa y la dejamos en reposo en frío." },
      { num: "02", eyebrow: "24 h", title: "La masa madura", text: "A temperatura controlada, el gluten se relaja, los alvéolos aparecen y la masa empieza a respirar." },
      { num: "03", eyebrow: "48 h", title: "Lista para el horno", text: "Fermentación cumplida. Formamos las bolitas a mano y, al pedirla, va al horno a 400 °C: ligera, alveolada y digestiva." },
    ],
    ingredientes: [
      { name: "Harina tipo 0 multicereales", origin: "Molino Casillo · Puglia" },
      { name: "San Marzano", origin: "DOP · Agro Sarnese" },
      { name: "Mozzarella", origin: "Di bufala campana" },
      { name: "Olio EVO", origin: "Sur de Italia" },
    ],
  },
  ca: {
    alt: "El nostre pizzaiolo formant a mà les boles de massa de fermentació de 48 hores a Positano",
    eyebrow: "La massa",
    heading: "Temps, farina i paciència",
    p1: "La nostra massa fermenta lentament durant 48 hores a temperatura controlada. Sense presses ni llevats forçats — només farina 0 multicereals italiana, aigua, sal marina i temps. El resultat: lleugera, alveolada i fàcil de digerir.",
    p2: "I com que el que arriba a taula importa, la resta del producte també ve d'Itàlia: tomàquet San Marzano DOP, mozzarella di bufala campana i oli d'oliva verge extra del sud. Cada ingredient, allà on ha de ser.",
    quote: "«La bona pizza comença dos dies abans.»",
    cta: "Descobreix la nostra pizzeria napolitana",
    ctaHref: "/ca/pizza-napolitana-barcelona",
    journey: "El viatge de la massa",
    dias: [
      { num: "01", eyebrow: "0 h", title: "Preparem la fermentació", text: "Barregem farina tipus 0 multicereals italiana, aigua, sal marina i tot just un pessic de llevat. Pastem fins a aconseguir una textura sedosa i la deixem reposar en fred." },
      { num: "02", eyebrow: "24 h", title: "La massa madura", text: "A temperatura controlada, el gluten es relaxa, els alvèols apareixen i la massa comença a respirar." },
      { num: "03", eyebrow: "48 h", title: "A punt per al forn", text: "Fermentació completada. Formem les boletes a mà i, quan la demanes, va al forn a 400 °C: lleugera, alveolada i digestiva." },
    ],
    ingredientes: [
      { name: "Farina tipus 0 multicereals", origin: "Molino Casillo · Puglia" },
      { name: "San Marzano", origin: "DOP · Agro Sarnese" },
      { name: "Mozzarella", origin: "Di bufala campana" },
      { name: "Olio EVO", origin: "Sud d'Itàlia" },
    ],
  },
  en: {
    alt: "Our pizzaiolo hand-shaping the 48-hour fermented dough at Positano",
    eyebrow: "The dough",
    heading: "Time, flour and patience",
    p1: "Our dough ferments slowly for 48 hours at a controlled temperature. No rushing, no forced yeast — just Italian type-0 multigrain flour, water, sea salt and time. The result: light, airy and easy to digest.",
    p2: "And because what reaches the table matters, the rest of the produce comes from Italy too: San Marzano DOP tomatoes, mozzarella di bufala campana and extra-virgin olive oil from the south. Every ingredient, exactly where it belongs.",
    quote: "“A great pizza starts two days earlier.”",
    cta: "Discover our Neapolitan pizzeria",
    ctaHref: "/en/neapolitan-pizza-barcelona",
    journey: "The dough's journey",
    dias: [
      { num: "01", eyebrow: "0 h", title: "We start the ferment", text: "We mix Italian type-0 multigrain flour, water, sea salt and just a pinch of yeast. We knead until silky and leave it to rest in the cold." },
      { num: "02", eyebrow: "24 h", title: "The dough matures", text: "At a controlled temperature, the gluten relaxes, the air pockets form and the dough begins to breathe." },
      { num: "03", eyebrow: "48 h", title: "Ready for the oven", text: "Fermentation complete. We shape the dough balls by hand and, once ordered, it goes into the 400 °C oven: light, airy and digestible." },
    ],
    ingredientes: [
      { name: "Type-0 multigrain flour", origin: "Molino Casillo · Puglia" },
      { name: "San Marzano", origin: "DOP · Agro Sarnese" },
      { name: "Mozzarella", origin: "Di bufala campana" },
      { name: "Olio EVO", origin: "Southern Italy" },
    ],
  },
  it: {
    alt: "Il nostro pizzaiolo che lavora a mano l'impasto fermentato per 48 ore a Positano",
    eyebrow: "L'impasto",
    heading: "Tempo, farina e pazienza",
    p1: "Il nostro impasto fermenta lentamente per 48 ore a temperatura controllata. Niente fretta, niente lievito aggiunto: solo farina multigrano italiana tipo 0, acqua, sale marino e tempo. Il risultato: un impasto leggero, soffice e facile da digerire.",
    p2: "E visto che ciò che arriva in tavola è importante, anche il resto dei prodotti proviene dall’Italia: pomodori San Marzano DOP, mozzarella di bufala campana e olio extravergine di oliva del Sud. Ogni ingrediente, proprio dove deve stare.",
    quote: "“Una pizza fantastica nasce due giorni prima.”",
    cta: "Scopri la nostra pizzeria napoletana",
    ctaHref: "/it/pizza-napoletana-barcellona",
    journey: "Il viaggio dell'impasto",
    dias: [
      { num: "01", eyebrow: "0 h", title: "Diamo il via alla fermentazione", text: "Mescoliamo farina multigrano italiana di tipo 0, acqua, sale marino e solo un pizzico di lievito. Impastiamo fino a ottenere un impasto liscio come la seta e lo lasciamo riposare al fresco." },
      { num: "02", eyebrow: "24 ore", title: "L'impasto riposa", text: "A una temperatura controllata, il glutine si rilassa, si formano delle bolle d’aria e l’impasto inizia a respirare." },
      { num: "03", eyebrow: "48 ore", title: "Pronto per il forno", text: "Lievitazione completata. Diamo forma alle palline di impasto a mano e, una volta ordinate, le inforniamo a 400 °C: leggere, soffici e facili da digerire." },
    ],
    ingredientes: [
      { name: "Farina multicereali Tipo 0", origin: "Molino Casillo · Puglia" },
      { name: "San Marzano", origin: "DOP · Agro Sarnese" },
      { name: "Mozzarella", origin: "Di bufala campana" },
      { name: "Olio EVO", origin: "Sud Italia" },
    ],
  },
  fr: {
    alt: "Notre pizzaiolo façonne à la main la pâte fermentée pendant 48 heures chez Positano",
    eyebrow: "La pâte",
    heading: "Du temps, de la farine et de la patience",
    p1: "Notre pâte fermente lentement pendant 48 heures à une température contrôlée. Pas de précipitation, pas de levure ajoutée : uniquement de la farine multigrains italienne de type 0, de l'eau, du sel de mer et du temps. Le résultat : une pâte légère, aérée et facile à digérer.",
    p2: "Et comme ce qui arrive dans votre assiette a son importance, le reste des produits provient également d'Italie : des tomates San Marzano AOP, de la mozzarella di bufala campana et de l'huile d'olive extra vierge du Sud. Chaque ingrédient trouve exactement sa place.",
    quote: "« Une bonne pizza, ça commence deux jours avant. »",
    cta: "Découvrez notre pizzeria napolitaine",
    ctaHref: "/fr/pizza-napolitaine-barcelone",
    journey: "Le parcours de la pâte",
    dias: [
      { num: "01", eyebrow: "0 h", title: "Nous lançons la fermentation", text: "Nous mélangeons de la farine multigrain italienne de type 0, de l'eau, du sel de mer et une simple pincée de levure. Nous pétrissons la pâte jusqu'à ce qu'elle devienne onctueuse, puis nous la laissons reposer au frais." },
      { num: "02", eyebrow: "24 h", title: "La pâte repose", text: "À une température contrôlée, le gluten se détend, des alvéoles se forment et la pâte commence à respirer." },
      { num: "03", eyebrow: "48 h", title: "Prêt à enfourner", text: "La fermentation est terminée. Nous façonnons les boules de pâte à la main et, dès qu’une commande est passée, elles sont enfournées à 400 °C : légères, moelleuses et faciles à digérer." },
    ],
    ingredientes: [
      { name: "Farine multigrain de type 0", origin: "Molino Casillo · Pouilles" },
      { name: "San Marzano", origin: "DOP · Agro Sarnese" },
      { name: "Mozzarella", origin: "La « di bufala » de Campanie" },
      { name: "Olio EVO", origin: "Sud de l'Italie" },
    ],
  },
  de: {
    alt: "Unser Pizzabäcker formt den 48 Stunden lang gegärten Teig im „Positano“ von Hand",
    eyebrow: "Der Teig",
    heading: "Zeit, Mehl und Geduld",
    p1: "Unser Teig gärt 48 Stunden lang langsam bei kontrollierter Temperatur. Keine Eile, keine künstliche Hefe – nur italienisches Mehrkornmehl Typ 0, Wasser, Meersalz und Zeit. Das Ergebnis: leicht, luftig und bekömmlich.",
    p2: "Und da es darauf ankommt, was auf den Tisch kommt, stammen auch die übrigen Zutaten aus Italien: San-Marzano-Tomaten (DOP), „Mozzarella di Bufala Campana“ und natives Olivenöl extra aus dem Süden. Jede Zutat genau dort, wo sie hingehört.",
    quote: "„Eine großartige Pizza beginnt bereits zwei Tage zuvor.“",
    cta: "Entdecken Sie unsere neapolitanische Pizzeria",
    ctaHref: "/de/neapolitanische-pizza-barcelona",
    journey: "Die Reise des Teigs",
    dias: [
      { num: "01", eyebrow: "0 Std.", title: "Wir leiten die Gärung ein", text: "Wir vermischen italienisches Mehrkornmehl Typ 0, Wasser, Meersalz und nur eine Prise Hefe. Wir kneten den Teig, bis er geschmeidig ist, und lassen ihn anschließend an einem kühlen Ort ruhen." },
      { num: "02", eyebrow: "24 Stunden", title: "Der Teig reift", text: "Bei einer kontrollierten Temperatur entspannt sich das Gluten, es bilden sich Luftblasen und der Teig beginnt zu atmen." },
      { num: "03", eyebrow: "48 Stunden", title: "Bereit für den Ofen", text: "Der Gärvorgang ist abgeschlossen. Wir formen die Teigkugeln von Hand, und sobald die Bestellung vorliegt, kommen sie in den 400 °C heißen Ofen: leicht, luftig und bekömmlich." },
    ],
    ingredientes: [
      { name: "Mehrkornmehl Typ 0", origin: "Molino Casillo · Apulien" },
      { name: "San Marzano", origin: "DOP · Agro Sarnese" },
      { name: "Mozzarella", origin: "Die „Bufala“ aus Kampanien" },
      { name: "Olio EVO", origin: "Süditalien" },
    ],
  },
  nl: {
    alt: "Onze pizzaiolo die het 48 uur gerijpte deeg bij Positano met de hand vormt",
    eyebrow: "Het deeg",
    heading: "Tijd, bloem en geduld",
    p1: "Ons deeg rijst langzaam gedurende 48 uur bij een gecontroleerde temperatuur. Geen haast, geen kunstmatige gist — alleen Italiaans type-0 meergranenmeel, water, zeezout en tijd. Het resultaat: licht, luchtig en licht verteerbaar.",
    p2: "En omdat het ertoe doet wat er op tafel komt, komt de rest van de producten ook uit Italië: San Marzano DOP-tomaten, mozzarella di bufala campana en extra vierge olijfolie uit het zuiden. Elk ingrediënt precies waar het thuishoort.",
    quote: "“Een lekkere pizza begint al twee dagen eerder.”",
    cta: "Ontdek onze Napolitaanse pizzeria",
    ctaHref: "/nl/napolitaanse-pizza-barcelona",
    journey: "De reis van het deeg",
    dias: [
      { num: "01", eyebrow: "0 uur", title: "We beginnen met het fermenteren", text: "We mengen Italiaans type-0 meergranenmeel, water, zeezout en slechts een snufje gist. We kneden het tot het zijdezacht is en laten het in de koelte rusten." },
      { num: "02", eyebrow: "24 uur", title: "Het deeg rijpt", text: "Bij een constante temperatuur wordt het gluten losser, ontstaan er luchtbellen en begint het deeg te ademen." },
      { num: "03", eyebrow: "48 uur", title: "Klaar voor de oven", text: "Het rijzen is klaar. We vormen de deegballetjes met de hand en zodra er een bestelling binnenkomt, gaan ze de oven van 400 °C in: licht, luchtig en licht verteerbaar." },
    ],
    ingredientes: [
      { name: "Type-0 meergranenmeel", origin: "Molino Casillo · Apulië" },
      { name: "San Marzano", origin: "DOP · Agro Sarnese" },
      { name: "Mozzarella", origin: "De Campaanse hoax" },
      { name: "Olio EVO", origin: "Zuid-Italië" },
    ],
  },
} satisfies Record<Locale, Record<string, unknown>>;

export default function LaMasa({ lang = "es" }: { lang?: Locale }) {
  const t = COPY[lang];
  const dias = t.dias;
  const ingredientes = t.ingredientes;
  return (
    <section
      id="la-masa"
      className="relative overflow-hidden bg-cream px-6 py-24 md:py-32"
    >
      <LemonBranch className="pointer-events-none absolute -right-14 -top-14 h-80 w-auto rotate-[155deg] text-lemon/20" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <Reveal className="order-1">
            <div className="relative">
              <div className="absolute -left-4 -top-4 hidden h-full w-full border border-lemon/40 md:block" />
              <Image
                src="/la-masa.jpg"
                alt={t.alt}
                width={1080}
                height={1350}
                className="relative aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={120} className="order-2">
            <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              {t.eyebrow}
            </span>
            <h2 className="mt-5 font-display text-4xl leading-[1.1] text-ink md:text-5xl">
              {t.heading}
            </h2>
            <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft">
              {t.p1}
            </p>
            <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
              {t.p2}
            </p>

            <ul className="mt-8 grid gap-3 border-t border-ink/15 pt-6 sm:grid-cols-2">
              {ingredientes.map((item) => (
                <li key={item.name} className="flex items-baseline gap-3">
                  <span className="h-1 w-1 shrink-0 translate-y-[-3px] rounded-full bg-lemon" />
                  <span className="text-[0.78rem] uppercase tracking-[0.22em] text-ink-soft lining-nums">
                    <span className="text-ink">{item.name}</span> · {item.origin}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-8 font-serif text-2xl italic leading-snug text-ink">
              {t.quote}
            </p>
            <a
              href={t.ctaHref}
              className="group mt-6 inline-flex items-center gap-2 text-[0.84rem] uppercase tracking-[0.22em] text-lemon transition-colors hover:text-ink"
            >
              {t.cta}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal className="mt-16 md:mt-20">
          <div className="relative">
            <div className="absolute -right-4 -bottom-4 hidden h-full w-full border border-lemon/40 md:block" />
            <div className="relative bg-cream-deep px-8 py-12 sm:px-12 sm:py-14">
              <div className="mb-12 flex items-center justify-between text-[0.82rem] uppercase tracking-[0.3em] text-ink-soft/55">
                <span>{t.journey}</span>
                <span>48 h · 22 °C</span>
              </div>

              <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
                {dias.map((dia) => (
                  <li key={dia.num} className="relative">
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 shrink-0 rounded-full bg-lemon shadow-[0_0_0_5px_var(--color-cream-deep)]" />
                      <span className="font-display text-[0.84rem] uppercase tracking-[0.32em] text-lemon">
                        {dia.eyebrow}
                      </span>
                      <span
                        aria-hidden
                        className="font-display text-xs italic text-ink-soft/45"
                      >
                        · {dia.num}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl leading-tight text-ink sm:text-[1.65rem]">
                      {dia.title}
                    </h3>
                    <p className="mt-2 font-serif text-base leading-relaxed text-ink-soft">
                      {dia.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
