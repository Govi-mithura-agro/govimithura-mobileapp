import { SplashScreen, Stack } from 'expo-router'


export default function App() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="WelcomeScreen"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="LoginSignupScreen"
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#379137" },
        }}
      />
      <Stack.Screen
        name="SignupScreen"
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#379137" },
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#379137" },
        }}
      />
    </Stack>
  );
}


