// Plan de facturación de Positano. Guía de referencia para el equipo (Antonio,
// Braian, sala). El KPI maestro es la MEDIA DIARIA: es comparable entre meses
// porque no depende de cuántos días tenga cada mes. El total sale solo:
// media diaria × días operativos. Regla de escalado: +250 €/día ≈ +6.500 €/mes.

// Techos = mejor día real observado por tipo de día (dic 2025 – jun 2026, solo
// sala). Sirven de referencia de "lo que ya es posible un buen día".
export interface DiaPlan {
  weekday: number; // getDay(): 0=domingo … 6=sábado
  label: string;
  techo: number | null;
  nota: string;
}

export const DIAS_PLAN: DiaPlan[] = [
  { weekday: 2, label: "Martes", techo: 1560, nota: "Día más flojo. Palanca: menú del día + oficinas." },
  { weekday: 3, label: "Miércoles", techo: 2161, nota: "Mediodía con margen amplio entre semana." },
  { weekday: 4, label: "Jueves", techo: 2882, nota: "El mejor de entre semana; antesala del finde." },
  { weekday: 5, label: "Viernes", techo: 3194, nota: "Mediodía ya apuntalado con menú del día; crecer en la cena." },
  { weekday: 6, label: "Sábado", techo: 5250, nota: "Techo natural: comida + cena. Sostenerlo, no exprimirlo." },
  { weekday: 0, label: "Domingo", techo: 3163, nota: "Fuerte en almuerzo; la cena cae respecto al sábado." },
];

// Hoja de ruta expresada en MEDIA DIARIA objetivo (€/día operativo).
export interface FasePlan {
  plazo: string;
  nombre: string;
  media: number;
  detalle: string;
}

export const FASES: FasePlan[] = [
  { plazo: "Hoy", nombre: "Punto de partida", media: 2100, detalle: "Media real de mayo–junio 2026." },
  { plazo: "Corto plazo", nombre: "Consolidar los objetivos actuales", media: 2417, detalle: "Mar–Jue 1.500 · Vie 3.000 · Sáb/Dom 3.500." },
  { plazo: "Medio plazo", nombre: "Subir el mediodía entre semana", media: 2667, detalle: "Mar–Jue a 2.000 con menú del día + oficinas." },
  { plazo: "Medio-largo", nombre: "Entre semana al nivel del viernes + findes a 4k", media: 2975, detalle: "Mar–Jue 2.200 · Vie 3.500 · Sáb 4.000 · Dom 3.750." },
  { plazo: "Largo plazo", nombre: "Findes a 5.000 € (días pico tipo San Valentín)", media: 3667, detalle: "Sáb 5.000 · Dom 4.500 · resto al alza." },
];

// Las tres bolsas de crecimiento, por prioridad.
export interface Palanca {
  titulo: string;
  texto: string;
}

export const PALANCAS: Palanca[] = [
  {
    titulo: "Mediodía martes–jueves",
    texto:
      "La mayor capacidad ociosa. Menú del día + captación de oficinas de la zona (AstraZeneca / edificio Estel, torres Tarradellas) vía visita física y Edenred. Vale ~+12.000 €/mes.",
  },
  {
    titulo: "Cena de viernes y domingo",
    texto:
      "El mediodía del viernes ya va con menú del día; el recorrido está en acercar esas cenas a la del sábado.",
  },
  {
    titulo: "Sábado",
    texto: "Ya es el día techo (comida + cena). El objetivo es sostenerlo, no exprimirlo.",
  },
];

// +250 €/día de media ≈ +6.500 €/mes (a ~26 días operativos).
export const PASO_MEDIA = 250;
