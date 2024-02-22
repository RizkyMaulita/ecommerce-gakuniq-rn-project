import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { utilities } from "@/styles/utilities";
import { useMemo } from "react";

type IconBadgeProps = {
  type?: "Ionicons" | "MaterialIcons";
  name: string;
  badgeValue: number;
  color?: string;
  size?: number;
  styleContainerBadge?: StyleProp<ViewStyle>;
  styleBadge?: StyleProp<TextStyle>;
};

export default function IconBadge({
  type = "Ionicons",
  name,
  badgeValue,
  color = utilities.color.extraLightGray,
  size = utilities.iconSize.lg,
  styleContainerBadge = {},
  styleBadge = {},
}: IconBadgeProps) {
  const Icon = useMemo(() => {
    switch (type) {
      case "Ionicons":
        return <Ionicons name={name as never} color={color} size={size} />;
      case "MaterialIcons":
        return <MaterialIcons name={name as never} color={color} size={size} />;
      default:
        return <></>;
    }
  }, [type, size, color]);

  return (
    <View>
      {Icon}
      {Number(badgeValue) ? (
        <View style={[styles.badgeContainer, styleContainerBadge]}>
          <Text style={[styles.badgeValue, styleBadge]}>
            {Number(badgeValue) >= 100 ? "99+" : badgeValue}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    position: "absolute",
    right: -9,
    top: -8,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeValue: {
    fontSize: utilities.fontSize.xs,
    color: "#fff",
    fontWeight: "700",
  },
});
