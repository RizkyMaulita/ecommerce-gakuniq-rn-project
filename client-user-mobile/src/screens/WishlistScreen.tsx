import { MainTabScreenProps } from "@/navigations/MainTab";
import { Text, View } from "react-native";

export default function WishlistScreen({
  navigation,
}: MainTabScreenProps<"Wishlist">) {
  return (
    <View>
      <Text>Wishlist Screen</Text>
    </View>
  );
}
