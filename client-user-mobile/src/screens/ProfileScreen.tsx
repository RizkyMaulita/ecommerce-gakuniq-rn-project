import { ProfileStackParamList } from "@/navigations/ProfileStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

type Props = NativeStackScreenProps<ProfileStackParamList, "MainProfile">;

export default function ProfileScreen({ navigation }: Props) {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}
