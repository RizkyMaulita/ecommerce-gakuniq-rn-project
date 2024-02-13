import { TransactionStackScreenProps } from "@/navigations/TransactionStack";
import { Text, View } from "react-native";

export default function TransactionScreen({
  navigation,
}: TransactionStackScreenProps<"MainTransaction">) {
  return (
    <View>
      <Text>Transaction Screen</Text>
    </View>
  );
}
