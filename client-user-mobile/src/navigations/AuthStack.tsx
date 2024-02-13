import LoginScreen from "@/screens/LoginScreen";
import { CompositeScreenProps } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { RootStackParamList, RootStackScreenProps } from "./RootStack";
import { MainTabParamList, MainTabScreenProps } from "./MainTab";
import RegisterScreen from "@/screens/RegisterScreen";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_bottom" }}
    >
      <Stack.Screen name={"Login"} component={LoginScreen} />
      <Stack.Screen name={"Register"} component={RegisterScreen} />
    </Stack.Navigator>
  );
}
