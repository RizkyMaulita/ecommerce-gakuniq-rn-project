import { utilities } from "@/styles/utilities";
import { Dimensions, StyleProp, View, ViewStyle } from "react-native";

const { width } = Dimensions.get("window");

type Props = {
  style?: StyleProp<ViewStyle>;
};

export default function Divider({ style = {} }: Props) {
  return (
    <View
      style={[
        {
          height: 8,
          width: width,
          backgroundColor: utilities.fontColor.gray300,
        },
        style,
      ]}
    ></View>
  );
}
