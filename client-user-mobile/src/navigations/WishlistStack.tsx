import WishlistScreen from "@/screens/WishlistScreen";
import { CompositeScreenProps } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { MainTabParamList, MainTabScreenProps } from "./MainTab";

export type WishlistStackParamList = {
  MainWishlist: undefined;
};

export type WishlistStackScreenProps<T extends keyof WishlistStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<WishlistStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

const Stack = createNativeStackNavigator<WishlistStackParamList>();

export default function WishlistStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"MainWishlist"} component={WishlistScreen} />
    </Stack.Navigator>
  );
}
