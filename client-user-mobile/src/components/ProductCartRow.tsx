import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { renderPrice } from "@/lib/utils/renderPrice";
import { ProductCartType } from "@/lib/types/products.types";
import { useMemo } from "react";

type Props = {
  cart: ProductCartType;
  selectedCarts: ProductCartType[];
  onSelect: (cart: ProductCartType) => void;
};

export default function ProductCartRow({
  cart,
  selectedCarts,
  onSelect,
}: Props) {
  const isSelected = useMemo(() => {
    const findCart = selectedCarts.find((val) => val.id === cart.id);

    return findCart ? true : false;
  }, [cart, selectedCarts]);

  return (
    <View
      style={{
        margin: 10,
        minHeight: 100,
        backgroundColor: "#fff",
        flexDirection: "row",
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => onSelect(cart)}>
          <Ionicons
            name={isSelected ? "checkbox-outline" : "square-outline"}
            size={24}
          />
        </TouchableOpacity>
        <Image
          source={{ uri: cart.product?.imgUrl }}
          style={{ width: 90, height: 90 }}
        />
      </View>
      <View style={{ flex: 2, padding: 10 }}>
        <Text numberOfLines={2}>{cart.product?.name || "-"}</Text>
        <Text style={{ fontWeight: "600", marginVertical: 10 }}>
          {renderPrice(cart.product?.price)}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderWidth: 0.5,
              }}
            >
              <Text>-</Text>
            </TouchableOpacity>
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                // borderWidth: 0.5,
              }}
            >
              <Text>{cart.quantity}</Text>
            </View>
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderWidth: 0.5,
              }}
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Ionicons name={"trash-outline"} size={24} />
          </View>
        </View>
      </View>
    </View>
  );
}
