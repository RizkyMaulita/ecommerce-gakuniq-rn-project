import { TransactionStackParamList } from "@/navigations/TransactionStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

type Props = NativeStackScreenProps<
  TransactionStackParamList,
  "MainTransaction"
>;

export default function TransactionScreen({ navigation }: Props) {
  return (
    <View>
      <Text>Transaction Screen</Text>
    </View>
  );
}
