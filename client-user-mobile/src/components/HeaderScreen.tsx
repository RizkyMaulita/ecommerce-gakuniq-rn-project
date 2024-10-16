import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { utilities } from "@/styles/utilities";

type Props = {
  title: string;
};

export default function HeaderScreen({ title }: Props) {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity onPress={goBack}>
            <Ionicons name={"arrow-back"} size={25} />
          </TouchableOpacity>
          <Text style={{ fontSize: utilities.fontSize.lg - 3 }}>{title}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 10,
  },
});
