import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { renderPrice } from "@/lib/utils/renderPrice";
import { ProductCartType } from "@/lib/types/products.types";
import { useCallback, useContext, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  DELETE_PRODUCT_CART,
  UPDATE_QTY_PRODUCT_CART,
} from "@/lib/apollo/mutations/product";
import { utilities } from "@/styles/utilities";
import { CartContext } from "@/context/CartContext";

type Props = {
  cart: ProductCartType;
  selectedCarts: ProductCartType[];
  onSelect: (cart: ProductCartType) => void;
  getCarts: () => Promise<void>;
  setSelectedCarts: (carts: ProductCartType[]) => void;
};

export default function ProductCartRowWithButton({
  cart,
  selectedCarts,
  onSelect,
  getCarts,
  setSelectedCarts,
}: Props) {
  const { getCartCount } = useContext(CartContext);
  const [dispatchUpdateQtyCart, { loading: loadingUpdateCart }] = useMutation(
    UPDATE_QTY_PRODUCT_CART,
    {
      onCompleted: async () => {
        await getCarts();
        await getCartCount();
      },
    }
  );
  const [dispatchDeleteCart, { loading: loadingDeleteCart }] = useMutation(
    DELETE_PRODUCT_CART,
    {
      onCompleted: async () => {
        await getCarts();
        await getCartCount();
      },
    }
  );

  const isSelected = useMemo(() => {
    const findCart = selectedCarts.find((val) => val.id === cart.id);

    return findCart ? true : false;
  }, [cart, selectedCarts]);

  const onUpdateQty = useCallback(
    (isDecrase?: boolean) => () => {
      (async function () {
        const qty = isDecrase ? cart.quantity - 1 : cart.quantity + 1;
        try {
          await dispatchUpdateQtyCart({
            variables: {
              id: cart.id,
              qty,
            },
          });
          if (isSelected) {
            const currSelectedCarts = qty
              ? selectedCarts.map((val) => {
                  if (val.id === cart.id) {
                    return {
                      ...val,
                      quantity: qty,
                    };
                  }
                  return val;
                })
              : selectedCarts.filter((val) => val.id !== cart.id);
            setSelectedCarts(currSelectedCarts);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    },
    [cart, isSelected, selectedCarts]
  );

  const onDeleteCart = useCallback(() => {
    (async function () {
      try {
        await dispatchDeleteCart({
          variables: {
            id: cart.id,
          },
        });
        if (isSelected) {
          const currSelectedCarts = selectedCarts.filter(
            (val) => val.id !== cart.id
          );
          setSelectedCarts(currSelectedCarts);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [cart, isSelected, selectedCarts]);

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
              onPress={onUpdateQty(true)}
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
              onPress={onUpdateQty()}
            >
              <Text>+</Text>
            </TouchableOpacity>
            {(loadingDeleteCart || loadingUpdateCart) && (
              <ActivityIndicator
                color={utilities.color.primary}
                size={24}
                style={{ marginLeft: 10 }}
              />
            )}
          </View>
          <View>
            <TouchableOpacity onPress={onDeleteCart}>
              <Ionicons name={"trash-outline"} size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
