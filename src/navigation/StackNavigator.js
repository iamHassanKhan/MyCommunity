import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import OnboardingScreen from "../../screens/Auth/OnboardingScreen";
import LoginScreen from "../../screens/Auth/LoginScreen";
import ProfileSetupScreen from "../../screens/Auth/ProfileSetupScreen";
import TabNavigator from "./TabNavigator";
import UserPostScreen from "../../screens/Extra/UserPostScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_bottom" }}
    >
      {/* Auth flow */}
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />

      {/* Main app flow */}
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="Post" component={UserPostScreen} />
    </Stack.Navigator>
  );
}
