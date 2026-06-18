import { fetchClient } from "@/lib/api/fetch-client";
import { WorldCupResponse, State } from "@/lib/api/types";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Mundial() {
  const [state, setState] = useState<State<WorldCupResponse>>({
    data: null,
    loading: true,
    error: null,
  });
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetchClient
      .get<WorldCupResponse>("/worldcup.json")
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((e) =>
        setState({ data: null, loading: false, error: e.message })
      );
  }, []);

  if (state.loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Cargando partidos...</Text>
      </View>
    );
  }

  if (state.error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {state.error}</Text>
      </View>
    );
  }

  const partidosFiltrados = state.data?.matches.filter((item) => {
    const q = busqueda.toLowerCase();
    return (
      item.team1.toLowerCase().includes(q) ||
      item.team2.toLowerCase().includes(q) ||
      item.group?.toLowerCase().includes(q)
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mundial 2026 - Resultados</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar por equipo o grupo..."
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={partidosFiltrados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>
              {item.team1} vs {item.team2}
            </Text>
            <Text style={styles.cardInfo}>
              Resultado: {item.score?.ft?.[0] ?? "-"} - {item.score?.ft?.[1] ?? "-"}
            </Text>
            <Text style={styles.cardInfo}>Grupo: {item.group}</Text>
            <Text style={styles.cardInfo}>Fecha: {item.date}</Text>
            <Text style={styles.cardInfo}>Sede: {item.ground}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F7FA" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  titulo: { fontSize: 22, fontWeight: "bold", color: "#111827", marginBottom: 16 },
  input: { backgroundColor: "#fff", borderRadius: 8, padding: 10, marginBottom: 12, fontSize: 15 },
  loadingText: { marginTop: 10, fontSize: 15, color: "#4B5563" },
  errorText: { fontSize: 15, color: "#DC2626" },
  card: { backgroundColor: "#fff", padding: 14, borderRadius: 12, marginBottom: 10, elevation: 2 },
  cardTitulo: { fontSize: 16, fontWeight: "bold", color: "#111827", marginBottom: 4 },
  cardInfo: { fontSize: 14, color: "#4B5563", marginBottom: 2 },
});