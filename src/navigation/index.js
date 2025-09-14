import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
