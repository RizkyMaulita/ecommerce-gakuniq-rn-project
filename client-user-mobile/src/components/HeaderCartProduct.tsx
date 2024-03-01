import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import IconBadge, { IconBadgeProps } from "./IconBadge";
import { useNavigation } from "@react-navigation/native";
import { RootStackScreenProps } from "@/navigations/RootStack";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

type Props = {
  style?: StyleProp<ViewStyle>;
} & Omit<IconBadgeProps, "name" | "badgeValue">;

export default function HeaderCartProduct({ style = {}, ...props }: Props) {
  const navigation =
    useNavigation<RootStackScreenProps<"MainTab">["navigation"]>();
  const { count } = useContext(CartContext);

  const goCart = () => {
    navigation.navigate("ProductStack", {
      screen: "ProductCart",
    });
  };

  return (
    <TouchableOpacity style={style} onPress={goCart}>
      <IconBadge name={"cart-outline"} badgeValue={count} {...props} />
    </TouchableOpacity>
  );
}
