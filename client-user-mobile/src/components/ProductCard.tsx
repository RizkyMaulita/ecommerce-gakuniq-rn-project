import { ProductType } from "@/lib/types/products.types";
import { renderPrice } from "@/lib/utils/renderPrice";
import { utilities } from "@/styles/utilities";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height } = Dimensions.get("screen");

type Props = {
  product: ProductType;
  lastIndex?: boolean;
  isOdd?: boolean;
  onNavigate: (productId: string) => void;
};

export default function ProductCard({
  product,
  lastIndex,
  isOdd,
  onNavigate,
}: Props) {
  return (
    <View
      style={[
        styles.card,
        isOdd ? styles.cardRight : styles.cardLeft,
        lastIndex ? styles.cardEnd : {},
      ]}
    >
      <TouchableOpacity
        style={[{ flex: 1, height: "100%" }]}
        onPress={() => onNavigate(product.id)}
      >
        <View style={[styles.imageContainer]}>
          <Image source={{ uri: product.imgUrl }} style={styles.image} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentHeader}>
            <View style={styles.contentCategoryContainer}>
              <Text style={styles.contentCategoryText}>
                {product.category?.name}
              </Text>
            </View>
            <View style={styles.contentTypeContainer}>
              <Text style={styles.contentTypeText}>{product.gender}</Text>
            </View>
          </View>
          <View style={styles.contentBody}>
            <Text style={styles.contentTitle} numberOfLines={2}>
              {product.name}
            </Text>
            <Text style={styles.price}>{renderPrice(product?.price)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 0.5,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: utilities.color.extraLightGray,
    flex: 1,
    height: height / 3.2,
    maxWidth: "100%",
  },
  cardLeft: {
    marginLeft: 10,
    marginRight: 5,
  },
  cardRight: {
    marginRight: 10,
    marginLeft: 5,
  },
  cardEnd: {
    maxWidth: "46.5%",
  },
  imageContainer: {
    flex: 2.5,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  contentContainer: {
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 2,
  },
  contentCategoryContainer: {
    backgroundColor: utilities.color.secondary,
    padding: 4,
    borderRadius: 4,
  },
  contentCategoryText: {
    fontSize: utilities.fontSize.xs - 3,
    color: "#fff",
    fontWeight: "600",
  },
  contentTypeContainer: {
    backgroundColor: utilities.fontColor.gray400,
    padding: 4,
    borderRadius: 4,
  },
  contentTypeText: {
    fontSize: utilities.fontSize.xs - 3,
  },
  contentBody: {
    paddingHorizontal: 2,
    paddingVertical: 5,
  },
  contentTitle: {
    fontSize: utilities.fontSize.sm,
    fontWeight: "500",
    marginBottom: 5,
  },
  price: {
    fontSize: utilities.fontSize.xs,
  },
});
