export const orderTypeDefs = `#graphql
  type Order {
    id: ID!
    userId: ID!
    address: Address!
    totalPrice: Int
    totalProductPrice: Int
    shippingExpCode: OrderShippingExpCodeEnum
    shippingExpService: OrderShippingExpServiceEnum
    shippingExpPrice: Int
    paymentToken: String
    createdAt: String
    updatedAt: String
  }

  type OrderDetail {
    id: ID!
    productId: ID!
    orderId: ID!
    userId: ID!
    quantity: Int!
    price: Int!
    totalPrice: Int!
    createdAt: String
    updatedAt: String
  }

  enum OrderShippingExpCodeEnum {
    JNE
    TIKI
    POS
  }

  enum OrderShippingExpServiceEnum {
    OKE
    YES
    REG
  }

  enum OrderStatusEnum {
    CREATED
    PAYMENT_PENDING
    PAYMENT_SUCCESS
    PAYMENT_CANCELL
    PAYMENT_REJECT
    PROCESS_PACKAGING
    PROCESS_SHIPPING
    PROCESS_SHIPPING_RETUR
    PROCESS_SHIPPING_ARRIVED
    COMPLETED
    COMPLAIN
  }


`;
