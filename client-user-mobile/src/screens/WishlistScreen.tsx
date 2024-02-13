import { WishlistStackParamList } from "@/navigations/WishlistStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

type Props = NativeStackScreenProps<WishlistStackParamList, "MainWishlist">;

export default function WishlistScreen({ navigation }: Props) {
  return (
    <View>
      <Text>Wishlist Screen</Text>
    </View>
  );
}
