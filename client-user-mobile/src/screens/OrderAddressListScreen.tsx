import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { utilities } from "@/styles/utilities";
import { OrderStackScreenProps } from "@/navigations/OrderStack";
import HeaderScreen from "@/components/HeaderScreen";
import { useQuery } from "@apollo/client";
import { GET_MY_LIST_ADDRESS } from "@/lib/apollo/queries/user";
import { UserAddressType } from "@/lib/types/users.types";
import Loading from "@/components/Loading";
import ErrorServer from "@/components/Error";
import { useCallback, useContext } from "react";
import { OrderContext } from "@/context/OrderContext";
import AddressRow from "@/components/AddressRow";

export default function OrderAddressListScreen({
  navigation,
  route,
}: OrderStackScreenProps<"OrderAddressList">) {
  const { address, setAddress, carts, totalProduct, totalProductPrice } =
    useContext(OrderContext);
  const { data, loading, error } = useQuery(GET_MY_LIST_ADDRESS);
  const dataAddress = (data?.getMyListAddress?.data || []) as UserAddressType[];

  const onSelectAddress = useCallback(
    (value: UserAddressType) => () => {
      setAddress?.(value);
      navigation.navigate("OrderCreate", {
        carts,
        totalProductPrice,
        quantity: totalProduct,
      });
    },
    [carts, totalProduct, totalProductPrice]
  );

  return (
    <View style={{ flex: 1 }}>
      <HeaderScreen title="Choose Address" />

      <View style={{ flex: 12, marginTop: 10 }}>
        {loading ? (
          <Loading isLoading />
        ) : error ? (
          <ErrorServer errorMsg={error.message} />
        ) : (
          <FlatList
            data={dataAddress}
            keyExtractor={(_, index) =>
              `orderlistaddress_${index}_${Math.random()}`
            }
            renderItem={({ item }) => (
              <AddressRow
                address={item}
                withCheckbox
                selectedAddress={address}
                onSelect={onSelectAddress}
              />
            )}
          />
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate("OrderAddressCreate")}
        >
          <View style={styles.btnCreateAddress}>
            <Ionicons
              name={"add-circle-outline"}
              color={utilities.color.primary}
              size={utilities.iconSize.md}
            />
            <Text>Add New Address</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnCreateAddress: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addressTag: {
    padding: 5,
    borderWidth: 1,
    borderColor: utilities.color.primary,
    borderRadius: 5,
  },
});
