import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RootStack from "@/navigations/RootStack";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo";
import RootContext from "@/context";
import { Text } from "react-native";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Text>test</Text>÷\ */}
        <ApolloProvider client={client}>
          <RootContext>
            <NavigationContainer>
              <RootStack />
            </NavigationContainer>
          </RootContext>
        </ApolloProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
