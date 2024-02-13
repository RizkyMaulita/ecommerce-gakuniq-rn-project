import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import ProductStack, { ProductStackParamList } from "./ProductStack";
import ProfileStack, { ProfileStackParamList } from "./ProfileStack";
import NotifStack, { NotifStackParamList } from "./NotifStack";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { utilities } from "@/styles/utilities";
import TransactionStack, {
  TransactionStackParamList,
} from "./TransactionStack";
import WishlistStack, { WishlistStackParamList } from "./WishlistStack";
import { RootStackParamList, RootStackScreenProps } from "./RootStack";

export type MainTabParamList = {
  Home: NavigatorScreenParams<ProductStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
  Notification: NavigatorScreenParams<NotifStackParamList>;
  Transaction: NavigatorScreenParams<TransactionStackParamList>;
  Wishlist: NavigatorScreenParams<WishlistStackParamList>;
};

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName: string = "";
          const iconColor = focused
            ? utilities.color.primary
            : utilities.color.lightGray;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
            case "Notification":
              iconName = focused ? "mail-open-sharp" : "mail-outline";
              break;
            case "Transaction":
              iconName = focused ? "list" : "list-outline";
              break;
            case "Wishlist":
              iconName = focused ? "heart" : "heart-outline";
              break;
            default:
              break;
          }

          return (
            <Ionicons
              name={iconName as never}
              color={iconColor}
              size={utilities.iconSize.md}
            />
          );
        },
        tabBarActiveTintColor: utilities.color.primary,
        tabBarInactiveTintColor: utilities.color.lightGray,
      })}
    >
      <Tab.Screen name={"Home"} component={ProductStack} />
      <Tab.Screen name={"Wishlist"} component={WishlistStack} />
      <Tab.Screen name={"Notification"} component={NotifStack} />
      <Tab.Screen name={"Transaction"} component={TransactionStack} />
      <Tab.Screen name={"Profile"} component={ProfileStack} />
    </Tab.Navigator>
  );
}
