import { MainTabScreenProps } from "@/navigations/MainTab";
import { Text, View } from "react-native";

export default function TransactionScreen({
  navigation,
}: MainTabScreenProps<"Transaction">) {
  return (
    <View>
      <Text>Transaction Screen</Text>
    </View>
  );
}
