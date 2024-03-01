import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { utilities } from "@/styles/utilities";
import { RootStackParamList, RootStackScreenProps } from "./RootStack";
import ProductListScreen from "@/screens/ProductListScreen";
import WishlistScreen from "@/screens/WishlistScreen";
import NotifScreen from "@/screens/NotifScreen";
import TransactionScreen from "@/screens/TransactionScreen";
import ProfileScreen from "@/screens/ProfileScreen";

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Notification: undefined;
  Transaction: undefined;
  Wishlist: undefined;
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
      <Tab.Screen name={"Home"} component={ProductListScreen} />
      <Tab.Screen name={"Wishlist"} component={WishlistScreen} />
      <Tab.Screen name={"Notification"} component={NotifScreen} />
      <Tab.Screen name={"Transaction"} component={TransactionScreen} />
      <Tab.Screen name={"Profile"} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
