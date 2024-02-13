import NotifScreen from "@/screens/NotifScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type NotifStackParamList = {
  MainNotif: undefined;
};

const Stack = createNativeStackNavigator<NotifStackParamList>();

export default function NotifStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"MainNotif"} component={NotifScreen} />
    </Stack.Navigator>
  );
}
