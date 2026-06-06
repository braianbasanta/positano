export type Review = {
  name: string;
  rating: number;
  text: string;
};

export const reviewStats = {
  rating: "4,8",
  count: "+1.400",
};

// Mismas cifras con formato inglés (punto decimal, sufijo "+"). Se derivan de
// reviewStats para que actualizar las reseñas cada mes se haga en un único sitio
// y se propague a todos los meta titles (ES/EN) y al schema JSON-LD.
export const reviewStatsEn = {
  rating: reviewStats.rating.replace(",", "."),
  count: reviewStats.count.replace("+", "").replace(/\./g, ",") + "+",
};

export const reviewsUrl = "https://www.google.com/maps?cid=7322759586327519189";

// TheFork usa escala /10 (no /5 como Google). Solo se muestra de forma visual
// en la sección de reseñas; NO entra en el aggregateRating del schema JSON-LD.
export const forkStats = {
  rating: "9,2",
  count: "+500",
};

export const forkUrl = "https://www.thefork.es/restaurante/positano-r804685";

export const reviews: Review[] = [
  {
    name: "Pavli G.",
    rating: 5,
    text: "Todo un acierto. La comida estaba muy rica, la parmigiana de berenjena súper deliciosa, la lasaña muy buena igual que el postre. El ambiente muy bonito y los camareros atentos y amables. Volvería sin duda.",
  },
  {
    name: "Guille Segues",
    rating: 5,
    text: "Fuimos a cenar un sábado, buen ambiente sin mucho ruido. El local tiene la planta baja, pequeña, con el horno y la barra, y la parte alta algo más amplia.\n\nLas pizzas muy buenas, tanto la masa como los ingredientes. El camarero que nos atendió fue un 10: muy atento y cercano durante toda la cena.",
  },
  {
    name: "Roger Espada Calvo",
    rating: 5,
    text: "Cena de sábado muy agradable, con un ambiente tranquilo y sin ruido molesto. El local es acogedor: abajo la zona del horno y la barra, y arriba un espacio más amplio donde se está muy a gusto para cenar con calma.\n\nLa comida fue un acierto. Se nota que la cocina es italiana de verdad y que cuidan el sabor. La pizza estaba riquísima, con una masa ligera y bien hecha. La carbonara merece una mención especial: sabrosa, bien ligada y preparada al momento.\n\nLa panna cotta fue el cierre perfecto. Un sitio muy recomendable para cenar bien y salir con ganas de repetir.",
  },
  {
    name: "Marta Ruiz",
    rating: 5,
    text: "La mejor pizza napolitana que he probado en Barcelona. La masa de 48 horas se nota en cada bocado: ligera, aireada y perfectamente horneada. Pedimos la diavola y la bufala, las dos espectaculares. Volveremos sin falta.",
  },
  {
    name: "Carles Vidal",
    rating: 5,
    text: "Atención excelente desde que entras. El camarero nos recomendó la burrata frita pugliese y fue una decisión acertadísima. Carta cuidada, productos de calidad y precios razonables para lo que ofrecen.",
  },
  {
    name: "Sofía Martínez",
    rating: 5,
    text: "Ambiente increíble. Cenamos en la planta de arriba y se está súper a gusto, luz cálida y música a buen volumen. La pasta al tartufo brutal, y el tiramisú casero uno de los mejores de la ciudad.",
  },
  {
    name: "Lluís Puig",
    rating: 5,
    text: "Italianos de verdad cocinando para italianos. Eso ya lo dice todo. La margherita es de manual y la salsiccia e friarielli sabe a Nápoles. Servicio cercano y nada de prisas.",
  },
  {
    name: "Andrea Bianchi",
    rating: 5,
    text: "Da italiano confermo: pizza napoletana come si deve, impasto leggero e ben digeribile. Anche la mozzarella di bufala è di qualità. Personale gentilissimo, ambiente curato. Tornerò di sicuro.",
  },
  {
    name: "Núria Bosch",
    rating: 5,
    text: "Vinimos por una recomendación y nos enamoramos del sitio. La lasaña tradicional es para llorar de buena, y los scialatelli con bogavante son un escándalo. Fácilmente repetimos cada mes.",
  },
  {
    name: "David Romero",
    rating: 4,
    text: "Muy buena experiencia en general. Las pizzas y entrantes geniales. Un poco de espera para entrar un viernes por la noche, pero merece la pena. Reservaría con antelación la próxima vez.",
  },
  {
    name: "Elisa Trentini",
    rating: 5,
    text: "Llevábamos meses buscando una pizzería napolitana de verdad y por fin la encontramos. La carbonara también espectacular, hecha como toca, sin nata. El servicio es atento sin agobiar.",
  },
  {
    name: "Pol Estévez",
    rating: 5,
    text: "Empezamos con un par de cócteles en la barra y acabamos cenando arriba. Plan redondo. El paccheri a la genovese es un platazo, y el provolone al horno para mojar pan no perdona.",
  },
  {
    name: "Cristina Vega",
    rating: 5,
    text: "El sitio respira Italia desde el primer minuto. Materia prima espectacular, mozzarella di bufala que se nota, y unas pizzas con la masa más rica que he probado en mucho tiempo. Top.",
  },
  {
    name: "Marc Domènech",
    rating: 5,
    text: "Cenamos con amigos y todos salimos encantados. Compartimos antipasti, pizzas y un par de pastas. La iberica con jamón al final lleva una capa de cremosidad que es para no parar.",
  },
  {
    name: "Giulia Marini",
    rating: 5,
    text: "Un pezzo di Napoli a Barcellona. La pizza margherita è proprio quella della tradizione: pomodoro San Marzano, fior di latte e basilico. Anche il tiramisù è fatto a regola d'arte.",
  },
  {
    name: "Laura Sánchez",
    rating: 5,
    text: "Cumpleaños celebrado aquí y todo el mundo encantado. Nos prepararon la mesa preciosa y el detalle con el postre fue espectacular. La cocina, de matrícula. Repetiremos seguro.",
  },
  {
    name: "Joan Casals",
    rating: 5,
    text: "Llevo años yendo a italianos en Barcelona y este se ha colado en mi top 3. La masa de fermentación de 48h se nota, ligera y digestiva. La tartufo, una locura. La atención, impecable.",
  },
  {
    name: "Federica Conte",
    rating: 5,
    text: "Finalmente una pizzeria napoletana fatta come si deve fuori Napoli! Mozzarella di bufala campana, San Marzano, basilico fresco. Anche il calzone è ottimo. Bravissimi tutti.",
  },
  {
    name: "Pau Riera",
    rating: 5,
    text: "Buena relación calidad-precio para el nivel de la cocina. Ingredientes traídos de Italia y se nota. La risotto ai funghi muy bien de punto y los gnocchi alla sorrentina riquísimos.",
  },
  {
    name: "Inés Lorenzo",
    rating: 4,
    text: "Comimos en la terraza un sábado al mediodía y muy a gusto. Carta amplia, las pizzas son lo más destacable. El servicio iba un poco justo de personal pero los chicos lo dieron todo.",
  },
];

