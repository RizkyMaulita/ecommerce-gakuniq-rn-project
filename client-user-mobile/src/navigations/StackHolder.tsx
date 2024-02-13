import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import AuthStack from "./AuthStack";
import MainTab from "./MainTab";

export default function StackHolder() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (!isLoggedIn) {
    return <AuthStack />;
  }

  return <MainTab />;
}
