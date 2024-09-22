import { SplashScreen, Stack } from 'expo-router'
import { processFontFamily, useFonts } from 'expo-font'
import { useEffect } from 'react';


export default function App() {

  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null;

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
          headerTintColor: "black",
          headerStyle: { backgroundColor: "#FFF" },
        }}
      />
      <Stack.Screen
        name="SignupScreen"
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerTintColor: "black",
          headerStyle: { backgroundColor: "#FFF" },
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerTintColor: "black",
          headerStyle: { backgroundColor: "#FFF" },
        }}
      />
      <Stack.Screen
        name="OTPVerificationScreen"
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerTintColor: "black",
          headerStyle: { backgroundColor: "#FFF" },
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
          headerTintColor: "black",
          headerStyle: { backgroundColor: "#FFF" },
        }}
      />
      <Stack.Screen
        name="AppointmentVoiceTextScreen"
        options={{
          headerShown: true,
          headerTitle: "Appiontment",
          headerShadowVisible: false,
          headerTintColor: "black",
          headerStyle: { backgroundColor: "#FFF" },
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
          headerTintColor: "black",
          headerStyle: { backgroundColor: "#FFF" },
        }}
      />
      <Stack.Screen
        name="AppointmentFileUploadScreen"
        options={{
          headerShown: true,
          headerTitle: "Appiontment",
          headerShadowVisible: false,
          headerTintColor: "black",
          headerStyle: { backgroundColor: "#FFF" },
        }}
      />
      <Stack.Screen
        name="AppointmentSummaryScreen"
        options={{
          headerShown: true,
          headerTitle: "Appiontment",
          headerShadowVisible: false,
          headerTintColor: "black",
          headerStyle: { backgroundColor: "#FFF" },
        }}
      />
      <Stack.Screen
        name="CropPrediction"
        options={{
          headerShown: true,
          headerTitle: "Crop Prediction",
          headerShadowVisible: false,
          headerTintColor: "black",
          headerStyle: { backgroundColor: "#FFF" },
        }}
      />
      <Stack.Screen
        name="AppointmentHistory"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AppointmentScreenForUpdate"
        options={{
          headerShown: true,
          headerTitle: "Update Appointment",
          headerShadowVisible: false,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#379137" },
        }}
      />
      <Stack.Screen
        name="AppointmentVoiceTextScreenForUpdate"
        options={{
          headerShown: true,
          headerTitle: "Update Appointment",
          headerShadowVisible: false,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#379137" },
        }}
      />
      <Stack.Screen
        name="MessageScreenForUpdate"
        options={{
          headerShown: true,
          headerTitle: "Update Appointment",
          headerShadowVisible: false,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#379137" },
        }}
      />
      <Stack.Screen
        name="AppointmentFileUploadScreenForUpdate"
        options={{
          headerShown: true,
          headerTitle: "Update Appointment",
          headerShadowVisible: false,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#379137" },
        }}
      />
      <Stack.Screen
        name="AppointmentSummaryScreenForUpdate"
        options={{
          headerShown: true,
          headerTitle: "Update Appointment",
          headerShadowVisible: false,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#379137" },
        }}
      />
      <Stack.Screen
        name="UserProfileScreen"
        options={{
          headerShown: true,
          headerTitle: "User Profile",
          headerShadowVisible: false,
          headerTintColor: "black",
          headerStyle: { backgroundColor: "#FFF" },
        }}
      />
    </Stack>
    
  );
}


