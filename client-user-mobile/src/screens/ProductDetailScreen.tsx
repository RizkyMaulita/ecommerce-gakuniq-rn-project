import { ProductStackScreenProps } from "@/navigations/ProductStack";
import { Text, View } from "react-native";

export default function ProductDetailScreen({
  navigation,
  route,
}: ProductStackScreenProps<"ProductDetail">) {
  const { id } = route.params;

  return (
    <View>
      <Text>Product Detail Screen {id}</Text>
    </View>
  );
}
