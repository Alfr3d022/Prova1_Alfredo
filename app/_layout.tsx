// app/_layout.tsx
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      {/* Defina as rotas principais */}
      <Stack.Screen name="index" options={{ title: "" }} />
      <Stack.Screen name="WeatherListScreen" options={{ title: "Weather List" }} />
    </Stack>
  );
}
