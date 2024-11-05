import { utilities } from "@/styles/utilities";
import { Dimensions, Image, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function UnderConstruction() {
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
        source={require("assets/underConstruction.png")}
        style={{
          width: width * 0.8,
          resizeMode: "center",
          height: width * 0.5,
        }}
      />
      <Text
        style={{
          fontSize: utilities.fontSize.lg + 2,
          fontWeight: "500",
        }}
      >
        Under Constructions
      </Text>
    </View>
  );
}
