import { ProductStackScreenProps } from "@/navigations/ProductStack";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { utilities } from "@/styles/utilities";
import { useCallback, useContext, useMemo, useState } from "react";
import { CartContext } from "@/context/CartContext";
import EmptyCart from "@/components/EmptyCart";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_CARTS } from "@/lib/apollo/queries/product";
import { ProductCartType } from "@/lib/types/products.types";
import Loading from "@/components/Loading";
import ProductCartRow from "@/components/ProductCartRow";
import { renderPrice } from "@/lib/utils/renderPrice";

export default function ProductCartScreen({
  navigation,
  route,
}: ProductStackScreenProps<"ProductCart">) {
  const { count } = useContext(CartContext);
  const { data, loading, error } = useQuery(GET_PRODUCT_CARTS, {
    fetchPolicy: "no-cache",
  });
  const dataCarts: ProductCartType[] = data?.getCarts?.data || [];
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);

  const [selectedCarts, setSelectedCarts] = useState<ProductCartType[]>([]);

  const onSelectAll = () => {
    setIsSelectAll(!isSelectAll);
  };

  const onSelectCart = useCallback(
    (cart: ProductCartType) => {
      const findIndexCart = selectedCarts.findIndex(
        (val) => val.id === cart.id
      );
      if (findIndexCart === -1) {
        setSelectedCarts([...selectedCarts, cart]);
      } else {
        const currSelectedCarts = [...selectedCarts];
        currSelectedCarts.splice(findIndexCart, 1);
        setSelectedCarts(currSelectedCarts);
      }
    },
    [selectedCarts]
  );

  const total = useMemo(() => {
    const value = {
      price: 0,
      count: 0,
    };

    const result = selectedCarts.reduce((acc, curr) => {
      return {
        price: acc.price + (curr.product?.price || 0),
        count: acc.count + curr.quantity,
      };
    }, value);

    return result;
  }, [selectedCarts]);

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
        {loading ? <Loading isLoading /> : !count ? <EmptyCart /> : null}
        <FlatList
          data={dataCarts}
          renderItem={({ item }) => (
            <ProductCartRow
              cart={item}
              selectedCarts={selectedCarts}
              onSelect={onSelectCart}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Bottom */}
      <View
        style={{
          flex: 1.3,
          backgroundColor: "#fff",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          borderTopWidth: 0.2,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            paddingLeft: 10,
            alignItems: "center",
          }}
        >
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
          <TouchableOpacity>
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: utilities.color.primary,
                borderRadius: 10,
              }}
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
});
