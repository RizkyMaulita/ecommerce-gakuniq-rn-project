import ProductListScreen from "@/screens/ProductListScreen";
import { CompositeScreenProps } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { MainTabParamList, MainTabScreenProps } from "./MainTab";
import ProductDetailScreen from "@/screens/ProductDetailScreen";

export type ProductStackParamList = {
  ProductList: undefined;
  ProductDetail: { id: string };
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
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        initialParams={{ id: "" }}
      />
    </Stack.Navigator>
  );
}
