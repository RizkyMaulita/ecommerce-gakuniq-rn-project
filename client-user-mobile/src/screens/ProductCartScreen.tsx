import { ProductStackScreenProps } from "@/navigations/ProductStack";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { utilities } from "@/styles/utilities";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartContext } from "@/context/CartContext";
import EmptyCart from "@/components/EmptyCart";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCT_CARTS } from "@/lib/apollo/queries/product";
import { ProductCartType } from "@/lib/types/products.types";
import Loading from "@/components/Loading";
import ProductCartRowWithButton from "@/components/ProductCartRowWithButton";
import { renderPrice } from "@/lib/utils/renderPrice";
import { OrderContext } from "@/context/OrderContext";

export default function ProductCartScreen({
  navigation,
  route,
}: ProductStackScreenProps<"ProductCart">) {
  const { count, getCartCount } = useContext(CartContext);
  const { setCarts, setTotalProduct, setTotalProductPrice } =
    useContext(OrderContext);
  const [dataCarts, setDataCarts] = useState<ProductCartType[]>([]);
  const [dispatchCarts, { data, loading, error }] = useLazyQuery(
    GET_PRODUCT_CARTS,
    {
      fetchPolicy: "no-cache",
      onCompleted: (res) => {
        setDataCarts(res?.getCarts?.data || []);
      },
    }
  );
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);

  const [selectedCarts, setSelectedCarts] = useState<ProductCartType[]>([]);

  useEffect(() => {
    getCarts();
  }, []);

  const getCarts = async () => {
    try {
      await dispatchCarts();
      await getCartCount();
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectAll = useCallback(() => {
    const currIsSelected = !isSelectAll;
    const currSelectedCarts = currIsSelected ? dataCarts : [];
    setIsSelectAll(currIsSelected);
    setSelectedCarts(currSelectedCarts);
  }, [dataCarts, isSelectAll]);

  const onSelectCart = useCallback(
    (cart: ProductCartType) => {
      const findIndexCart = selectedCarts.findIndex(
        (val) => val.id === cart.id
      );
      if (findIndexCart === -1) {
        const currSelectedCarts = [...selectedCarts, cart];
        setSelectedCarts(currSelectedCarts);
        if (
          currSelectedCarts.length === dataCarts.length &&
          dataCarts.length != 0
        ) {
          setIsSelectAll(true);
        }
      } else {
        const currSelectedCarts = [...selectedCarts];
        currSelectedCarts.splice(findIndexCart, 1);
        setSelectedCarts(currSelectedCarts);
        setIsSelectAll(false);
      }
    },
    [selectedCarts, dataCarts]
  );

  const total = useMemo(() => {
    const value = {
      price: 0,
      count: 0,
    };

    const result = selectedCarts.reduce((acc, curr) => {
      const currTotalPrice = (curr.product?.price || 0) * curr.quantity;
      return {
        price: acc.price + currTotalPrice,
        count: acc.count + curr.quantity,
      };
    }, value);

    return result;
  }, [selectedCarts]);

  const onBuy = useCallback(() => {
    setCarts(selectedCarts);
    setTotalProduct(total.count);
    setTotalProductPrice(total.price);

    navigation.navigate("OrderStack", {
      screen: "OrderCreate",
      params: {
        carts: selectedCarts,
        totalProductPrice: total.price,
        quantity: total.count,
      },
    });
  }, [selectedCarts, total]);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name={"arrow-back"} size={25} />
            </TouchableOpacity>
            <Text style={{ fontSize: utilities.fontSize.lg - 3 }}>
              Keranjang Saya ( {count || 0} )
            </Text>
          </View>
          <View>
            <Ionicons name={"heart-outline"} size={25} />
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={{ flex: 11.5 }}>
        {loading && !dataCarts.length ? (
          <Loading isLoading />
        ) : !count ? (
          <EmptyCart />
        ) : null}
        <FlatList
          data={dataCarts}
          renderItem={({ item }) => (
            <ProductCartRowWithButton
              cart={item}
              selectedCarts={selectedCarts}
              onSelect={onSelectCart}
              getCarts={getCarts}
              setSelectedCarts={setSelectedCarts}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Bottom */}
      <View style={styles.bottomContainer}>
        <View style={styles.selectAllContainer}>
          <TouchableOpacity onPress={onSelectAll}>
            <Ionicons
              name={isSelectAll ? "checkbox-outline" : "square-outline"}
              size={24}
            />
          </TouchableOpacity>
          <Text>Semua</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 15 }}>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ marginBottom: 2 }}>Total</Text>
            <Text style={{ fontWeight: "700", fontSize: 15 }}>
              {renderPrice(total.price)}
            </Text>
          </View>
          <TouchableOpacity disabled={total.count === 0} onPress={onBuy}>
            <View
              style={[
                styles.btnCheckout,
                total.count === 0
                  ? { backgroundColor: utilities.color.secondary }
                  : {},
              ]}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>
                Beli ({total.count}){" "}
              </Text>
            </View>
          </TouchableOpacity>
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
  bottomContainer: {
    flex: 1.3,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderTopWidth: 0.2,
  },
  selectAllContainer: {
    flexDirection: "row",
    gap: 10,
    paddingLeft: 10,
    alignItems: "center",
  },
  btnCheckout: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: utilities.color.primary,
    borderRadius: 10,
  },
});
