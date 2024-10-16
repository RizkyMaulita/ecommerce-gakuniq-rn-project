import { CompositeScreenProps } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { MainTabParamList, MainTabScreenProps } from "./MainTab";
import ProductDetailScreen from "@/screens/ProductDetailScreen";
import ProductCartScreen from "@/screens/ProductCartScreen";
import { OrderStackParamList, OrderStackScreenProps } from "./OrderStack";

export type ProductStackParamList = {
  ProductDetail: { id: string };
  ProductCart: undefined;
};

export type ProductStackScreenProps<T extends keyof ProductStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProductStackParamList, T>,
    CompositeScreenProps<
      MainTabScreenProps<keyof MainTabParamList>,
      OrderStackScreenProps<keyof OrderStackParamList>
    >
  >;

const Stack = createNativeStackNavigator<ProductStackParamList>();

export default function ProductStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        initialParams={{ id: "" }}
      />
      <Stack.Screen name="ProductCart" component={ProductCartScreen} />
    </Stack.Navigator>
  );
}
