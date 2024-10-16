import { CompositeScreenProps } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { MainTabParamList, MainTabScreenProps } from "./MainTab";
import { AuthStackParamList, AuthStackScreenProps } from "./AuthStack";
import OrderCreateScreen from "@/screens/OrderCreateScreen";
import { ProductCartType } from "@/lib/types/products.types";
import OrderAddressListScreen from "@/screens/OrderAddressListScreen";
import OrderAddressCreateScreen from "@/screens/OrderAddressCreateScreen";

type OrderCreateType = {
  carts: ProductCartType[];
  totalProductPrice: number;
  quantity: number;
};
export type OrderStackParamList = {
  OrderCreate: OrderCreateType;
  OrderAddressList: undefined;
  OrderAddressCreate: undefined;
};

export type OrderStackScreenProps<T extends keyof OrderStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<OrderStackParamList, T>,
    CompositeScreenProps<
      MainTabScreenProps<keyof MainTabParamList>,
      AuthStackScreenProps<keyof AuthStackParamList>
    >
  >;

const Stack = createNativeStackNavigator<OrderStackParamList>();

export default function OrderStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="OrderCreate"
        component={OrderCreateScreen}
        initialParams={{ carts: [], totalProductPrice: 0, quantity: 0 }}
      />
      <Stack.Screen
        name="OrderAddressList"
        component={OrderAddressListScreen}
      />
      <Stack.Screen
        name="OrderAddressCreate"
        component={OrderAddressCreateScreen}
      />
    </Stack.Navigator>
  );
}
