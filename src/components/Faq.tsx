import Lemon from "./Lemon";
import LemonBranch from "./LemonBranch";
import Reveal from "./Reveal";
import JsonLd from "./JsonLd";
import type { Locale } from "@/lib/i18n";

// El FAQ vive solo en la home (es/en), por eso el FAQPage schema se inyecta
// aquí: así los datos estructurados y el contenido visible están en la misma
// página y nunca hay mismatch (antes el schema iba en el layout = todas).
const COPY = {
  es: {
    eyebrow: "Preguntas frecuentes",
    heading: "Todo lo que quieres saber",
    faqs: [
      { q: "¿Dónde está Positano Pizzería?", a: "Estamos en Carrer del Rosselló, 24, en el Eixample de Barcelona (08029). Puedes llamarnos al +34 933 51 59 13." },
      { q: "¿Cuál es el horario de Positano Pizzería?", a: "Los lunes cerramos. De martes a jueves abrimos de 13:00 a 16:00 y de 20:00 a 23:30. Los viernes de 13:00 a 16:00 y de 20:00 a 00:00. Los sábados de 13:00 a 00:00 y los domingos de 13:00 a 23:30, en horario continuo." },
      { q: "¿Qué tipo de pizza hacen en Positano?", a: "Hacemos auténtica pizza napolitana con masa de fermentación de 48 horas, cocida en horno de leña y elaborada con ingredientes DOP italianos. También ofrecemos pasta fresca casera, antipasti, ensaladas y postres." },
      { q: "¿Qué hace de Positano un buen restaurante italiano en Barcelona?", a: "Positano es un restaurante italiano en el Eixample de Barcelona llevado por tres napolitanos de Campania. Servimos cocina del sur de Italia tal cual se hace allí: pizza napolitana de horno de leña, pasta fresca casera, antipasti y postres italianos. Si buscas una pizzería en Barcelona con producto auténtico y sin atajos, este es tu sitio." },
      { q: "¿Positano Pizzería hace pizza a domicilio?", a: "Sí, llevamos nuestra pizza napolitana, pasta fresca y antipasti a domicilio en Barcelona a través de Uber Eats y Glovo. El radio exacto de reparto lo verás al introducir tu dirección. Aceptamos también Ticket Restaurant®." },
      { q: "¿Se puede reservar mesa en Positano Pizzería?", a: "Sí, puedes reservar mesa online desde nuestra página de reservas con confirmación inmediata, o llamando al +34 933 51 59 13." },
      { q: "¿Tienen opciones vegetarianas?", a: "Sí. Contamos con opciones vegetarianas como la pizza Ortolana, la Búfala, la lasaña vegetariana, ensaladas y antipasti como la parmesana de berenjena o la burrata." },
    ],
  },
  ca: {
    eyebrow: "Preguntes freqüents",
    heading: "Tot el que vols saber",
    faqs: [
      { q: "On és Positano Pizzería?", a: "Som al Carrer del Rosselló, 24, a l'Eixample de Barcelona (08029). Pots trucar-nos al +34 933 51 59 13." },
      { q: "Quin és l'horari de Positano Pizzería?", a: "Els dilluns tanquem. De dimarts a dijous obrim de 13:00 a 16:00 i de 20:00 a 23:30. Els divendres de 13:00 a 16:00 i de 20:00 a 00:00. Els dissabtes de 13:00 a 00:00 i els diumenges de 13:00 a 23:30, en horari continu." },
      { q: "Quin tipus de pizza fan a Positano?", a: "Fem autèntica pizza napolitana amb massa de fermentació de 48 hores, cuita al forn de llenya i elaborada amb ingredients DOP italians. També oferim pasta fresca casolana, antipasti, amanides i postres." },
      { q: "Què fa de Positano un bon restaurant italià a Barcelona?", a: "Positano és un restaurant italià a l'Eixample de Barcelona portat per tres napolitans de la Campània. Servim cuina del sud d'Itàlia tal com es fa allà: pizza napolitana de forn de llenya, pasta fresca casolana, antipasti i postres italianes. Si busques una pizzeria a Barcelona amb producte autèntic i sense dreceres, aquest és el teu lloc." },
      { q: "Positano Pizzería fa pizza a domicili?", a: "Sí, portem la nostra pizza napolitana, pasta fresca i antipasti a domicili a Barcelona a través d'Uber Eats i Glovo. El radi exacte de repartiment el veuràs en introduir la teva adreça. També acceptem Ticket Restaurant®." },
      { q: "Es pot reservar taula a Positano Pizzería?", a: "Sí, pots reservar taula online des de la nostra pàgina de reserves amb confirmació immediata, o trucant al +34 933 51 59 13." },
      { q: "Teniu opcions vegetarianes?", a: "Sí. Tenim opcions vegetarianes com la pizza Ortolana, la Búfala, la lasanya vegetariana, amanides i antipasti com la parmesana d'albergínia o la burrata." },
    ],
  },
  en: {
    eyebrow: "Frequently asked questions",
    heading: "Everything you want to know",
    faqs: [
      { q: "Where is Positano Pizzería located?", a: "We're at Carrer del Rosselló, 24, in the Eixample district of Barcelona (08029). You can call us on +34 933 51 59 13." },
      { q: "What are Positano Pizzería's opening hours?", a: "We are closed on Mondays. Tuesday to Thursday we open 1:00–4:00 pm and 8:00–11:30 pm. Friday 1:00–4:00 pm and 8:00 pm–12:00 am. Saturday 1:00 pm–12:00 am and Sunday 1:00–11:30 pm, with continuous service." },
      { q: "What kind of pizza does Positano make?", a: "We make authentic Neapolitan pizza with a 48-hour fermented dough, baked in a wood-fired oven and made with Italian DOP ingredients. We also serve homemade fresh pasta, antipasti, salads and desserts." },
      { q: "What makes Positano a great Italian restaurant in Barcelona?", a: "Positano is an Italian restaurant in the Eixample district of Barcelona run by three Neapolitans from Campania. We serve southern Italian cuisine exactly as it's made back home: wood-fired Neapolitan pizza, homemade fresh pasta, antipasti and Italian desserts. If you're after a pizzeria in Barcelona with authentic produce and no shortcuts, this is your place." },
      { q: "Does Positano Pizzería deliver?", a: "Yes, we deliver our Neapolitan pizza, fresh pasta and antipasti across Barcelona via Uber Eats and Glovo. You'll see the exact delivery radius when you enter your address. We also accept Ticket Restaurant®." },
      { q: "Can I book a table at Positano Pizzería?", a: "Yes, you can book a table online from our reservations page with instant confirmation, or by calling +34 933 51 59 13." },
      { q: "Do you have vegetarian options?", a: "Yes. We offer vegetarian options such as the Ortolana pizza, the Bufala, vegetarian lasagne, salads and antipasti like the aubergine parmigiana or the burrata." },
    ],
  },
  it: {
    eyebrow: "Domande frequenti",
    heading: "Tutto quello che vuoi sapere",
    faqs: [
      { q: "Dove si trova la Pizzeria Positano?", a: "Ci troviamo in Carrer del Rosselló, 24, nel quartiere dell'Eixample di Barcellona (08029). Puoi chiamarci al numero +34 933 51 59 13." },
      { q: "Quali sono gli orari di apertura della Pizzeria Positano?", a: "Il lunedì siamo chiusi. Da martedì a giovedì siamo aperti dalle 13:00 alle 16:00 e dalle 20:00 alle 23:30. Venerdì dalle 13:00 alle 16:00 e dalle 20:00 a mezzanotte. Sabato dalle 13:00 a mezzanotte e domenica dalle 13:00 alle 23:30, con servizio ininterrotto." },
      { q: "Che tipo di pizza si mangia a Positano?", a: "Prepariamo l'autentica pizza napoletana con un impasto fermentato per 48 ore, cotta nel forno a legna e realizzata con ingredienti italiani DOP. Serviamo anche pasta fresca fatta in casa, antipasti, insalate e dolci." },
      { q: "Cosa rende Positano un ottimo ristorante italiano a Barcellona?", a: "Positano è un ristorante italiano nel quartiere dell’Eixample di Barcellona, gestito da tre napoletani originari della Campania. Serviamo piatti della cucina del Sud Italia proprio come si fanno a casa: pizza napoletana cotta nel forno a legna, pasta fresca fatta in casa, antipasti e dolci italiani. Se cerchi una pizzeria a Barcellona con prodotti genuini e senza compromessi, questo è il posto che fa per te." },
      { q: "La Pizzeria Positano fa consegne a domicilio?", a: "Sì, consegniamo la nostra pizza napoletana, la pasta fresca e gli antipasti in tutta Barcellona tramite Uber Eats e Glovo. Vedrai il raggio di consegna esatto quando inserisci il tuo indirizzo. Accettiamo anche i buoni Ticket Restaurant®." },
      { q: "Posso prenotare un tavolo alla Positano Pizzería?", a: "Sì, puoi prenotare un tavolo online dalla nostra pagina delle prenotazioni con conferma immediata, oppure chiamando il numero +34 933 51 59 13." },
      { q: "Avete piatti vegetariani?", a: "Sì. Offriamo piatti vegetariani come la pizza Ortolana, la Bufala, le lasagne vegetariane, insalate e antipasti come la parmigiana di melanzane o la burrata." },
    ],
  },
  fr: {
    eyebrow: "Foire aux questions",
    heading: "Tout ce que vous souhaitez savoir",
    faqs: [
      { q: "Où se trouve la pizzeria Positano ?", a: "Nous sommes situés au 24, Carrer del Rosselló, dans le quartier de l'Eixample à Barcelone (08029). Vous pouvez nous joindre au +34 933 51 59 13." },
      { q: "Quelles sont les heures d'ouverture de la pizzeria Positano ?", a: "Nous sommes fermés le lundi. Du mardi au jeudi, nous sommes ouverts de 13 h à 16 h et de 20 h à 23 h 30. Le vendredi, de 13 h à 16 h et de 20 h à minuit. Le samedi, de 13 h à minuit, et le dimanche, de 13 h à 23 h 30, avec un service continu." },
      { q: "Quel type de pizza propose Positano ?", a: "Nous préparons d'authentiques pizzas napolitaines à partir d'une pâte fermentée pendant 48 heures, cuites au four à bois et élaborées avec des ingrédients italiens AOP. Nous proposons également des pâtes fraîches maison, des antipasti, des salades et des desserts." },
      { q: "Qu'est-ce qui fait de Positano un excellent restaurant italien à Barcelone ?", a: "Positano est un restaurant italien situé dans le quartier de l'Eixample à Barcelone, tenu par trois Napolitains originaires de Campanie. Nous servons une cuisine du sud de l'Italie exactement comme elle est préparée chez nous : des pizzas napolitaines cuites au feu de bois, des pâtes fraîches maison, des antipasti et des desserts italiens. Si vous recherchez une pizzeria à Barcelone proposant des produits authentiques et ne faisant aucun compromis, vous êtes au bon endroit." },
      { q: "La pizzeria Positano propose-t-elle un service de livraison ?", a: "Oui, nous livrons nos pizzas napolitaines, nos pâtes fraîches et nos antipasti dans toute la ville de Barcelone via Uber Eats et Glovo. Vous verrez le rayon de livraison exact lorsque vous saisirez votre adresse. Nous acceptons également les chèques-restaurant®." },
      { q: "Puis-je réserver une table à la Positano Pizzería ?", a: "Oui, vous pouvez réserver une table en ligne depuis notre page de réservation, avec confirmation immédiate, ou en appelant le +34 933 51 59 13." },
      { q: "Proposez-vous des plats végétariens ?", a: "Oui. Nous proposons des plats végétariens tels que la pizza Ortolana, la Bufala, des lasagnes végétariennes, des salades et des antipasti comme la parmigiana d'aubergines ou la burrata." },
    ],
  },
  de: {
    eyebrow: "Häufig gestellte Fragen",
    heading: "Alles, was Sie wissen möchten",
    faqs: [
      { q: "Wo befindet sich die Pizzeria „Positano“?", a: "Sie finden uns in der Carrer del Rosselló 24 im Stadtteil Eixample in Barcelona (08029). Sie erreichen uns telefonisch unter +34 933 51 59 13." },
      { q: "Wie lauten die Öffnungszeiten der Pizzeria „Positano“?", a: "Montags haben wir geschlossen. Von Dienstag bis Donnerstag haben wir von 13:00 bis 16:00 Uhr und von 20:00 bis 23:30 Uhr geöffnet. Freitags von 13:00 bis 16:00 Uhr und von 20:00 Uhr bis 00:00 Uhr. Samstags von 13:00 Uhr bis 00:00 Uhr und sonntags von 13:00 Uhr bis 23:30 Uhr, durchgehend geöffnet." },
      { q: "Welche Art von Pizza wird in Positano zubereitet?", a: "Wir bereiten authentische neapolitanische Pizza aus einem 48 Stunden lang gegärten Teig zu, die im Holzofen gebacken und mit italienischen DOP-Zutaten zubereitet wird. Außerdem servieren wir hausgemachte frische Pasta, Antipasti, Salate und Desserts." },
      { q: "Was macht das „Positano“ zu einem hervorragenden italienischen Restaurant in Barcelona?", a: "Positano ist ein italienisches Restaurant im Stadtteil Eixample in Barcelona, das von drei Neapolitanern aus Kampanien geführt wird. Wir servieren süditalienische Küche genau so, wie sie zu Hause zubereitet wird: neapolitanische Pizza aus dem Holzofen, hausgemachte frische Pasta, Antipasti und italienische Desserts. Wenn Sie in Barcelona eine Pizzeria mit authentischen Zutaten und ohne Abstriche suchen, sind Sie hier genau richtig." },
      { q: "Liefert die Pizzeria Positano auch nach Hause?", a: "Ja, wir liefern unsere neapolitanische Pizza, frische Pasta und Antipasti in ganz Barcelona über Uber Eats und Glovo aus. Den genauen Lieferradius sehen Sie, sobald Sie Ihre Adresse eingeben. Wir akzeptieren auch Ticket Restaurant®." },
      { q: "Kann ich in der Positano Pizzería einen Tisch reservieren?", a: "Ja, Sie können über unsere Reservierungsseite online einen Tisch buchen und erhalten sofort eine Bestätigung, oder Sie können uns unter der Nummer +34 933 51 59 13 anrufen." },
      { q: "Gibt es bei Ihnen vegetarische Gerichte?", a: "Ja. Wir bieten vegetarische Gerichte an, wie beispielsweise die Pizza „Ortolana“, die „Bufala“, vegetarische Lasagne, Salate und Antipasti wie die Auberginen-Parmigiana oder die Burrata." },
    ],
  },
  nl: {
    eyebrow: "Veelgestelde vragen",
    heading: "Alles wat je wilt weten",
    faqs: [
      { q: "Waar zit Pizzería Positano?", a: "We zitten aan de Carrer del Rosselló 24, in de wijk Eixample in Barcelona (08029). Je kunt ons bellen op +34 933 51 59 13." },
      { q: "Wat zijn de openingstijden van Positano Pizzería?", a: "Op maandag zijn we gesloten. Van dinsdag tot en met donderdag zijn we open van 13.00 tot 16.00 uur en van 20.00 tot 23.30 uur. Vrijdag van 13.00 tot 16.00 uur en van 20.00 tot 00.00 uur. Zaterdag van 13.00 tot 00.00 uur en zondag van 13.00 tot 23.30 uur, met doorlopende bediening." },
      { q: "Wat voor soort pizza maakt Positano?", a: "We maken authentieke Napolitaanse pizza’s met een deeg dat 48 uur heeft gerijpt, gebakken in een houtgestookte oven en bereid met Italiaanse DOP-ingrediënten. Daarnaast serveren we ook zelfgemaakte verse pasta, antipasti, salades en desserts." },
      { q: "Wat maakt Positano zo’n geweldig Italiaans restaurant in Barcelona?", a: "Positano is een Italiaans restaurant in de wijk Eixample in Barcelona, gerund door drie Napolitanen uit Campanië. We serveren Zuid-Italiaanse gerechten precies zoals ze thuis worden gemaakt: Napolitaanse pizza uit de houtoven, verse zelfgemaakte pasta, antipasti en Italiaanse desserts. Als je op zoek bent naar een pizzeria in Barcelona met authentieke ingrediënten en zonder concessies, dan ben je hier aan het juiste adres." },
      { q: "Bezorgt Positano Pizzería ook aan huis?", a: "Ja, we bezorgen onze Napolitaanse pizza’s, verse pasta en antipasti in heel Barcelona via Uber Eats en Glovo. Je ziet de exacte bezorgstraal zodra je je adres invoert. We accepteren ook Ticket Restaurant®." },
      { q: "Kan ik een tafel reserveren bij Positano Pizzería?", a: "Ja, je kunt online een tafel reserveren via onze reserveringspagina, waarbij je direct een bevestiging krijgt, of door te bellen naar +34 933 51 59 13." },
      { q: "Hebben jullie vegetarische gerechten?", a: "Ja. We hebben vegetarische gerechten, zoals de Ortolana-pizza, de Bufala, vegetarische lasagne, salades en antipasti zoals aubergine parmigiana of burrata." },
    ],
  },
} satisfies Record<Locale, { eyebrow: string; heading: string; faqs: { q: string; a: string }[] }>;

export default function Faq({ lang = "es" }: { lang?: Locale }) {
  const t = COPY[lang];
  const faqs = t.faqs;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32"
    >
      <JsonLd data={faqJsonLd} />
      <LemonBranch className="pointer-events-none absolute -left-16 -top-14 h-80 w-auto -rotate-[135deg] text-lemon/20" />

      <div className="relative mx-auto max-w-3xl">
        <Reveal className="flex flex-col items-center text-center">
          <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
            <Lemon className="h-5 w-5" />
            {t.eyebrow}
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
            {t.heading}
          </h2>
        </Reveal>

        <Reveal className="mt-14">
          <div className="divide-y divide-ink/15 border-y border-ink/15">
            {faqs.map((item) => (
              <details key={item.q} className="group px-1 py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl leading-snug text-ink transition-colors hover:text-lemon md:text-2xl [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="relative mt-1 h-4 w-4 shrink-0">
                    <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-lemon" />
                    <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-lemon transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
