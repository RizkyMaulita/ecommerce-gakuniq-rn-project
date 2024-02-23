import { NavigatorScreenParams } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import MainTab, { MainTabParamList } from "./MainTab";
import AuthStack, { AuthStackParamList } from "./AuthStack";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import ProductStack, { ProductStackParamList } from "./ProductStack";

export type RootStackParamList = {
  MainTab: NavigatorScreenParams<MainTabParamList>;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  ProductStack: NavigatorScreenParams<ProductStackParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name={"MainTab"} component={MainTab} />
          <Stack.Screen name={"ProductStack"} component={ProductStack} />
        </>
      ) : (
        <Stack.Screen name={"AuthStack"} component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
