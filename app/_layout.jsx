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
      <Stack.Screen
        name="OTPVerificationScreen"
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#379137" },
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AppointmentScreen"
        options={{
          headerShown: true,
          headerTitle: "Appiontment",
          headerShadowVisible: false,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#379137" },
        }}
      />
      <Stack.Screen
        name="AppointmentVoiceTextScreen"
        options={{
          headerShown: true,
          headerTitle: "Appiontment",
          headerShadowVisible: false,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#379137" },
        }}
      />
      <Stack.Screen
        name="RecorderScreen"
        options={{
          headerShown: true,
          headerTitle: "Appiontment",
          headerShadowVisible: false,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#379137" },
        }}
      />
      <Stack.Screen
        name="MessageScreen"
        options={{
          headerShown: true,
          headerTitle: "Appiontment",
          headerShadowVisible: false,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#379137" },
        }}
      />
      <Stack.Screen
        name="AppointmentFileUploadScreen"
        options={{
          headerShown: true,
          headerTitle: "Appiontment",
          headerShadowVisible: false,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#379137" },
        }}
      />
      <Stack.Screen
        name="AppointmentSummaryScreen"
        options={{
          headerShown: true,
          headerTitle: "Appiontment",
          headerShadowVisible: false,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#379137" },
        }}
      />
      <Stack.Screen
        name="CropPrediction"
        options={{
          headerShown: true,
          headerTitle: "Crop Prediction",
          headerShadowVisible: false,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#379137" },
        }}
      />
    </Stack>
    
  );
}


