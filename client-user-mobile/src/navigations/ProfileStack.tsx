import ProfileScreen from "@/screens/ProfileScreen";
import { CompositeScreenProps } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { MainTabParamList, MainTabScreenProps } from "./MainTab";
import { AuthStackParamList, AuthStackScreenProps } from "./AuthStack";

export type ProfileStackParamList = {
  MainProfile: undefined;
};

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProfileStackParamList, T>,
    CompositeScreenProps<
      MainTabScreenProps<keyof MainTabParamList>,
      AuthStackScreenProps<keyof AuthStackParamList>
    >
  >;

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainProfile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
