import { utilities } from "@/styles/utilities";
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { renderPrice } from "@/lib/utils/renderPrice";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/lib/apollo/queries/category";
import { CategoryType } from "@/lib/types/products.types";

const { height } = Dimensions.get("screen");

type Props = {
  selectedCategoryId: string;
  setSelectedCategoryId: (categoryId: string) => void;
};

export default function ProductListHeader({
  selectedCategoryId,
  setSelectedCategoryId,
}: Props) {
  const { data } = useQuery(GET_CATEGORIES);
  const categories: CategoryType[] = data?.getCategories?.data || [];

  return (
    <View style={styles.container}>
      <View style={styles.accountInfoContainer}>
        <TouchableOpacity style={styles.accountInfoBox}>
          <Ionicons name={"wallet-outline"} size={utilities.iconSize.md} />
          <View>
            <Text style={styles.accountInfoTitle}>{renderPrice(175e3)}</Text>
            <Text style={styles.accountInfoSubTitle}>Isi Saldo</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.accountInfoDivider}></View>
        <TouchableOpacity style={styles.accountInfoBox}>
          <MaterialCommunityIcons
            name={"star-circle-outline"}
            size={utilities.iconSize.md}
          />
          <View>
            <Text style={styles.accountInfoTitle}>{"Silver"}</Text>
            <Text style={styles.accountInfoSubTitle}>{"5"} Voucher</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bannerContainer}>
        <Image source={require("assets/banner.png")} style={styles.bannerImg} />
      </View>
      <View style={{ alignItems: "center" }}>
        <FlatList
          data={[{ id: "", name: "ALL" }, ...categories]}
          renderItem={({ item }) => {
            const isActive = item.id === selectedCategoryId;
            let sourceImg: ImageSourcePropType = require("assets/tshirt.png");

            if (item.name === "ALL") {
              if (isActive) {
                sourceImg = require("assets/uniform_active.png");
              } else {
                sourceImg = require("assets/uniform.png");
              }
            } else if (isActive && item.imgUrlActive) {
              sourceImg = { uri: item.imgUrlActive };
            } else if (item.imgUrl) {
              sourceImg = { uri: item.imgUrl };
            } else if (isActive) {
              sourceImg = require("assets/tshirt_active.png");
            }

            return (
              <TouchableOpacity onPress={() => setSelectedCategoryId(item.id)}>
                <View
                  style={[
                    styles.categoryIconContainer,
                    isActive
                      ? { backgroundColor: utilities.color.secondary }
                      : {},
                  ]}
                >
                  <Image source={sourceImg} style={styles.categoryIconImg} />
                  <Text
                    style={[
                      styles.categoryIconTitle,
                      isActive ? { color: "#fff" } : {},
                    ]}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          horizontal
          keyExtractor={(item, index) =>
            `category_icon_${item.id ? item.id : index}`
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 7,
  },
  accountInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
  },
  accountInfoBox: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  accountInfoTitle: {
    fontWeight: "600",
  },
  accountInfoSubTitle: {
    color: utilities.fontColor.gray700,
    fontSize: utilities.fontSize.sm - 2,
  },
  accountInfoDivider: {
    borderWidth: 0.5,
    borderColor: utilities.fontColor.gray600,
  },
  bannerContainer: {
    alignItems: "center",
  },
  bannerImg: {
    width: "95%",
    height: height / 7,
    resizeMode: "stretch",
  },
  categoryIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 0.5,
    padding: 5,
    margin: 10,
    minHeight: utilities.iconSize.lg * 2.3,
    minWidth: utilities.iconSize.lg * 2.3,
    borderRadius: 8,
  },
  categoryIconImg: {
    width: utilities.iconSize.lg,
    height: utilities.iconSize.lg,
  },
  categoryIconTitle: {
    fontSize: utilities.fontSize.xs + 1,
    fontWeight: "600",
  },
});
