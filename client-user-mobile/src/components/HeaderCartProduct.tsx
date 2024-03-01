import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import IconBadge, { IconBadgeProps } from "./IconBadge";

type Props = {
  style?: StyleProp<ViewStyle>;
} & Omit<IconBadgeProps, "name" | "badgeValue">;

export default function HeaderCartProduct({ style = {}, ...props }: Props) {
  return (
    <TouchableOpacity style={style}>
      <IconBadge name={"cart-outline"} badgeValue={100} {...props} />
    </TouchableOpacity>
  );
}
