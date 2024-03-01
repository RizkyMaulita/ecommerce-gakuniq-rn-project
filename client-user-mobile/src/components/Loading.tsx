import { Image, ImageStyle, StyleProp, View, ViewStyle } from "react-native";

type Props = {
  isLoading: boolean;
  style?: StyleProp<ViewStyle>;
  styleImg?: StyleProp<ImageStyle>;
};

export default function Loading({
  isLoading,
  style = {},
  styleImg = {},
}: Props) {
  if (!isLoading) return <></>;

  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      <Image
        source={require("assets/loadingSpin.gif")}
        style={[{ width: 80, height: 80 }, styleImg]}
      />
    </View>
  );
}
