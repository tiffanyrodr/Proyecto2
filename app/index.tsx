import { db } from "@/db/client";
import { partidos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const [equipoLocal, setEquipoLocal] = useState("");
  const [equipoVisitante, setEquipoVisitante] = useState("");
  const [golesLocal, setGolesLocal] = useState("");
  const [golesVisitante, setGolesVisitante] = useState("");
  const [fecha, setFecha] = useState("");
  const [grupo, setGrupo] = useState("");

  const { data: lista } = useLiveQuery(db.select().from(partidos));

  async function agregarPartido() {
    if (!equipoLocal || !equipoVisitante || !fecha || !grupo) return;
    await db.insert(partidos).values({
      equipoLocal,
      equipoVisitante,
      golesLocal: parseInt(golesLocal) || 0,
      golesVisitante: parseInt(golesVisitante) || 0,
      fecha,
      grupo,
    });
    setEquipoLocal("");
    setEquipoVisitante("");
    setGolesLocal("");
    setGolesVisitante("");
    setFecha("");
    setGrupo("");
  }

  async function eliminarPartido(id: number) {
    await db.delete(partidos).where(eq(partidos.id, id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Partidos del Mundial 2026</Text>

      <TextInput style={styles.input} placeholder="Equipo local" value={equipoLocal} onChangeText={setEquipoLocal} />
      <TextInput style={styles.input} placeholder="Equipo visitante" value={equipoVisitante} onChangeText={setEquipoVisitante} />
      <TextInput style={styles.input} placeholder="Goles local" value={golesLocal} onChangeText={setGolesLocal} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Goles visitante" value={golesVisitante} onChangeText={setGolesVisitante} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Fecha (ej: 2026-06-11)" value={fecha} onChangeText={setFecha} />
      <TextInput style={styles.input} placeholder="Grupo (ej: A)" value={grupo} onChangeText={setGrupo} />

      <TouchableOpacity style={styles.boton} onPress={agregarPartido}>
        <Text style={styles.botonTexto}>Agregar partido</Text>
      </TouchableOpacity>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>{item.equipoLocal} vs {item.equipoVisitante}</Text>
            <Text style={styles.cardInfo}>Resultado: {item.golesLocal} - {item.golesVisitante}</Text>
            <Text style={styles.cardInfo}>Fecha: {item.fecha} | Grupo: {item.grupo}</Text>
            <TouchableOpacity onPress={() => eliminarPartido(item.id)}>
              <Text style={styles.eliminar}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F7FA" },
  titulo: { fontSize: 22, fontWeight: "bold", color: "#111827", marginBottom: 16 },
  input: { backgroundColor: "#fff", borderRadius: 8, padding: 10, marginBottom: 8, fontSize: 15 },
  boton: { backgroundColor: "#2563EB", padding: 14, borderRadius: 10, alignItems: "center", marginBottom: 16 },
  botonTexto: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  card: { backgroundColor: "#fff", padding: 14, borderRadius: 12, marginBottom: 10, elevation: 2 },
  cardTitulo: { fontSize: 16, fontWeight: "bold", color: "#111827", marginBottom: 4 },
  cardInfo: { fontSize: 14, color: "#4B5563", marginBottom: 2 },
  eliminar: { color: "#DC2626", fontWeight: "bold", marginTop: 6 },
});