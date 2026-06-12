import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

const expoDb = openDatabaseSync("partidos.db", { enableChangeListener: true });

export const db = drizzle(expoDb);