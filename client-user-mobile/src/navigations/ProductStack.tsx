import ProductListScreen from "@/screens/ProductListScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type ProductStackParamList = {
  ProductList: undefined;
};

const Stack = createNativeStackNavigator<ProductStackParamList>();

export default function ProductStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductList" component={ProductListScreen} />
    </Stack.Navigator>
  );
}
