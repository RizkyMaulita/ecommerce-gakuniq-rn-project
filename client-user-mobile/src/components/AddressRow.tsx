import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserAddressType } from "@/lib/types/users.types";
import { utilities } from "@/styles/utilities";
import { useMemo } from "react";

type Props = {
  address: UserAddressType;
  withCheckbox?: boolean;
  selectedAddress?: UserAddressType;
  onSelect?: (address: UserAddressType) => () => void;
  hideTag?: boolean;
  containerStyle?: ViewStyle;
};

export default function AddressRow({
  address,
  withCheckbox,
  selectedAddress,
  onSelect,
  hideTag,
  containerStyle = {},
}: Props) {
  const isSelect = useMemo(() => {
    if (!selectedAddress) return false;

    return (
      address.contactName === selectedAddress.contactName &&
      address.contactPhoneNumber === selectedAddress.contactPhoneNumber &&
      address.zipCode === selectedAddress.zipCode
    );
  }, [address, selectedAddress]);

  return (
    <View style={[styles.container, containerStyle]}>
      {withCheckbox && (
        <TouchableOpacity onPress={onSelect?.(address)}>
          <Ionicons
            name={isSelect ? "checkbox-outline" : "square-outline"}
            size={utilities.iconSize.md}
            color={
              isSelect ? utilities.color.primary : utilities.fontColor.gray900
            }
          />
        </TouchableOpacity>
      )}
      <View style={{ gap: 3 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            height: utilities.iconSize.md,
          }}
        >
          <Text
            style={{ fontWeight: "700", fontSize: utilities.fontSize.sm + 2 }}
          >
            {address.contactName}
          </Text>
          <Text> | </Text>
          <Text>{address.contactPhoneNumber}</Text>
        </View>

        <Text>{address.address}</Text>
        <Text>Sub District : {address.subDistrict || "-"}</Text>
        <Text>City : {address.city}</Text>
        <Text>Province : {address.province}</Text>
        <Text>Postal code : {address.zipCode}</Text>
        <Text>Benchmark: {address.benchmark || "-"}</Text>

        {!hideTag && (
          <View style={{ flexDirection: "row", gap: 10, marginTop: 5 }}>
            <View style={styles.addressTag}>
              <Text style={{ fontSize: utilities.fontSize.sm - 2 }}>
                {address.tag}
              </Text>
            </View>
            {address.isMainAddress && (
              <View style={styles.addressTag}>
                <Text style={{ fontSize: utilities.fontSize.sm - 2 }}>
                  Main Address
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 3,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#fff",
    gap: 15,
  },
  addressTag: {
    padding: 5,
    borderWidth: 1,
    borderColor: utilities.color.primary,
    borderRadius: 5,
  },
});
