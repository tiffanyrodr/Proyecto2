import { db } from "@/db/client";
import { partidos } from "@/db/schema";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { createContext, useContext } from "react";
import { eq } from "drizzle-orm";

interface PartidosContextType {
  lista: typeof partidos.$inferSelect[];
  agregarPartido: (partido: Omit<typeof partidos.$inferInsert, "id">) => Promise<void>;
  eliminarPartido: (id: number) => Promise<void>;
}

const PartidosContext = createContext<PartidosContextType | null>(null);

export function PartidosProvider({ children }: { children: React.ReactNode }) {
  const { data: lista = [] } = useLiveQuery(db.select().from(partidos));

  async function agregarPartido(partido: Omit<typeof partidos.$inferInsert, "id">) {
    await db.insert(partidos).values(partido);
  }

  async function eliminarPartido(id: number) {
    await db.delete(partidos).where(eq(partidos.id, id));
  }

  return (
    <PartidosContext.Provider value={{ lista, agregarPartido, eliminarPartido }}>
      {children}
    </PartidosContext.Provider>
  );
}

export function usePartidos() {
  const context = useContext(PartidosContext);
  if (!context) throw new Error("usePartidos debe usarse dentro de PartidosProvider");
  return context;
}