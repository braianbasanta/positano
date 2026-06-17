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

// Opiniones reales de Google (perfil de Positano en Google Maps). Copiadas tal
// cual de las reseñas publicadas; solo se normaliza la capitalización de algún
// nombre. NO inventar reseñas: añadir aquí únicamente texto real de clientes.
export const reviews: Review[] = [
  {
    name: "Albert Arranz",
    rating: 5,
    text: "Menú económico, muy bueno y bastante variado. No hay mucha cantidad de platos pero suficiente y las raciones están bien. Hay que probar las pizzas, son espectaculares. Al estilo napolitano. No he probado la carta pero tiene buena pinta.",
  },
  {
    name: "Mireia Nicolàs Molina",
    rating: 5,
    text: "Restaurante italiano muy recomendable con platos de buena calidad y excelente presentación. A destacar la atención del camarero Ricardo que ha sido muy atento y servicial durante toda la cena.",
  },
  {
    name: "Claudia Calderon",
    rating: 5,
    text: "Comimos una pizza margarita y una pasta carbonara y estaba increíble!! Muy rico de verdad. Para beber unos aperol que estaban muy bien preparados y al final Matías nos invitó a un chupito de pistacho… DELICIOSO. Tiene terracita y tiene interior.",
  },
  {
    name: "Nerea de Asís Molleja",
    rating: 5,
    text: "Fuimos un grupo de 23 personas para celebrar la despedida de soltera y soltero. La atención fue increíble, muy atentos a todo, nos sirvieron muy rápido aún siendo un grupo muy grande. El trato de los camareros fue espectacular y la comida muy buena: se nota la masa de la pizza, masa madre y hecha con horno de piedra, y la carbonara hecha con huevo. Platos al puro estilo italiano. Era la tercera vez que íbamos y un acierto total. Totalmente recomendable!",
  },
  {
    name: "Ainhoa F.",
    rating: 5,
    text: "Pizzas recién hechas con masa madre, de pizza fina y al horno de piedra. Muy buen local y ambiente agradable. Tienen terraza y una planta superior.",
  },
  {
    name: "Miguel Ángel Fernández Ruiz",
    rating: 5,
    text: "Excelente restaurante. Buenísima carbonara, y el menú con albóndigas con parmesano, pizza y panacota espectacular a muy buen precio. El camarero muy atento y amable, dándonos las recomendaciones precisas. La pasta y el menú fueron 39 €.",
  },
  {
    name: "Marta CB",
    rating: 5,
    text: "¡¡¡Es la segunda vez que como en Positano y lo recomiendo 100%!!! La comida está exquisita y el trato es excelente. Gracias, Matías, por tus recomendaciones y simpatía. ♥️",
  },
  {
    name: "Jasmine Babo",
    rating: 5,
    text: "Yo diría que es la mejor pizzería de Barcelona. No hace falta irse a Italia para probar una pizza auténtica: la tienes aquí. Adoro especialmente su masa, tan bien elaborada, que destaca entre las demás. Recomiendo a todo el mundo que venga a probarla, os vais a enganchar como me ha pasado a mí.",
  },
  {
    name: "Lucas Diaz",
    rating: 5,
    text: "Espectacular lugar, muy grato ambiente, la atención es muy servicial y la comida maravillosa. De lo mejor que he probado en pizzas últimamente, con masa madre y harina auténtica napolitana.",
  },
  {
    name: "Carmelo Cacciola",
    rating: 5,
    text: "El ambiente, el personal y la comida son realmente magníficos. La pizza está deliciosa, con ingredientes de calidad y muy bien elaborada; recomiendo la «della Nonna». La tarta «pan di stelle» es increíble y el Aperol Spritz también está muy bueno. El personal es muy simpático, tanto que nos invitaron a dos rondas: una de limoncello y otra de meloncello. Lo recomiendo encarecidamente.",
  },
  {
    name: "Ramón García Hernández",
    rating: 5,
    text: "Sitio perfecto para reunirse con amigos y/o familia. Servicio rápido y comida deliciosa. Para mi gusto, la acústica del local un poco mala ya que tienes que alzar la voz para hablar entre comensales. Lo recomendaría sin duda. Buena calidad-precio.",
  },
  {
    name: "Miguel Ángel MC",
    rating: 5,
    text: "Sin duda para repetir: gnocchi sorrentina buenísimos, pizza capricciosa deliciosa y postre pan di stelle espectacular. Volveremos.",
  },
  {
    name: "Peyton Clark",
    rating: 5,
    text: "Best focaccia I have ever had! The pizza was 10/10 as well.",
  },
  {
    name: "Natalia Reina",
    rating: 5,
    text: "Comida deliciosa, excelente ambiente y la pasta en rueda de pecorino, la mejor de Barcelona para mí. 👏",
  },
  {
    name: "RIPPA",
    rating: 5,
    text: "Lugar muy típico y característico italiano, personal muy amable y profesional. Y la comida es brutal (pizza napolitana 100%). Lo recomiendo vivamente.",
  },
  {
    name: "Pili Souto",
    rating: 5,
    text: "Pedimos 2 pizzas que estaban muy ricas. Servicio amable. También tuvieron el detalle de invitarnos a limoncello. Ganas de volver a probar la pasta casera.",
  },
  {
    name: "Marc Moral Escudero",
    rating: 5,
    text: "Pizzería más que correcta y platos típicos italianos muy bien cocinados. Probamos la parmigiana de berenjena y nos gustó mucho, con el tomate bien deshecho y caramelizado. Volveremos.",
  },
  {
    name: "Maura Ambrosiano",
    rating: 5,
    text: "Massimo delivered excellent service, tasty food at a great price. Grazie! Alla prossima.",
  },
  {
    name: "Marcela Aldana",
    rating: 5,
    text: "Muy buena experiencia en este restaurante. Desde el momento en que llegamos, el personal fue amable y atento, haciéndonos sentir bienvenidos. La comida estaba deliciosa, así que muy recomendado. 😁",
  },
  {
    name: "Marc FP",
    rating: 5,
    text: "Comida italiana tradicional y de muy buena calidad. El menú del día es muy elaborado. El servicio del personal es muy cercano y atento. Vale la pena tanto para comer como para cenar. Súper recomendable.",
  },
];

