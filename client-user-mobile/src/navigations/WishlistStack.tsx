import WishlistScreen from "@/screens/WishlistScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type WishlistStackParamList = {
  MainWishlist: undefined;
};

const Stack = createNativeStackNavigator<WishlistStackParamList>();

export default function WishlistStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"MainWishlist"} component={WishlistScreen} />
    </Stack.Navigator>
  );
}
