import { renderPrice } from "@/lib/utils/renderPrice";
import { utilities } from "@/styles/utilities";
import { Text, View } from "react-native";

type Props = {
  title: string;
  value: string | number;
  isPrice?: boolean;
  isHighlight?: boolean;
};

export default function OrderPaymentDetailRow({
  title,
  value,
  isPrice,
  isHighlight,
}: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
      }}
    >
      <Text style={isHighlight ? { fontSize: utilities.fontSize.md } : {}}>
        {title}
      </Text>
      <Text
        style={
          isHighlight
            ? {
                fontSize: utilities.fontSize.md,
                fontWeight: "700",
                color: utilities.color.primary,
              }
            : {}
        }
      >
        {isPrice ? renderPrice(Number(value)) : value}
      </Text>
    </View>
  );
}
