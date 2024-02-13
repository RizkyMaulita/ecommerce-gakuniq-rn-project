import { globalStyle } from "@/styles/global";
import { Text } from "react-native";

interface LogoProps {
  size?: string;
}

export default function Logo({ size }: LogoProps) {
  return (
    <Text style={size === "sm" ? globalStyle.logoSm : globalStyle.logo}>
      GAKUNIQ
    </Text>
  );
}
