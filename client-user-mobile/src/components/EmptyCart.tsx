import { utilities } from "@/styles/utilities";
import { Dimensions, Image, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function EmptyCart() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        gap: 50,
      }}
    >
      <Image
        source={require("assets/emptyCart.png")}
        style={{
          width: width * 0.8,
          resizeMode: "stretch",
          height: width * 0.7,
        }}
      />
      <Text
        style={{
          fontSize: utilities.fontSize.lg + 2,
          fontWeight: "500",
        }}
      >
        Keranjang Kosong
      </Text>
    </View>
  );
}
