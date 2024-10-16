import { OrderStackScreenProps } from "@/navigations/OrderStack";
import { utilities } from "@/styles/utilities";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useContext, useMemo } from "react";
import { renderPrice } from "@/lib/utils/renderPrice";
import ProductCartRow from "@/components/ProductCartRow";
import OrderPaymentDetailRow from "@/components/OrderPaymentDetailRow";
import { OrderContext } from "@/context/OrderContext";
import HeaderScreen from "@/components/HeaderScreen";
import AddressRow from "@/components/AddressRow";
import { useMutation } from "@apollo/client";
import { UPSERT_ORDER } from "@/lib/apollo/queries/order";
import {
  GET_PRODUCT_CART_COUNT,
  GET_PRODUCT_CARTS,
} from "@/lib/apollo/queries/product";
import { CartContext } from "@/context/CartContext";
import { omit } from "lodash";

export default function OrderCreateScreen({
  navigation,
  route,
}: OrderStackScreenProps<"OrderCreate">) {
  const { carts, totalProductPrice, quantity } = route.params;
  const { address, shippingPrice, shippingExpCode, shippingExpService } =
    useContext(OrderContext);
  const { getCartCount } = useContext(CartContext);
  const [onUpsertOrder, { error, loading }] = useMutation(UPSERT_ORDER, {
    onCompleted: () => {
      getCartCount();
      navigation.navigate("Transaction");
    },
    refetchQueries: [GET_PRODUCT_CARTS, GET_PRODUCT_CART_COUNT],
  });

  const totalPrice = useMemo(() => {
    return totalProductPrice + shippingPrice;
  }, [totalProductPrice, shippingPrice]);

  const goBack = () => navigation.goBack();

  const goAddressList = () => navigation.navigate("OrderAddressList");

  const onSubmit = useCallback(async () => {
    try {
      await onUpsertOrder({
        variables: {
          payload: {
            cartIds: carts.map((cart) => cart.id),
            address: omit(address, ["__typename"]),
            shippingExpCode,
            shippingExpService,
            shippingExpPrice: shippingPrice,
          },
        },
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: OrderCreateScreen.tsx:67 ~ onSubmit ~ error:",
        error
      );
    }
  }, [
    address,
    shippingPrice,
    shippingExpCode,
    shippingExpService,
    carts,
    quantity,
    totalPrice,
    totalProductPrice,
  ]);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <HeaderScreen title="Checkout" />

      {/* Main Content */}
      <View style={{ flex: 11.5 }}>
        <ScrollView style={{ flex: 1, paddingVertical: 10 }}>
          {/* Address */}
          <View style={{ backgroundColor: "#fff", padding: 15 }}>
            <TouchableOpacity onPress={goAddressList}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <Ionicons
                    name={"location-outline"}
                    color={utilities.color.primary}
                    size={utilities.iconSize.sm}
                  />
                  <Text>Shipping Address</Text>
                </View>

                <View style={{ flexDirection: "row", gap: 5 }}>
                  <Text>Choose</Text>
                  <Ionicons
                    name={"arrow-forward"}
                    color={utilities.color.primary}
                    size={utilities.iconSize.sm}
                  />
                </View>
              </View>
              <View style={{ marginLeft: utilities.iconSize.sm }}>
                {address ? (
                  <AddressRow
                    address={address}
                    hideTag
                    containerStyle={{ margin: 0, padding: 0 }}
                  />
                ) : (
                  <Text>
                    Please, choose your shipping address before checkout !
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* List Product */}
          <View style={{ margin: 10 }}>
            {carts.map((cart) => (
              <ProductCartRow
                key={cart.id}
                product={cart.product}
                quantity={cart.quantity}
              />
            ))}
          </View>

          {/* Payment Detail */}
          <View style={{ padding: 10, backgroundColor: "#fff" }}>
            <View style={{ flexDirection: "row", gap: 10, marginBottom: 15 }}>
              <Ionicons
                name={"receipt-outline"}
                color={utilities.color.primary}
                size={utilities.iconSize.sm}
              />
              <Text>Payment Details</Text>
            </View>
            <OrderPaymentDetailRow
              title="Total Product"
              value={`${quantity} pcs`}
            />
            <OrderPaymentDetailRow
              title="Courier Service"
              value={`${shippingExpCode} - ${shippingExpService}`}
            />
            <OrderPaymentDetailRow
              title="Subtotal Product Price"
              value={totalProductPrice}
              isPrice
            />
            <OrderPaymentDetailRow
              title="Subtotal Shipping Price"
              value={shippingPrice}
              isPrice
            />
            <OrderPaymentDetailRow
              title="Total Price"
              value={totalPrice}
              isPrice
              isHighlight
            />
          </View>
        </ScrollView>
      </View>

      {/* Bottom  */}
      <View style={styles.bottomContainer}>
        {error ? (
          <View style={{ maxWidth: "70%" }}>
            <Text>{error?.message || "Internal Server Error"}</Text>
          </View>
        ) : (
          <View>
            <Text style={{ marginBottom: 2, fontWeight: "300" }}>
              Total Payment
            </Text>
            <Text
              style={{ fontWeight: "700", fontSize: utilities.fontSize.md }}
            >
              {renderPrice(totalPrice)}
            </Text>
          </View>
        )}

        <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
          <TouchableOpacity onPress={goBack}>
            <View style={styles.btnCancel}>
              <Text>Cancel</Text>
            </View>
          </TouchableOpacity>
          {!error && (
            <TouchableOpacity onPress={onSubmit} disabled={!address || loading}>
              <View
                style={[
                  address ? styles.btnCheckout : styles.btnCheckoutDisable,
                ]}
              >
                {loading ? (
                  <ActivityIndicator color={"#fff"} />
                ) : (
                  <Text style={{ color: "#fff", fontWeight: "700" }}>
                    Create
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
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
    paddingHorizontal: 15,
    borderTopWidth: 0.2,
  },
  selectAllContainer: {
    flexDirection: "row",
    gap: 10,
    paddingLeft: 10,
    alignItems: "center",
  },
  btnCancel: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: utilities.fontColor.gray500,
    borderRadius: 10,
  },
  btnCheckout: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: utilities.color.primary,
    borderRadius: 10,
  },
  btnCheckoutDisable: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: utilities.color.lightRed,
    borderRadius: 10,
  },
});
