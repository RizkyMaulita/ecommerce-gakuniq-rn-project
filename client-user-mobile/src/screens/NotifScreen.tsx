import { NotifStackParamList } from "@/navigations/NotifStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

type Props = NativeStackScreenProps<NotifStackParamList, "MainNotif">;

export default function NotifScreen({ navigation }: Props) {
  return (
    <View>
      <Text>Notif Screen</Text>
    </View>
  );
}
