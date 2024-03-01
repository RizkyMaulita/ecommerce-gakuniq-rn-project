import {
  Alert,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { ProductReviewType } from "@/lib/types/products.types";
import { utilities } from "@/styles/utilities";
import ProductDetailReviewRow from "./ProductDetailReviewRow";
import { globalStyle } from "@/styles/global";

const { height } = Dimensions.get("screen");

type Props = {
  showModal: boolean;
  onClose: () => void;
  data: ProductReviewType[];
};

export default function ProductDetailReviewListModal({
  showModal,
  onClose,
  data,
}: Props) {
  const [commentInput, setCommentInput] = useState("");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        onClose();
      }}
    >
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[{ flex: 1 }]}
        keyboardVerticalOffset={200}
      > */}
      <TouchableOpacity
        style={{ height: "55%" }}
        onPress={onClose}
      ></TouchableOpacity>
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          {/* Modal Header */}
          <View style={modalStyles.header}>
            {/* <View></View> */}
            <View>
              <Text
                style={{ fontSize: utilities.fontSize.md, fontWeight: "600" }}
              >
                Ulasan Pembeli
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={{ alignSelf: "flex-end" }}
                onPress={onClose}
              >
                <AntDesign
                  name={"close"}
                  size={20}
                  color={utilities.fontColor.gray700}
                />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={data}
            renderItem={({ item }) => <ProductDetailReviewRow review={item} />}
            keyExtractor={(item) => item.id}
            style={{ marginBottom: 8 }}
          />

          {/* <View
            style={{
              height: "15%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <View style={{ width: "90%" }}>
              <TextInput
                placeholder="Input review"
                value={commentInput}
                onChangeText={setCommentInput}
                style={[
                  globalStyle.textInputSm,
                  {
                    borderRadius: 12,
                    borderColor: utilities.color.lightGray,
                    color: "black",
                  },
                ]}
              />
            </View>
            <FontAwesome name={"send-o"} size={utilities.iconSize.md} />
          </View> */}
        </View>
      </View>
      {/* </KeyboardAvoidingView> */}
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // marginTop: height / 1.6,
  },
  modalView: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5,
    shadowRadius: 15,
    elevation: 5,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 14,
  },
});
