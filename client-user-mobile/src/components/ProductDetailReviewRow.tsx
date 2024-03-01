import { Text, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { ProductReviewType } from "@/lib/types/products.types";
import { utilities } from "@/styles/utilities";
import moment from "moment";
import formatDate from "@/lib/utils/formatDate";
import createArray from "@/lib/utils/createArray";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  review: ProductReviewType;
};
export default function ProductDetailReviewRow({ review }: Props) {
  return (
    <View style={{ marginBottom: 14 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 4,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <FontAwesome6 name={"user-circle"} size={utilities.iconSize.md} />
          <View>
            <Text
              style={{ fontSize: utilities.fontSize.sm, fontWeight: "600" }}
            >
              {review.user?.username}
            </Text>
            <View
              style={{ flexDirection: "row", gap: 3, alignItems: "center" }}
            >
              {createArray(review.rate).map((_, index) => (
                <AntDesign
                  name={"star"}
                  size={utilities.fontSize.xs}
                  color={"orange"}
                  key={`review_${review.id}_star_${index}`}
                />
              ))}
              <Text style={{ fontSize: utilities.fontSize.xs, marginLeft: 5 }}>
                {formatDate(review.createdAt)}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <FontAwesome6 name={"thumbs-up"} size={utilities.iconSize.sm} />
        </View>
      </View>
      <Text>{review.context}</Text>
    </View>
  );
}
