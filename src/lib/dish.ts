// Widget de reservas DISH — fuente única de verdad.
//
// Lo usan la página /reservas (y /en/book-a-table) y el modal del botón
// flotante (FloatingReserva). Mantener la URL aquí evita que la paleta o el ID
// se desincronicen entre los distintos sitios donde se incrusta el widget.

export const DISH_ID = "hydra-e271f889-46d4-4929-baba-ef5fe752476a";

// Colores de marca Positano (ver globals.css) inyectados en el widget DISH por
// query string — mismo mecanismo que su widget.js oficial — para que use la
// paleta de la web y no el gris por defecto de DISH. El '#' va como %23.
// Botón principal en dorado (lemon) sobre texto ink, igual que los CTA de la web.
export const DISH_WIDGET_URL =
  `https://reservation.dish.co/widget/${DISH_ID}` +
  `?eid=${DISH_ID}&tagid=hors-${DISH_ID}&width=100%25` +
  "&backgroundColor=%23f3ecdc" +
  "&foregroundColor=%231d2750" +
  "&linkColor=%231d2750" +
  "&primaryButtonBackgroundColor=%23c49b5a" +
  "&primaryButtonForegroundColor=%231d2750" +
  "&secondaryButtonBackgroundColor=%231d2750" +
  "&secondaryButtonForegroundColor=%23f3ecdc";
