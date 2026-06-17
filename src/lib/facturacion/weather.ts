// Clima de Barcelona (Open-Meteo) para correlacionarlo con la facturación y
// anticipar afluencia. API gratuita, sin key. Una sola llamada trae histórico
// reciente (past_days) + previsión (forecast_days), alineado a fecha local.
//
// Coordenadas del restaurante (Carrer del Rosselló 24, Eixample).
const LAT = 41.3845;
const LON = 2.1459;

export interface DayWeather {
  date: string; // "YYYY-MM-DD"
  tMax: number | null; // °C
  tMin: number | null; // °C
  precip: number | null; // mm de lluvia del día
  precipProb: number | null; // % prob. lluvia (solo previsión)
  wind: number | null; // km/h ráfaga máx
  code: number | null; // código WMO
}

const DAILY =
  "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max";

const URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
  `&daily=${DAILY}&timezone=Europe%2FMadrid&past_days=92&forecast_days=16`;

interface OpenMeteoResponse {
  daily?: {
    time: string[];
    weather_code: (number | null)[];
    temperature_2m_max: (number | null)[];
    temperature_2m_min: (number | null)[];
    precipitation_sum: (number | null)[];
    precipitation_probability_max: (number | null)[];
    wind_speed_10m_max: (number | null)[];
  };
}

const r1 = (n: number | null): number | null => (n == null ? null : Math.round(n * 10) / 10);

// Descarga el clima de Barcelona. Devuelve [] si la API falla (la sección del
// dashboard simplemente no se muestra, sin romper la página).
export async function fetchBarcelonaWeather(): Promise<DayWeather[]> {
  try {
    const res = await fetch(URL, { next: { revalidate: 10800 } }); // 3 h
    if (!res.ok) return [];
    const json = (await res.json()) as OpenMeteoResponse;
    const d = json.daily;
    if (!d?.time?.length) return [];
    return d.time.map((date, i) => ({
      date,
      tMax: r1(d.temperature_2m_max[i]),
      tMin: r1(d.temperature_2m_min[i]),
      precip: r1(d.precipitation_sum[i]),
      precipProb: d.precipitation_probability_max[i] ?? null,
      wind: r1(d.wind_speed_10m_max[i]),
      code: d.weather_code[i] ?? null,
    }));
  } catch {
    return [];
  }
}

// Código WMO → emoji + etiqueta corta en español.
export function weatherIcon(code: number | null): string {
  if (code == null) return "·";
  if (code === 0) return "☀️";
  if (code <= 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 57) return "🌦️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "🌨️";
  if (code <= 82) return "🌧️";
  if (code <= 86) return "🌨️";
  return "⛈️";
}

export function weatherLabel(code: number | null): string {
  if (code == null) return "—";
  if (code === 0) return "Despejado";
  if (code <= 2) return "Poco nuboso";
  if (code === 3) return "Nublado";
  if (code <= 48) return "Niebla";
  if (code <= 57) return "Llovizna";
  if (code <= 67) return "Lluvia";
  if (code <= 77) return "Nieve";
  if (code <= 82) return "Chubascos";
  if (code <= 86) return "Chubascos de nieve";
  return "Tormenta";
}

// Coeficiente de correlación de Pearson. null si <3 pares o varianza nula.
export function pearson(pairs: [number, number][]): number | null {
  const n = pairs.length;
  if (n < 3) return null;
  let sx = 0, sy = 0, sxy = 0, sx2 = 0, sy2 = 0;
  for (const [x, y] of pairs) {
    sx += x; sy += y; sxy += x * y; sx2 += x * x; sy2 += y * y;
  }
  const num = n * sxy - sx * sy;
  const den = Math.sqrt((n * sx2 - sx * sx) * (n * sy2 - sy * sy));
  if (den === 0) return null;
  return num / den;
}

// Lectura en palabras de la fuerza de una correlación.
export function corrStrength(r: number | null): string {
  if (r === null) return "sin datos suficientes";
  const a = Math.abs(r);
  if (a < 0.2) return "prácticamente nula";
  if (a < 0.4) return "débil";
  if (a < 0.6) return "moderada";
  if (a < 0.8) return "fuerte";
  return "muy fuerte";
}
