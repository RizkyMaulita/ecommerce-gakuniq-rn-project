import { WishlistStackScreenProps } from "@/navigations/WishlistStack";
import { Text, View } from "react-native";

export default function WishlistScreen({
  navigation,
}: WishlistStackScreenProps<"MainWishlist">) {
  return (
    <View>
      <Text>Wishlist Screen</Text>
    </View>
  );
}
