import { NotifStackScreenProps } from "@/navigations/NotifStack";
import { Text, View } from "react-native";

export default function NotifScreen({
  navigation,
}: NotifStackScreenProps<"MainNotif">) {
  return (
    <View>
      <Text>Notif Screen</Text>
    </View>
  );
}