// Opiniones reales de TheFork. La plataforma puntúa sobre 10, así que el rating
// se guarda en esa escala y las tarjetas lo muestran como "X/10".
export const forkReviews: Review[] = [
  {
    name: "Vanessa M.",
    rating: 10,
    text: "Reservamos con poco tiempo de antelación y, aun así, la atención, el servicio y la comida han sido excelentes. Fuimos con dos nenes de 2 años y han estado muy atentos con ellos.",
  },
  {
    name: "Sergio R.",
    rating: 10,
    text: "Hemos estado hoy y la verdad nos ha sorprendido lo bueno que estaba todo, tanto la pizza como los spaghetti. Seguro que repetiremos.",
  },
  {
    name: "Pamela J.",
    rating: 10,
    text: "Deliciosa comida, pizzas italianas de verdad, muchas variedades interesantes en combinación y el tiramisú delicioso. Y la atención de 10. Volveremos sin duda.",
  },
  {
    name: "Eric L.",
    rating: 10,
    text: "El trato amable, muy buen servicio, camareros y dueño muy agradables, y la pizza es estupenda, la mejor que he probado sin duda. Espectacular.",
  },
  {
    name: "Carmelo C.",
    rating: 10,
    text: "El ambiente, el personal y la comida son realmente magníficos. La pizza está deliciosa, con ingredientes de calidad y muy bien elaborada.",
  },
  {
    name: "Álvaro R.",
    rating: 10,
    text: "Todo lo que pedimos estaba buenísimo: los espaguetis a la carbonara, el tagliatelle con albóndigas y las pizzas. A los niños les encantó.",
  },
  {
    name: "Jennifer Q.",
    rating: 9.5,
    text: "Las pizzas buenísimas y el servicio muy majos. No es la primera vez que venimos ni será la última.",
  },
  {
    name: "Eliana S.",
    rating: 10,
    text: "Bel locale, personale accogliente e gentile. Ottima pizza, tipica napoletana. Top, lo consiglio!",
  },
  {
    name: "Valentina M.",
    rating: 10,
    text: "Tutto super buono! Lo consiglio vivamente e tornerò sicuramente: è tra le pizze più buone che abbia mangiato a Barcellona.",
  },
  {
    name: "Mauro D.",
    rating: 9.5,
    text: "Ottima pizza in stile napoletano. Buono anche il tiramisù. Servizio accogliente, sembra quasi di essere a Napoli.",
  },
  {
    name: "Sarah U.",
    rating: 10,
    text: "Pizza ottima, camerieri super cordiali, locale veramente carino! Stra-consiglio.",
  },
  {
    name: "Jade W.",
    rating: 10,
    text: "We love it here, we keep coming back! The gnocchi is soooo good and the margherita pizza is also great quality.",
  },
  {
    name: "Celia M.",
    rating: 9.5,
    text: "Fuimos recomendados por una amiga italiana y nos encantó. Las pizzas Siciliana y Provola e Peppe, espectaculares. Volveremos.",
  },
  {
    name: "Sonia M.",
    rating: 8,
    text: "Las pizzas increíbles. Probamos el risotto de calabacín y el calamar frito, todo un acierto. No dejéis de probar el tiramisú de pistacho.",
  },
  {
    name: "Mario V.",
    rating: 10,
    text: "Cocina napolitana de 10. Una pizza auténtica y un trato cercano. Volveremos seguro.",
  },
  {
    name: "denise p.",
    rating: 10,
    text: "Posto molto carino, personale cordiale e disponibile. Cibo ottimo e di qualità. Consigliatissimo.",
  },
];
