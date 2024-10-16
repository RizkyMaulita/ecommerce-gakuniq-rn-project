import { ProductType } from "@/lib/types/products.types";
import { renderPrice } from "@/lib/utils/renderPrice";
import { Image, Text, View } from "react-native";

type Props = {
  product: ProductType;
  quantity?: number;
};

export default function ProductCartRow({ product, quantity }: Props) {
  return (
    <View
      style={{
        marginBottom: 8,
        minHeight: 90,
        backgroundColor: "#fff",
        flexDirection: "row",
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={{ uri: product.imgUrl }}
          style={{ width: 70, height: 70 }}
        />
      </View>
      <View
        style={{
          flex: 3,
          paddingVertical: 10,
          marginRight: 10,
          justifyContent: "space-between",
        }}
      >
        <Text>{product.name || "-"}</Text>
        <View
          style={{
            marginTop: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "600" }}>
            {renderPrice(product.price)}
          </Text>
          <Text>x{quantity || 0}</Text>
        </View>
      </View>
    </View>
  );
}
