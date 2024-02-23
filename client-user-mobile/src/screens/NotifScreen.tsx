import { MainTabScreenProps } from "@/navigations/MainTab";
import { Text, View } from "react-native";

export default function NotifScreen({
  navigation,
}: MainTabScreenProps<"Notification">) {
  return (
    <View>
      <Text>Notif Screen</Text>
    </View>
  );
}
