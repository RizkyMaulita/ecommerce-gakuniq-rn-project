import { renderPrice } from "@/lib/utils/renderPrice";
import { ProductStackScreenProps } from "@/navigations/ProductStack";
import { utilities } from "@/styles/utilities";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_PRODUCT,
  GET_PRODUCT_CARTS,
  GET_PRODUCT_CART_COUNT,
} from "@/lib/apollo/queries/product";
import Loading from "@/components/Loading";
import { ProductReviewType, ProductType } from "@/lib/types/products.types";
import Divider from "@/components/Divider";
import HeaderCartProduct from "@/components/HeaderCartProduct";
import { useCallback, useContext, useMemo, useState } from "react";
import ProductDetailRow from "@/components/ProductDetailRow";
import ProductDetailHeader from "@/components/ProductDetailHeader";
import useToggle from "@/hooks/useToggle";
import { dataProductReviews } from "@/lib/data";
import calculateRate from "@/lib/utils/calculateRate";
import ProductDetailReviewListModal from "@/components/ProductDetailReviewModal";
import { globalStyle } from "@/styles/global";
import { ADD_PRODUCT_CART } from "@/lib/apollo/mutations/product";
import { CartContext } from "@/context/CartContext";

const { width, height } = Dimensions.get("window");
export default function ProductDetailScreen({
  navigation,
  route,
}: ProductStackScreenProps<"ProductDetail">) {
  const { id } = route.params;
  const [isScroll, setIsScroll] = useState(false);
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      productId: id,
    },
  });
  const product: ProductType = data?.getProduct?.data || {};
  const {
    show: isWishlist,
    handleShow: addWishlist,
    handleClose: removeWishlist,
  } = useToggle();
  const {
    show: showReview,
    handleShow: onShowReview,
    handleClose: onCloseReview,
  } = useToggle();
  const { getCartCount } = useContext(CartContext);
  const [
    dispatchCartProduct,
    { loading: loadingMutateCart, error: errorMutateCart },
  ] = useMutation(ADD_PRODUCT_CART, {
    onCompleted: async () => {
      await getCartCount();
    },
    // refetchQueries: [GET_PRODUCT_CART_COUNT, GET_PRODUCT_CARTS],
  });

  const rate = calculateRate<ProductReviewType>({
    listData: dataProductReviews,
    keyRate: "rate",
  });

  const onToggleWishlist = () => {
    if (isWishlist) {
      removeWishlist();
    } else {
      addWishlist();
    }
  };

  const addCartProduct = useCallback(async () => {
    try {
      await dispatchCartProduct({
        variables: {
          productId: product.id,
        },
      });
    } catch (err) {
      console.log(err, "<<< error while add cart product");
    }
  }, [product]);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ProductDetailHeader isScroll={isScroll} />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Loading isLoading />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* --- Header Icon --- */}
      <ProductDetailHeader isScroll={isScroll} />
      <ScrollView
        style={{ marginTop: -55 }}
        onScrollEndDrag={(e) => {
          setIsScroll(
            e.nativeEvent.targetContentOffset?.y === 0 ? false : true
          );
        }}
        scrollEventThrottle={100}
      >
        <View style={{ alignItems: "center", backgroundColor: "#fff" }}>
          <ImageBackground
            source={{
              uri: product?.imgUrl,
            }}
            style={{
              height: 375,
              width: 375,
            }}
            resizeMode={"cover"}
          ></ImageBackground>
        </View>

        <View style={styles.contentContainer}>
          {/* --- Section Title --- */}
          <View style={{ padding: 16, paddingBottom: 10 }}>
            <Text style={styles.sectionTitle}>{product?.name}</Text>
            <View style={styles.subHeading}>
              <Text style={styles.sectionPrice}>
                {renderPrice(product?.price)}
              </Text>
            </View>
            <View style={styles.sectionBottomTitle}>
              <TouchableOpacity
                style={styles.sectionReviewContainer}
                onPress={onShowReview}
              >
                <AntDesign
                  name={"star"}
                  size={utilities.iconSize.sm}
                  style={{ color: "orange" }}
                />
                <View style={styles.sectionReviewRate}>
                  <Text style={styles.reviewText}>{rate} / 5</Text>
                </View>
                <Text style={[styles.reviewText, { borderRightWidth: 2 }]}>
                  {dataProductReviews.length} Terjual
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onToggleWishlist}
                style={{ marginRight: 8 }}
              >
                <AntDesign
                  name={isWishlist ? "heart" : "hearto"}
                  size={utilities.iconSize.md}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Divider />

          {/* --- Section Detail --- */}
          <View style={{ padding: 16 }}>
            <Text style={styles.sectionDetailHeading}>Detail Produk</Text>
            <ProductDetailRow field="Kondisi" value="Baru" />
            <ProductDetailRow field="Min. Pemesanan" value="1 Buah" />
            <ProductDetailRow
              field="Category"
              value={product?.category?.name || "-"}
            />
            <ProductDetailRow field="Type" value={product?.gender || "-"} />

            <Text
              style={[
                styles.sectionDetailHeading,
                { marginBottom: 8, marginTop: 16 },
              ]}
            >
              Deskripsi Produk
            </Text>
            <Text style={styles.description}>{product.description || "-"}</Text>
            {/* <View style={{ height: 300, backgroundColor: "grey" }}></View> */}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 16,
          backgroundColor: "#fff",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={[
            globalStyle.primaryButton,
            {
              width: "49%",
              backgroundColor: "#fff",
              borderColor: utilities.color.primary,
              borderWidth: 1,
            },
          ]}
        >
          <Text
            style={[
              globalStyle.textButton,
              { color: utilities.color.primary, fontWeight: "800" },
            ]}
          >
            Beli Langsung
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyle.primaryButton, { width: "49%" }]}
          onPress={addCartProduct}
        >
          <Text style={[globalStyle.textButton, { fontWeight: "800" }]}>
            + Keranjang
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <ProductDetailReviewListModal
        showModal={showReview}
        onClose={onCloseReview}
        data={dataProductReviews}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    zIndex: 2,
    elevation: 2,
    marginBottom: 10,
    borderRadius: 16,
    backgroundColor: "white",
    shadowColor: "white",
    flex: 1,
  },
  sectionTitle: {
    fontSize: utilities.fontSize.md + 2,
    marginBottom: 8,
  },
  sectionPrice: {
    fontSize: utilities.fontSize.lg,
    fontWeight: "700",
  },
  subHeading: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    color: utilities.fontColor.gray700,
    lineHeight: 18,
    textAlign: "justify",
    marginBottom: 16,
  },
  sectionDetailHeading: {
    fontSize: utilities.fontSize.md,
    fontWeight: "500",
    marginBottom: 5,
  },
  sectionBottomTitle: {
    marginTop: utilities.margin.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  sectionReviewContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  sectionReviewRate: {
    paddingRight: 8,
    borderRightWidth: 0.5,
    borderColor: utilities.fontColor.gray800,
  },
  reviewText: {
    fontSize: utilities.fontSize.sm,
  },
});
