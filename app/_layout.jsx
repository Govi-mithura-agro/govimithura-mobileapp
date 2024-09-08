import { SplashScreen, Stack } from 'expo-router'


export default function App() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="WelcomeScreen" options={{ headerShown: false }} />
    </Stack>
  );
}


