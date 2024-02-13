import TransactionScreen from "@/screens/TransactionScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type TransactionStackParamList = {
  MainTransaction: undefined;
};

const Stack = createNativeStackNavigator<TransactionStackParamList>();

export default function TransactionStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"MainTransaction"} component={TransactionScreen} />
    </Stack.Navigator>
  );
}
