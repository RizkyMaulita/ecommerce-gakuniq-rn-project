import UnderConstruction from "@/components/UnderConstruction";
import { MainTabScreenProps } from "@/navigations/MainTab";
import { Text, View } from "react-native";

export default function NotifScreen({
  navigation,
}: MainTabScreenProps<"Notification">) {
  return (
    <View style={{ flex: 1 }}>
      <UnderConstruction />
    </View>
  );
}
