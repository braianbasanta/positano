import Image from "next/image";
import Lemon from "./Lemon";
import LemonBranch from "./LemonBranch";
import Reveal from "./Reveal";
import type { Locale } from "@/lib/i18n";

const COPY = {
  es: {
    eyebrow: "La Casa",
    heading: "De Campania a Barcelona",
    p1: "Nuestra historia es un viaje culinario: la fusión perfecta entre tradición y modernidad, donde cada plato cuenta algo.",
    p2: "Comienza con Antonio, Massimo y Vincenzo, nacidos y criados en Campania, donde su amor por la cocina se cultivó desde pequeños — al descubrir que la cocina era el alma del hogar.",
    p3: "Tras años perfeccionando ese arte, llevaron su talento a Barcelona. Así nació Positano, nuestra pizzería napolitana y restaurante italiano en Barcelona, en pleno Eixample, donde converge la gastronomía del sur de Italia con el encanto vibrante de la ciudad.",
    quote: "«La pasión por la buena comida corre por nuestras venas.»",
    alt: "Vista del pueblo de Positano (Costa Amalfitana, Italia), origen de nuestra pizzería napolitana en Barcelona",
  },
  ca: {
    eyebrow: "La Casa",
    heading: "De la Campània a Barcelona",
    p1: "La nostra història és un viatge culinari: la fusió perfecta entre tradició i modernitat, on cada plat explica alguna cosa.",
    p2: "Comença amb l'Antonio, el Massimo i el Vincenzo, nascuts i criats a la Campània, on el seu amor per la cuina es va cultivar des de ben petits — en descobrir que la cuina era l'ànima de la llar.",
    p3: "Després d'anys perfeccionant aquest art, van portar el seu talent a Barcelona. Així va néixer Positano, la nostra pizzeria napolitana i restaurant italià a Barcelona, en ple Eixample, on convergeix la gastronomia del sud d'Itàlia amb l'encant vibrant de la ciutat.",
    quote: "«La passió pel bon menjar ens corre per les venes.»",
    alt: "Vista del poble de Positano (Costa Amalfitana, Itàlia), origen de la nostra pizzeria napolitana a Barcelona",
  },
  en: {
    eyebrow: "Our House",
    heading: "From Campania to Barcelona",
    p1: "Our story is a culinary journey: the perfect blend of tradition and modernity, where every dish has something to say.",
    p2: "It begins with Antonio, Massimo and Vincenzo, born and raised in Campania, where their love for cooking grew from an early age — discovering that the kitchen is the soul of the home.",
    p3: "After years perfecting that craft, they brought their talent to Barcelona. And so Positano was born: our Neapolitan pizzeria and Italian restaurant in Barcelona, right in the Eixample, where the cuisine of southern Italy meets the vibrant charm of the city.",
    quote: "“A passion for good food runs in our veins.”",
    alt: "View of the village of Positano (Amalfi Coast, Italy), the origin of our Neapolitan pizzeria in Barcelona",
  },
  it: {
    eyebrow: "La nostra casa",
    heading: "Dalla Campania a Barcellona",
    p1: "La nostra storia è un viaggio culinario: il mix perfetto tra tradizione e modernità, dove ogni piatto ha qualcosa da raccontare.",
    p2: "Tutto inizia con Antonio, Massimo e Vincenzo, nati e cresciuti in Campania, dove il loro amore per la cucina è sbocciato fin da piccoli — scoprendo che la cucina è l’anima della casa.",
    p3: "Dopo anni passati a perfezionare quest’arte, hanno portato il loro talento a Barcellona. Ed è così che è nato Positano: la nostra pizzeria napoletana e ristorante italiano a Barcellona, proprio nell’Eixample, dove la cucina del Sud Italia incontra il fascino vivace della città.",
    quote: "“La passione per il buon cibo ce l’abbiamo nel sangue.”",
    alt: "Vista del paese di Positano (Costiera Amalfitana, Italia), dove ha avuto origine la nostra pizzeria napoletana a Barcellona",
  },
  fr: {
    eyebrow: "Notre maison",
    heading: "De la Campanie à Barcelone",
    p1: "Notre histoire est un voyage culinaire : l'alliance parfaite entre tradition et modernité, où chaque plat a quelque chose à raconter.",
    p2: "Tout commence avec Antonio, Massimo et Vincenzo, nés et élevés en Campanie, où leur amour pour la cuisine s'est développé dès leur plus jeune âge — en découvrant que la cuisine est l'âme de la maison.",
    p3: "Après avoir passé des années à perfectionner leur art, ils ont mis leur talent au service de Barcelone. C'est ainsi qu'est né Positano : notre pizzeria napolitaine et restaurant italien à Barcelone, en plein cœur de l'Eixample, où la cuisine du sud de l'Italie rencontre le charme dynamique de la ville.",
    quote: "« La passion pour la bonne cuisine coule dans nos veines. »",
    alt: "Vue sur le village de Positano (Côte amalfitaine, Italie), berceau de notre pizzeria napolitaine à Barcelone",
  },
  de: {
    eyebrow: "Unser Haus",
    heading: "Von Kampanien nach Barcelona",
    p1: "Unsere Geschichte ist eine kulinarische Reise: die perfekte Verbindung von Tradition und Moderne, bei der jedes Gericht eine eigene Geschichte erzählt.",
    p2: "Alles begann mit Antonio, Massimo und Vincenzo, die in Kampanien geboren und aufgewachsen sind, wo ihre Liebe zum Kochen schon in jungen Jahren wuchs – als sie entdeckten, dass die Küche die Seele des Hauses ist.",
    p3: "Nachdem sie dieses Handwerk jahrelang perfektioniert hatten, brachten sie ihr Talent nach Barcelona. Und so entstand Positano: unsere neapolitanische Pizzeria und unser italienisches Restaurant in Barcelona, mitten im Eixample, wo die Küche Süditaliens auf den pulsierenden Charme der Stadt trifft.",
    quote: "„Die Leidenschaft für gutes Essen liegt uns im Blut.“",
    alt: "Blick auf das Dorf Positano (Amalfiküste, Italien), den Ursprungsort unserer neapolitanischen Pizzeria in Barcelona",
  },
  nl: {
    eyebrow: "Ons huis",
    heading: "Van Campanië naar Barcelona",
    p1: "Ons verhaal is een culinaire reis: de perfecte mix van traditie en moderniteit, waarbij elk gerecht iets te vertellen heeft.",
    p2: "Het begint met Antonio, Massimo en Vincenzo, geboren en getogen in Campanië, waar hun liefde voor koken al op jonge leeftijd groeide — toen ze ontdekten dat de keuken de ziel van het huis is.",
    p3: "Na jarenlang dat vak te hebben geperfectioneerd, brachten ze hun talent naar Barcelona. En zo ontstond Positano: onze Napolitaanse pizzeria en Italiaans restaurant in Barcelona, midden in de wijk Eixample, waar de keuken van Zuid-Italië samengaat met de bruisende charme van de stad.",
    quote: "“De passie voor lekker eten zit ons in het bloed.”",
    alt: "Uitzicht op het dorpje Positano (Amalfikust, Italië), de plek waar onze Napolitaanse pizzeria in Barcelona is ontstaan",
  },
} satisfies Record<Locale, Record<string, string>>;

export default function LaCasa({ lang = "es" }: { lang?: Locale }) {
  const t = COPY[lang];
  return (
    <section
      id="la-casa"
      className="relative overflow-hidden bg-cream px-6 py-24 md:py-32"
    >
      <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20">
        <Reveal className="order-2 md:order-1">
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
          <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
            {t.p3}
          </p>
          <p className="mt-8 font-serif text-2xl italic leading-snug text-ink">
            {t.quote}
          </p>
        </Reveal>

        <Reveal delay={120} className="order-1 md:order-2">
          <div className="relative">
            <div className="absolute -left-4 -top-4 hidden h-full w-full border border-lemon/40 md:block" />
            <Image
              src="/hero/positano.jpg"
              alt={t.alt}
              width={1400}
              height={933}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="relative aspect-[4/5] w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
