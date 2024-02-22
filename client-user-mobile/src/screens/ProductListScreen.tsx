import HeaderSearchProduct from "@/components/HeaderSearchProduct";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import ProductListHeader from "@/components/ProductListHeader";
import { GET_PRODUCTS } from "@/lib/apollo/queries/product";
import { ProductType } from "@/lib/types/products.types";
import { ProductStackScreenProps } from "@/navigations/ProductStack";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { height } = Dimensions.get("screen");

export default function ProductListScreen({
  navigation,
}: ProductStackScreenProps<"ProductList">) {
  const [fetchProducts, { data, loading, error }] = useLazyQuery(GET_PRODUCTS);
  const dataProducts = (data?.getProducts?.data as ProductType[]) || [];
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  useEffect(() => {
    fetchProducts({
      variables: {
        categoryId: selectedCategoryId,
      },
    });
  }, [selectedCategoryId]);

  const onSelectCategory = (categoryId: string) => {
    const isSame = selectedCategoryId === categoryId;
    setSelectedCategoryId(isSame ? "" : categoryId);
  };

  const onNavigateProductDetail = (productId: string) => {
    navigation.navigate("ProductDetail", {
      id: productId,
    });
  };

  return (
    <View style={[styles.container]}>
      <View style={{ flex: 1 }}>
        <HeaderSearchProduct />
      </View>
      <View style={{ flex: 13 }}>
        <FlatList
          data={loading ? [null] : dataProducts}
          renderItem={({ item, index }) => {
            const lastIndex =
              dataProducts.length % 2 && index === dataProducts.length - 1;

            if (!item) {
              return (
                <Loading
                  isLoading
                  style={{ height: height / 2.5, width: "100%" }}
                />
              );
            }

            return (
              <ProductCard
                lastIndex={lastIndex === true}
                product={item}
                isOdd={index % 2 != 0}
                onNavigate={onNavigateProductDetail}
              />
            );
          }}
          keyExtractor={(item, index) => `product_${!item ? index : item.id}`}
          ListHeaderComponent={
            <ProductListHeader
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={onSelectCategory}
            />
          }
          numColumns={2}
          ListHeaderComponentStyle={{ zIndex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
