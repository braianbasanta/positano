// Carga de los datos embebidos (histórico importado, no cambia a diario). Las
// agregaciones viven en ./compute como funciones puras (server + cliente).
import dishData from "./data/dish.json";
import forkData from "./data/thefork-covers.json";
import type { DishReserva, ForkMonthRow } from "./types";

export const DISH: DishReserva[] = dishData as DishReserva[];
export const FORK: ForkMonthRow[] = forkData as ForkMonthRow[];

export * from "./compute";
