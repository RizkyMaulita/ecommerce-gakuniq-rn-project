import { utilities } from "@/styles/utilities";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  field: string;
  value: string;
};

export default function ProductDetailRow({ field, value }: Props) {
  return (
    <View style={styles.sectionDetailRow}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: utilities.fontColor.gray900 }}>{field}</Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionDetailRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 8,
    borderBottomColor: utilities.fontColor.gray400,
  },
});