// Opiniones reales de TheFork. La plataforma puntúa sobre 10, así que el rating
// se guarda en esa escala y las tarjetas lo muestran como "X/10".
export const forkReviews: Review[] = [
  {
    name: "Dídac R.",
    rating: 10,
    text: "Muy buena comida y servicio, ya es la tercera vez que vengo a Positano y no será la última. 10/10.",
  },
  {
    name: "Sebastián G.",
    rating: 9.5,
    text: "La comida es de una grandísima calidad. Las pizzas y la pasta, extraordinarias.",
  },
  {
    name: "Vanessa M.",
    rating: 10,
    text: "Reservamos con poco tiempo de antelación y, aun así, la atención, el servicio y la comida han sido excelentes. Fuimos con dos nenes de 2 años y han estado muy atentos con ellos.",
  },
  {
    name: "Pau A.",
    rating: 9.5,
    text: "Todo genial, pero estábamos justo debajo de un altavoz, que con la música hacía complicado poder hablar sin alzar la voz.",
  },
  {
    name: "Sofia S.",
    rating: 10,
    text: "La comida está deliciosa y el servicio es muy bueno!",
  },
  {
    name: "Sergio V.",
    rating: 10,
    text: "Sitio increíble, servicio y comida de 10. Volveré.",
  },
  {
    name: "Jennifer Q.",
    rating: 9.5,
    text: "Las pizzas buenísimas y el servicio también muy majos. No es la primera vez que venimos ni será la última.",
  },
  {
    name: "Javier Á.",
    rating: 10,
    text: "Pizzas hechas al horno de piedra, muy buenas.",
  },
  {
    name: "Pamela J.",
    rating: 10,
    text: "Deliciosa comida, pizzas italianas de verdad, muchas variedades interesantes en combinación, el tiramisú delicioso! Y la atención de 10. Volveremos sin duda.",
  },
  {
    name: "Beatriz D.",
    rating: 9.5,
    text: "Nos gustó todo mucho, estaba todo muy rico.",
  },
  {
    name: "Eric L.",
    rating: 10,
    text: "El trato amable, muy buen servicio, camareros y dueño muy agradables, y la pizza es estupenda, la mejor que he probado sin duda. Espectacular.",
  },
  {
    name: "Sergio R.",
    rating: 10,
    text: "Hemos estado hoy y la verdad nos ha sorprendido lo bueno que estaba la comida, tanto la pizza como los spaghetti. Seguro que repetiremos.",
  },
  {
    name: "Marta M.",
    rating: 10,
    text: "Comida rica y buena!! El personal muy agradables y atentos desde el primer momento.",
  },
  {
    name: "Andreu À.",
    rating: 8.5,
    text: "Buena comida y excelente servicio.",
  },
  {
    name: "Mario V.",
    rating: 10,
    text: "Cocina napolitana de 10!!!",
  },
];
