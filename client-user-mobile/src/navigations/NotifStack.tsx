import NotifScreen from "@/screens/NotifScreen";
import { CompositeScreenProps } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { MainTabParamList, MainTabScreenProps } from "./MainTab";

export type NotifStackParamList = {
  MainNotif: undefined;
};

export type NotifStackScreenProps<T extends keyof NotifStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<NotifStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

const Stack = createNativeStackNavigator<NotifStackParamList>();

export default function NotifStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"MainNotif"} component={NotifScreen} />
    </Stack.Navigator>
  );
}
