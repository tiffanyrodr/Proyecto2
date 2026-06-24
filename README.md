# Proyecto 2 - Explorador de Datos y Consumo de APIs

## TPA-4001 Programación para Dispositivos Móviles
**Estudiante:** Tiffany Rodríguez  
**Profesor:** Diego Carrillo  
**Semanas:** 7 a 10

## Descripción
Aplicación móvil desarrollada con React Native y Expo que permite registrar partidos del Mundial 2026 de forma local y consultar resultados en tiempo real desde una API pública.

## Funcionalidades

### Partidos locales (SQLite)
- Agregar partidos con equipo local, visitante, goles, fecha y grupo
- Ver la lista de partidos guardados en tiempo real
- Eliminar partidos

### Resultados del Mundial (API)
- Consultar resultados reales del Mundial 2026
- Buscar por nombre de equipo o grupo

## Tecnologías utilizadas
- React Native con Expo SDK 54
- Expo Router para navegación basada en archivos
- TypeScript
- expo-sqlite y Drizzle ORM para base de datos local
- Context API para manejo de estado global
- Fetch API para consumo de servicios REST

## Arquitectura del proyecto
- app/ → Pantallas (vistas)
- context/ → Estado global con Context API
- db/ → Esquema y cliente de base de datos
- lib/api/ → Cliente HTTP y tipos para la API

## Cómo correr el proyecto
1. Instalar dependencias: npm install
2. Iniciar el servidor: npx expo start
3. Escanear el QR con la app Expo Go en tu celular