import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import HeaderCartProduct from "./HeaderCartProduct";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProductStackScreenProps } from "@/navigations/ProductStack";

type Props = {
  isScroll: boolean;
};
export default function ProductDetailHeader({ isScroll }: Props) {
  const navigation =
    useNavigation<ProductStackScreenProps<"ProductDetail">["navigation"]>();

  return (
    <View
      style={[
        styles.headerIconContainer,
        {
          backgroundColor: isScroll ? "white" : "transparent",
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconContainer}
      >
        <AntDesign name="arrowleft" size={25} style={styles.icon} />
      </TouchableOpacity>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <HeaderCartProduct
          size={25}
          styleIcon={styles.icon}
          style={styles.iconContainer}
        />
        <TouchableOpacity style={styles.iconContainer}>
          {/* Todo: onPress for information */}
          <Ionicons
            name={"ellipsis-vertical-sharp"}
            size={25}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerIconContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    padding: 8,
    height: 55,
    zIndex: 3,
  },
  iconContainer: {
    backgroundColor: "white",
    borderRadius: 25,
  },
  icon: {
    width: 40,
    height: 40,
    textAlign: "center",
    paddingTop: 8,
    borderRadius: 20,
    color: "black",
  },
});
