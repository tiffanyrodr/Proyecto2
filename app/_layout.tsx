import { expoDb } from "@/db/client";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function RootLayout() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    try {
      expoDb.execSync(`
        CREATE TABLE IF NOT EXISTS partidos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          equipo_local TEXT NOT NULL,
          equipo_visitante TEXT NOT NULL,
          goles_local INTEGER NOT NULL DEFAULT 0,
          goles_visitante INTEGER NOT NULL DEFAULT 0,
          fecha TEXT NOT NULL,
          grupo TEXT NOT NULL
        );
      `);
      setInit(true);
    } catch (error) {
      console.error("Error al iniciar", error);
    }
  }, []);

  if (!init) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="mundial" />
    </Stack>
  );
}