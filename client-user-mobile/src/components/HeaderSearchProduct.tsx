import { utilities } from "@/styles/utilities";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import IconBadge from "./IconBadge";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderSearchProduct() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchContainer}>
        <Ionicons
          name={"search-outline"}
          color={utilities.fontColor.gray700}
          size={utilities.iconSize.sm}
        />
        <TextInput
          placeholder={"Cari apa hari ini ?"}
          style={{ fontSize: utilities.fontSize.md }}
          // Todo: onFocus => navigate to search products screen
        />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <IconBadge name={"cart-outline"} badgeValue={100} />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconBadge
            name={"chatbubble-ellipses-outline"}
            badgeValue={0}
            size={utilities.iconSize.lg - 3}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  searchContainer: {
    flexDirection: "row",
    width: "77%",
    borderColor: utilities.color.lightGray,
    borderWidth: 1,
    borderRadius: 10,
    padding: utilities.padding.sm,
    gap: 8,
  },
  iconContainer: {
    width: "22%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
