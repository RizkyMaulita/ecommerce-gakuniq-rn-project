import { CompositeScreenProps } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { MainTabParamList, MainTabScreenProps } from "./MainTab";
import { AuthStackParamList, AuthStackScreenProps } from "./AuthStack";
import ProductDetailScreen from "@/screens/ProductDetailScreen";

export type ProductStackParamList = {
  ProductDetail: { id: string };
};

export type ProductStackScreenProps<T extends keyof ProductStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProductStackParamList, T>,
    CompositeScreenProps<
      MainTabScreenProps<keyof MainTabParamList>,
      AuthStackScreenProps<keyof AuthStackParamList>
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
    </Stack.Navigator>
  );
}
