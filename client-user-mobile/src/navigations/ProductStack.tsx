import ProductListScreen from "@/screens/ProductListScreen";
import { CompositeScreenProps } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { MainTabParamList, MainTabScreenProps } from "./MainTab";

export type ProductStackParamList = {
  ProductList: undefined;
};

export type ProductStackScreenProps<T extends keyof ProductStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProductStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

const Stack = createNativeStackNavigator<ProductStackParamList>();

export default function ProductStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductList" component={ProductListScreen} />
    </Stack.Navigator>
  );
}
