// Carga de los datos embebidos (histórico importado, no cambia a diario). Las
// agregaciones viven en ./compute como funciones puras (server + cliente).
import dishData from "./data/dish.json";
import dishMesesData from "./data/dish-visitantes.json";
import forkData from "./data/thefork-covers.json";
import type { DishMonthRow, DishReserva, ForkMonthRow } from "./types";

export const DISH: DishReserva[] = dishData as DishReserva[];
export const DISH_MESES: DishMonthRow[] = dishMesesData as DishMonthRow[];
export const FORK: ForkMonthRow[] = forkData as ForkMonthRow[];

export * from "./compute";
