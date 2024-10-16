import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyle } from "@/styles/global";
import { OrderStackScreenProps } from "@/navigations/OrderStack";
import { useCallback, useState } from "react";
import { UserAddressTagEnum, UserAddressType } from "@/lib/types/users.types";
import { FormInputText } from "@/components/FormInputText";
import HeaderScreen from "@/components/HeaderScreen";
import { Ionicons } from "@expo/vector-icons";
import Divider from "@/components/Divider";
import { utilities } from "@/styles/utilities";
import { useMutation } from "@apollo/client";
import { ADD_MY_ADDRESS, GET_MY_LIST_ADDRESS } from "@/lib/apollo/queries/user";

export default function OrderAddressCreateScreen({
  navigation,
  route,
}: OrderStackScreenProps<"OrderAddressCreate">) {
  const [form, setForm] = useState<UserAddressType>({
    address: "",
    province: "",
    city: "",
    subDistrict: "",
    zipCode: "",
    benchmark: "",
    contactName: "",
    contactPhoneNumber: "",
    tag: undefined,
    isMainAddress: false,
  });

  const [createAddress, { error }] = useMutation(ADD_MY_ADDRESS, {
    onCompleted: (data) => {
      navigation.navigate("OrderAddressList");
    },
    refetchQueries: [GET_MY_LIST_ADDRESS],
  });

  const onChangeForm = (value: string | boolean, key: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const onSubmit = useCallback(async () => {
    try {
      await createAddress({
        variables: {
          payload: form,
        },
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: OrderAddressCreateScreen.tsx:50 ~ onSubmit ~ error:",
        error
      );
    }
  }, [form]);

  console.log(error?.stack, "<<<< message");

  return (
    <View style={{ flex: 1 }}>
      <HeaderScreen title="Add New Address" />
      <View style={{ flex: 12, marginTop: 5, marginHorizontal: 5 }}>
        <ScrollView>
          <View style={{ backgroundColor: "#fff", padding: 10 }}>
            <FormInputText
              name="contactName"
              labelName="Contact Name"
              placeholder="Input your contact name"
              value={form.contactName}
              onChange={onChangeForm}
              isRequired
            />
            <FormInputText
              name="contactPhoneNumber"
              labelName="Phone Number"
              placeholder="Input your phone number"
              value={form.contactPhoneNumber}
              onChange={onChangeForm}
              type={"number-pad"}
              isRequired
            />
            <FormInputText
              name="address"
              labelName="Address"
              placeholder="Input your address"
              value={form.address}
              onChange={onChangeForm}
              isRequired
              multiline
            />
            <FormInputText
              name="subDistrict"
              labelName="Sub District"
              placeholder="Input your sub district"
              value={form.subDistrict || ""}
              onChange={onChangeForm}
              isRequired
            />
            <FormInputText
              name="city"
              labelName="City"
              placeholder="Input your city"
              value={form.city}
              onChange={onChangeForm}
              isRequired
            />
            <FormInputText
              name="province"
              labelName="Province"
              placeholder="Input your province"
              value={form.province}
              onChange={onChangeForm}
              isRequired
            />
            <FormInputText
              name="zipCode"
              labelName="Postal Code"
              placeholder="Input your postal code"
              value={form.zipCode}
              onChange={onChangeForm}
              isRequired
            />
            <FormInputText
              name="benchmark"
              labelName="Benchmark"
              placeholder="Input your benchmark"
              value={form.benchmark || ""}
              onChange={onChangeForm}
              multiline
            />
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 10,
              paddingVertical: 12,
              marginTop: 10,
              marginBottom: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => onChangeForm(!form.isMainAddress, "isMainAddress")}
            >
              <View style={styles.flexRow}>
                <Text>Set as Main Address</Text>
                <Ionicons
                  name={
                    form.isMainAddress ? "checkbox-outline" : "square-outline"
                  }
                  size={24}
                  color={utilities.color.primary}
                />
              </View>
            </TouchableOpacity>

            <Divider
              style={{ height: 3, marginVertical: 12, width: "100%" }}
            ></Divider>

            <View style={styles.flexRow}>
              <Text>Tag as :</Text>
              <View style={[styles.flexRow, { gap: 15 }]}>
                <FormAddressTag
                  value={form.tag}
                  tag={UserAddressTagEnum.HOME}
                  onChange={onChangeForm}
                />
                <FormAddressTag
                  value={form.tag}
                  tag={UserAddressTagEnum.OFFICE}
                  onChange={onChangeForm}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={{ paddingTop: 20, backgroundColor: "#fff" }}>
          <TouchableOpacity onPress={onSubmit}>
            <View
              style={[
                globalStyle.primaryButton,
                { width: "100%", marginBottom: 5 },
              ]}
            >
              <Text style={globalStyle.textButton}>Create</Text>
            </View>
          </TouchableOpacity>
          <Text style={{ textAlign: "center" }}>
            {error ? error?.message || "Internal Server Error" : ""}
          </Text>
        </View>
      </View>
    </View>
  );
}

function FormAddressTag({
  tag,
  value,
  onChange,
}: {
  tag: UserAddressTagEnum;
  value?: UserAddressTagEnum;
  onChange: (value: string, key: string) => void;
}) {
  return (
    <TouchableOpacity onPress={() => onChange(tag, "tag")}>
      <View style={[styles.btnTag, value === tag && styles.btnTagActive]}>
        <Text style={value === tag && styles.btnTagTextActive}>
          {tag === UserAddressTagEnum.HOME ? "Home" : "Office"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },
  btnTag: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 5,
  },
  btnTagActive: {
    backgroundColor: utilities.color.secondary,
    borderColor: utilities.color.secondary,
  },
  btnTagTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
});
