import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const partidos = sqliteTable("partidos", {
  id: int("id").primaryKey({ autoIncrement: true }),
  equipoLocal: text("equipo_local").notNull(),
  equipoVisitante: text("equipo_visitante").notNull(),
  golesLocal: int("goles_local").notNull(),
  golesVisitante: int("goles_visitante").notNull(),
  fecha: text("fecha").notNull(),
  grupo: text("grupo").notNull(),
});