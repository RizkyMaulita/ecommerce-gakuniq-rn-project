import {
  OrderShippingExpCodeEnum,
  OrderShippingExpServiceEnum,
} from "@/lib/types/order.types";
import { ProductCartType } from "@/lib/types/products.types";
import { UserAddressType } from "@/lib/types/users.types";
import { createContext, ReactNode, useState } from "react";

type OrderProviderProps = {
  children: ReactNode;
};

type OrderValueProps = {
  carts: ProductCartType[];
  setCarts: (carts: ProductCartType[]) => void;
  totalProductPrice: number;
  setTotalProductPrice: (price: number) => void;
  totalProduct: number;
  setTotalProduct: (count: number) => void;
  shippingExpCode: OrderShippingExpCodeEnum;
  setShippingExpCode: (code: OrderShippingExpCodeEnum) => void;
  shippingExpService: OrderShippingExpServiceEnum;
  setShippingExpService: (service: OrderShippingExpServiceEnum) => void;
  shippingPrice: number;
  setShippingPrice: (price: number) => void;
  address?: UserAddressType;
  setAddress?: (address: UserAddressType) => void;
  getMainAddress: () => Promise<void>;
};

export const OrderContext = createContext<OrderValueProps>({
  carts: [],
  setCarts: () => {},
  totalProduct: 0,
  setTotalProduct: () => {},
  totalProductPrice: 0,
  setTotalProductPrice: () => {},
  shippingExpCode: OrderShippingExpCodeEnum.POS,
  setShippingExpCode: () => {},
  shippingExpService: OrderShippingExpServiceEnum.REGULAR,
  setShippingExpService: () => {},
  shippingPrice: 15_000,
  setShippingPrice: () => {},
  address: undefined,
  setAddress: () => {},
  getMainAddress: async () => {},
});

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [carts, setCarts] = useState<ProductCartType[]>([]);
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const [totalProductPrice, setTotalProductPrice] = useState<number>(0);
  const [shippingExpCode, setShippingExpCode] =
    useState<OrderShippingExpCodeEnum>(OrderShippingExpCodeEnum.POS);
  const [shippingExpService, setShippingExpService] =
    useState<OrderShippingExpServiceEnum>(OrderShippingExpServiceEnum.REGULAR);
  const [shippingPrice, setShippingPrice] = useState<number>(15_000);
  const [address, setAddress] = useState<UserAddressType>();

  const getMainAddress = async () => {
    try {
      console.log("getMainAddress");
    } catch (error) {
      console.log(`An error occured while getMainAddress :`, error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        carts,
        setCarts,
        totalProduct,
        setTotalProduct,
        totalProductPrice,
        setTotalProductPrice,
        shippingExpCode,
        setShippingExpCode,
        shippingExpService,
        setShippingExpService,
        shippingPrice,
        setShippingPrice,
        address,
        setAddress,
        getMainAddress,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
