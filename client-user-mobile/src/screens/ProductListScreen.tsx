import { ProductStackScreenProps } from "@/navigations/ProductStack";
import { Text, View } from "react-native";

export default function ProductListScreen({
  navigation,
}: ProductStackScreenProps<"ProductList">) {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}
