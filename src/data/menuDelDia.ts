// ─────────────────────────────────────────────────────────────────────────
//  MENÚ DEL DÍA — se actualiza CADA SEMANA.
//  Para cambiarlo: edita solo este archivo. Mantén la estructura.
//  - "+3 €" en surcharge = suplemento sobre el precio del menú.
//  - Vacío surcharge = incluido en el menú.
//  Última actualización: semana del 15 al 18 de julio de 2026.
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
  semana: "Semana del 15 al 18 de julio",
  precio: "14,90 €",
  suplementoTerraza: "10%",
  primeros: [
    { name: "Ensalada mixta con queso feta, olivas negras, tomate cherry y orégano" },
    { name: "Burrata pugliese con tomate cherry y rúcula", surcharge: "+3 €" },
    { name: "Sopa de melón y menta" },
    { name: "Albóndigas de ternera con parmesano y tomate" },
    { name: "Hummus de garbanzo casero" },
    { name: "Rigatoni con pesto de brócoli" },
  ],
  segundos: [
    { name: "Risotto con crema de cigala y tomate amarillo", surcharge: "+3 €" },
    { name: "Milanesa de ternera con patatas fritas" },
    { name: "Solomillo de cerdo con puré de patatas" },
    { name: "Muslo de pollo con patatas al horno" },
    { name: "Tacos de atún con espárragos" },
    {
      name: "Pizza a elegir (Margherita, Diavola, Jamón y champiñón, Calzone al forno, Ortolana)",
    },
  ],
  postres: [
    { name: "Panna cotta" },
    { name: "Macedonia de fruta" },
    { name: "Yogur con miel y nueces" },
    { name: "Helado" },
  ],
  bebidas: [
    { name: "Agua sin gas", price: "Incluida" },
    { name: "Refresco", price: "Incluido" },
    { name: "Caña Estrella", price: "Incluida" },
    { name: "Copa de vino", price: "Incluida" },
    { name: "Agua con gas", price: "+0,50 €" },
    { name: "Caña Estrella 0,33", price: "+0,70 €" },
    { name: "Caña Turia", price: "+0,80 €" },
    { name: "Freedam", price: "+0,80 €" },
    { name: "Jarra Estrella", price: "+1,50 €" },
    { name: "Nastro Azzurro", price: "+1,50 €" },
    { name: "Jarra Turia", price: "+2 €" },
  ],
};
