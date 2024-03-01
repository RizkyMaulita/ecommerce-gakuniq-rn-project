import { GET_PRODUCT_CART_COUNT } from "@/lib/apollo/queries/product";
import { useLazyQuery } from "@apollo/client";
import { ReactNode, createContext, useEffect, useState } from "react";

type CartValueType = {
  count: number;
  getCartCount: () => Promise<void>;
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext<CartValueType>({
  count: 0,
  getCartCount: async () => {},
});

export const CartProvider = ({ children }: CartProviderProps) => {
  const [count, setCount] = useState<number>(0);
  const [dispatchCartCount, { data }] = useLazyQuery(GET_PRODUCT_CART_COUNT, {
    onCompleted: (res: any) => {
      setCount(res?.getCountCarts?.data || 0);
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    getCartCount();
  }, []);

  const getCartCount = async () => {
    try {
      await dispatchCartCount();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider value={{ count, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
