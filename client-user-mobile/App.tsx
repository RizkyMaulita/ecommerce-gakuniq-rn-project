import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import StackHolder from "@/navigations/StackHolder";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <StackHolder />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
