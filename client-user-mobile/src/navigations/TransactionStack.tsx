import TransactionScreen from "@/screens/TransactionScreen";
import { CompositeScreenProps } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { MainTabParamList, MainTabScreenProps } from "./MainTab";

export type TransactionStackParamList = {
  MainTransaction: undefined;
};

export type TransactionStackScreenProps<
  T extends keyof TransactionStackParamList
> = CompositeScreenProps<
  NativeStackScreenProps<TransactionStackParamList, T>,
  MainTabScreenProps<keyof MainTabParamList>
>;

const Stack = createNativeStackNavigator<TransactionStackParamList>();

export default function TransactionStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"MainTransaction"} component={TransactionScreen} />
    </Stack.Navigator>
  );
}
