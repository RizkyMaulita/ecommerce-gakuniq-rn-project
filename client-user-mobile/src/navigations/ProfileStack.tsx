import ProfileScreen from "@/screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type ProfileStackParamList = {
  MainProfile: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainProfile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
