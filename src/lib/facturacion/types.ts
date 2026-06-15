// Modelo de datos de facturación. Un registro por día. El desglose por servicio
// (mediodía/cena) es OPCIONAL: los días registrados a mano a futuro lo llevan,
// pero el histórico importado del Excel viene como total/día (sin split) y se
// guarda en `total`. Las vistas mediodía/cena solo usan días con split; los
// totales suman lo que haya.

export type Canal = "glovo" | "tarjeta" | "efectivo" | "delivery"; // delivery = Uber/TheFork

export const CANALES: Canal[] = ["glovo", "tarjeta", "efectivo", "delivery"];

export const CANAL_LABEL: Record<Canal, string> = {
  glovo: "Glovo",
  tarjeta: "Tarjeta",
  efectivo: "Efectivo",
  delivery: "Uber/TheFork",
};

export type Canales = Record<Canal, number>;

export interface DayRecord {
  date: string; // "YYYY-MM-DD"
  closed?: boolean; // cerrado (lunes / festivo)
  lunch?: Canales; // desglose por servicio (registro manual)
  dinner?: Canales;
  total?: Canales; // histórico sin desglose de servicio
  note?: string;
  updatedAt: string; // ISO 8601
}

export function emptyCanales(): Canales {
  return { glovo: 0, tarjeta: 0, efectivo: 0, delivery: 0 };
}

export function sumCanales(c?: Canales | null): number {
  if (!c) return 0;
  return c.glovo + c.tarjeta + c.efectivo + c.delivery;
}

export function addCanales(a: Canales, b?: Canales | null): Canales {
  if (!b) return a;
  return {
    glovo: a.glovo + b.glovo,
    tarjeta: a.tarjeta + b.tarjeta,
    efectivo: a.efectivo + b.efectivo,
    delivery: a.delivery + b.delivery,
  };
}

export function hasSplit(r: DayRecord): boolean {
  return !!(r.lunch || r.dinner);
}

// Canales agregados del día (lunch + dinner + total, lo que exista).
export function dayChannels(r: DayRecord): Canales {
  return addCanales(addCanales(addCanales(emptyCanales(), r.lunch), r.dinner), r.total);
}

// Facturación total del día.
export function dayTotal(r: DayRecord): number {
  if (r.closed) return 0;
  return sumCanales(dayChannels(r));
}
