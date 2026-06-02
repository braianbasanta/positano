// ─────────────────────────────────────────────────────────────────────────
//  MENÚ DEL DÍA — se actualiza CADA SEMANA.
//  Para cambiarlo: edita solo este archivo. Mantén la estructura.
//  - "+3 €" en surcharge = suplemento sobre el precio del menú.
//  - Vacío surcharge = incluido en el menú.
//  Última actualización: semana del 2 al 6 de junio de 2026.
// ─────────────────────────────────────────────────────────────────────────

export type MenuDelDiaItem = {
  name: string;
  /** Suplemento opcional, p. ej. "+3 €". Vacío = incluido. */
  surcharge?: string;
};

export type MenuDelDiaDrink = {
  name: string;
  /** "Incluida", "+0,80 €", etc. */
  price: string;
};

export type MenuDelDiaData = {
  /** Texto de la semana que se muestra como referencia. */
  semana: string;
  precio: string;
  suplementoTerraza: string;
  primeros: MenuDelDiaItem[];
  segundos: MenuDelDiaItem[];
  postres: MenuDelDiaItem[];
  bebidas: MenuDelDiaDrink[];
};

export const menuDelDia: MenuDelDiaData = {
  semana: "Semana del 2 al 6 de junio",
  precio: "14,90 €",
  suplementoTerraza: "10%",
  primeros: [
    { name: "Ensalada mixta con atún, olivas negras, cebolla roja y orégano" },
    { name: "Burrata pugliese con tomate cherry y rúcula", surcharge: "+3 €" },
    { name: "Gazpacho andaluz casero" },
    { name: "Albóndigas de ternera con parmesano y tomate" },
    { name: "Ensaladilla rusa" },
    { name: "Rigatoni al pesto de albahaca" },
  ],
  segundos: [
    { name: "Risotto cuatro quesos, italiano y nueces", surcharge: "+3 €" },
    { name: "Milanesa de ternera con patatas fritas" },
    { name: "Muslo de pollo al horno con patatas" },
    { name: "Bistec a la plancha con crema de pimientos" },
    { name: "Tacos de atún con cebolla caramelizada" },
    {
      name: "Pizza a elegir (Margherita, Diavola, Jamón y champiñón, Calzone al forno, Ortolana)",
    },
  ],
  postres: [
    { name: "Cheesecake de frutos rojos" },
    { name: "Yogur con miel y nueces" },
    { name: "Macedonia" },
    { name: "Panna cotta" },
  ],
  bebidas: [
    { name: "Agua sin gas", price: "Incluida" },
    { name: "Refresco", price: "Incluido" },
    { name: "Caña Estrella", price: "Incluida" },
    { name: "Copa de vino", price: "Incluida" },
    { name: "Agua con gas", price: "+0,50 €" },
    { name: "Estrella 0,0", price: "+0,70 €" },
    { name: "Caña Turia", price: "+0,80 €" },
    { name: "Freedam", price: "+0,80 €" },
    { name: "Jarra Estrella", price: "+1,50 €" },
    { name: "Nastro Azzurro", price: "+1,50 €" },
    { name: "Jarra Turia", price: "+2 €" },
  ],
};
