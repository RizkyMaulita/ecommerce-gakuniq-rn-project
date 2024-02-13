import { ProductStackParamList } from "@/navigations/ProductStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

type Props = NativeStackScreenProps<ProductStackParamList, "ProductList">;

export default function ProductListScreen({ navigation, route }: Props) {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}
