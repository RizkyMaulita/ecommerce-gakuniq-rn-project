import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ServerContext } from '../types/server.types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: Date; output: Date; }
};

export type Address = {
  __typename?: 'Address';
  address?: Maybe<Scalars['String']['output']>;
  benchmark?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  cityId?: Maybe<Scalars['ID']['output']>;
  contactName?: Maybe<Scalars['String']['output']>;
  contactPhoneNumber?: Maybe<Scalars['String']['output']>;
  isMainAddress?: Maybe<Scalars['Boolean']['output']>;
  latitude?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  provinceId?: Maybe<Scalars['ID']['output']>;
  subDistrict?: Maybe<Scalars['String']['output']>;
  subDistrictId?: Maybe<Scalars['ID']['output']>;
  tag?: Maybe<AddressTagEnum>;
  zipCode?: Maybe<Scalars['ID']['output']>;
};

export type AddressTagEnum =
  | 'HOME'
  | 'OFFICE';

export type AdressInput = {
  address: Scalars['String']['input'];
  benchmark?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  cityId?: InputMaybe<Scalars['ID']['input']>;
  contactName?: InputMaybe<Scalars['String']['input']>;
  contactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  isMainAddress?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  province: Scalars['String']['input'];
  provinceId?: InputMaybe<Scalars['ID']['input']>;
  subDistrict?: InputMaybe<Scalars['String']['input']>;
  subDistrictId?: InputMaybe<Scalars['ID']['input']>;
  tag?: InputMaybe<AddressTagEnum>;
  zipCode: Scalars['ID']['input'];
};

export type Cart = {
  __typename?: 'Cart';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['ID']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type Category = {
  __typename?: 'Category';
  id?: Maybe<Scalars['ID']['output']>;
  imgUrl?: Maybe<Scalars['String']['output']>;
  imgUrlActive?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CreateOrderInput = {
  address: AdressInput;
  cartIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  orderId?: InputMaybe<Scalars['ID']['input']>;
  shippingExpCode: OrderShippingExpCodeEnum;
  shippingExpPrice: Scalars['Int']['input'];
  shippingExpService: OrderShippingExpServiceEnum;
};

export type DataLogin = {
  __typename?: 'DataLogin';
  token: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMyAddress?: Maybe<ResponseUser>;
  addProductToCart?: Maybe<ResponseCart>;
  createDraftOrder?: Maybe<ResponseOrder>;
  deleteCart?: Maybe<ResponseCart>;
  login?: Maybe<ResponseLogin>;
  register?: Maybe<ResponseLogin>;
  updateQtyCart?: Maybe<ResponseCart>;
  updateVerifyStatus?: Maybe<ResponseUser>;
  upsertOrder?: Maybe<ResponseOrder>;
};


export type MutationAddMyAddressArgs = {
  payload?: InputMaybe<AdressInput>;
};


export type MutationAddProductToCartArgs = {
  productId: Scalars['ID']['input'];
};


export type MutationCreateDraftOrderArgs = {
  cartIds: Array<Scalars['ID']['input']>;
};


export type MutationDeleteCartArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  payload?: InputMaybe<RegisterInput>;
};


export type MutationUpdateQtyCartArgs = {
  id: Scalars['ID']['input'];
  qty: Scalars['Int']['input'];
};


export type MutationUpdateVerifyStatusArgs = {
  status: UserVerifyStatusEnum;
};


export type MutationUpsertOrderArgs = {
  payload: CreateOrderInput;
};

export type Order = {
  __typename?: 'Order';
  address?: Maybe<Address>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  orderDetails?: Maybe<Array<Maybe<OrderDetail>>>;
  paymentToken?: Maybe<Scalars['String']['output']>;
  shippingExpCode?: Maybe<OrderShippingExpCodeEnum>;
  shippingExpPrice?: Maybe<Scalars['Int']['output']>;
  shippingExpService?: Maybe<OrderShippingExpServiceEnum>;
  status?: Maybe<OrderStatusEnum>;
  totalPrice?: Maybe<Scalars['Int']['output']>;
  totalProductPrice?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  userId: Scalars['ID']['output'];
};

export type OrderDetail = {
  __typename?: 'OrderDetail';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  orderId: Scalars['ID']['output'];
  price?: Maybe<Scalars['Int']['output']>;
  product?: Maybe<Product>;
  productId: Scalars['ID']['output'];
  quantity?: Maybe<Scalars['Int']['output']>;
  totalPrice?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type OrderShippingExpCodeEnum =
  | 'JNE'
  | 'POS'
  | 'TIKI';

export type OrderShippingExpServiceEnum =
  | 'EKONOMI'
  | 'REGULAR';

export type OrderStatusEnum =
  | 'CANCELLED'
  | 'COMPLAIN'
  | 'COMPLETED'
  | 'CREATED'
  | 'DRAFT'
  | 'PAYMENT_CANCELL'
  | 'PAYMENT_PENDING'
  | 'PAYMENT_REJECT'
  | 'PAYMENT_SUCCESS'
  | 'PROCESS_PACKAGING'
  | 'PROCESS_SHIPPING'
  | 'PROCESS_SHIPPING_ARRIVED'
  | 'PROCESS_SHIPPING_RETUR';

export type Product = {
  __typename?: 'Product';
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  documents?: Maybe<Array<Maybe<ProductDoc>>>;
  gender?: Maybe<ProductGenderEnum>;
  id?: Maybe<Scalars['ID']['output']>;
  imgUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  rate?: Maybe<Scalars['Float']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  sourceUrl?: Maybe<Scalars['String']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ProductDoc = {
  __typename?: 'ProductDoc';
  type?: Maybe<ProductDocTypeEnum>;
  url?: Maybe<Scalars['String']['output']>;
};

export type ProductDocTypeEnum =
  | 'IMAGE'
  | 'VIDEO';

export type ProductGenderEnum =
  | 'FEMALE'
  | 'MALE'
  | 'UNISEX';

export type Query = {
  __typename?: 'Query';
  findUsers?: Maybe<ResponseUsers>;
  getCarts?: Maybe<ResponseCarts>;
  getCategories?: Maybe<ResponseCategories>;
  getCountCarts?: Maybe<ResponseCountCart>;
  getMyListAddress?: Maybe<ResponseUserAddresses>;
  getMyOrderDetail?: Maybe<ResponseOrder>;
  getMyOrders?: Maybe<ResponseOrders>;
  getMyProfile?: Maybe<ResponseUser>;
  getProduct?: Maybe<ResponseProduct>;
  getProducts?: Maybe<ResponseProducts>;
};


export type QueryGetMyOrderDetailArgs = {
  orderId: Scalars['ID']['input'];
};


export type QueryGetMyOrdersArgs = {
  status?: InputMaybe<OrderStatusEnum>;
};


export type QueryGetProductArgs = {
  productId: Scalars['String']['input'];
};


export type QueryGetProductsArgs = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterInput = {
  dob?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullName?: InputMaybe<Scalars['String']['input']>;
  imgUrl?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type Response = {
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type ResponseCart = Response & {
  __typename?: 'ResponseCart';
  data?: Maybe<Cart>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type ResponseCarts = Response & {
  __typename?: 'ResponseCarts';
  data?: Maybe<Array<Maybe<Cart>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type ResponseCategories = Response & {
  __typename?: 'ResponseCategories';
  data?: Maybe<Array<Maybe<Category>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type ResponseCountCart = Response & {
  __typename?: 'ResponseCountCart';
  data?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type ResponseLogin = Response & {
  __typename?: 'ResponseLogin';
  data?: Maybe<DataLogin>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type ResponseOrder = Response & {
  __typename?: 'ResponseOrder';
  data?: Maybe<Order>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type ResponseOrders = Response & {
  __typename?: 'ResponseOrders';
  data?: Maybe<Array<Maybe<Order>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type ResponseProduct = Response & {
  __typename?: 'ResponseProduct';
  data?: Maybe<Product>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type ResponseProducts = Response & {
  __typename?: 'ResponseProducts';
  data?: Maybe<Array<Maybe<Product>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type ResponseUser = Response & {
  __typename?: 'ResponseUser';
  data?: Maybe<User>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type ResponseUserAddresses = Response & {
  __typename?: 'ResponseUserAddresses';
  data?: Maybe<Array<Maybe<Address>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type ResponseUsers = Response & {
  __typename?: 'ResponseUsers';
  data?: Maybe<Array<Maybe<User>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type User = {
  __typename?: 'User';
  addresses?: Maybe<Array<Maybe<Address>>>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  dob?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  imgUrl?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  role?: Maybe<UserRole>;
  roleId?: Maybe<Scalars['ID']['output']>;
  statusVerify?: Maybe<UserVerifyStatusEnum>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserRole = {
  __typename?: 'UserRole';
  code?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type UserVerifyStatusEnum =
  | 'NOT_VERIFIED'
  | 'PENDING'
  | 'VERIFIED';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = ResolversObject<{
  Response: ( ResponseCart ) | ( ResponseCarts ) | ( ResponseCategories ) | ( ResponseCountCart ) | ( ResponseLogin ) | ( ResponseOrder ) | ( ResponseOrders ) | ( ResponseProduct ) | ( ResponseProducts ) | ( ResponseUser ) | ( ResponseUserAddresses ) | ( ResponseUsers );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Address: ResolverTypeWrapper<Address>;
  AddressTagEnum: AddressTagEnum;
  AdressInput: AdressInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Cart: ResolverTypeWrapper<Cart>;
  Category: ResolverTypeWrapper<Category>;
  CreateOrderInput: CreateOrderInput;
  DataLogin: ResolverTypeWrapper<DataLogin>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  OrderDetail: ResolverTypeWrapper<OrderDetail>;
  OrderShippingExpCodeEnum: OrderShippingExpCodeEnum;
  OrderShippingExpServiceEnum: OrderShippingExpServiceEnum;
  OrderStatusEnum: OrderStatusEnum;
  Product: ResolverTypeWrapper<Product>;
  ProductDoc: ResolverTypeWrapper<ProductDoc>;
  ProductDocTypeEnum: ProductDocTypeEnum;
  ProductGenderEnum: ProductGenderEnum;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  Response: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Response']>;
  ResponseCart: ResolverTypeWrapper<ResponseCart>;
  ResponseCarts: ResolverTypeWrapper<ResponseCarts>;
  ResponseCategories: ResolverTypeWrapper<ResponseCategories>;
  ResponseCountCart: ResolverTypeWrapper<ResponseCountCart>;
  ResponseLogin: ResolverTypeWrapper<ResponseLogin>;
  ResponseOrder: ResolverTypeWrapper<ResponseOrder>;
  ResponseOrders: ResolverTypeWrapper<ResponseOrders>;
  ResponseProduct: ResolverTypeWrapper<ResponseProduct>;
  ResponseProducts: ResolverTypeWrapper<ResponseProducts>;
  ResponseUser: ResolverTypeWrapper<ResponseUser>;
  ResponseUserAddresses: ResolverTypeWrapper<ResponseUserAddresses>;
  ResponseUsers: ResolverTypeWrapper<ResponseUsers>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserRole: ResolverTypeWrapper<UserRole>;
  UserVerifyStatusEnum: UserVerifyStatusEnum;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Address: Address;
  AdressInput: AdressInput;
  Boolean: Scalars['Boolean']['output'];
  Cart: Cart;
  Category: Category;
  CreateOrderInput: CreateOrderInput;
  DataLogin: DataLogin;
  Date: Scalars['Date']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Order: Order;
  OrderDetail: OrderDetail;
  Product: Product;
  ProductDoc: ProductDoc;
  Query: {};
  RegisterInput: RegisterInput;
  Response: ResolversInterfaceTypes<ResolversParentTypes>['Response'];
  ResponseCart: ResponseCart;
  ResponseCarts: ResponseCarts;
  ResponseCategories: ResponseCategories;
  ResponseCountCart: ResponseCountCart;
  ResponseLogin: ResponseLogin;
  ResponseOrder: ResponseOrder;
  ResponseOrders: ResponseOrders;
  ResponseProduct: ResponseProduct;
  ResponseProducts: ResponseProducts;
  ResponseUser: ResponseUser;
  ResponseUserAddresses: ResponseUserAddresses;
  ResponseUsers: ResponseUsers;
  String: Scalars['String']['output'];
  User: User;
  UserRole: UserRole;
}>;

export type AddressResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  benchmark?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cityId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  contactName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contactPhoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isMainAddress?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  province?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provinceId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  subDistrict?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subDistrictId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['AddressTagEnum']>, ParentType, ContextType>;
  zipCode?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CartResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Cart'] = ResolversParentTypes['Cart']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  productId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  imgUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imgUrlActive?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DataLoginResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['DataLogin'] = ResolversParentTypes['DataLogin']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MutationResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addMyAddress?: Resolver<Maybe<ResolversTypes['ResponseUser']>, ParentType, ContextType, Partial<MutationAddMyAddressArgs>>;
  addProductToCart?: Resolver<Maybe<ResolversTypes['ResponseCart']>, ParentType, ContextType, RequireFields<MutationAddProductToCartArgs, 'productId'>>;
  createDraftOrder?: Resolver<Maybe<ResolversTypes['ResponseOrder']>, ParentType, ContextType, RequireFields<MutationCreateDraftOrderArgs, 'cartIds'>>;
  deleteCart?: Resolver<Maybe<ResolversTypes['ResponseCart']>, ParentType, ContextType, RequireFields<MutationDeleteCartArgs, 'id'>>;
  login?: Resolver<Maybe<ResolversTypes['ResponseLogin']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  register?: Resolver<Maybe<ResolversTypes['ResponseLogin']>, ParentType, ContextType, Partial<MutationRegisterArgs>>;
  updateQtyCart?: Resolver<Maybe<ResolversTypes['ResponseCart']>, ParentType, ContextType, RequireFields<MutationUpdateQtyCartArgs, 'id' | 'qty'>>;
  updateVerifyStatus?: Resolver<Maybe<ResolversTypes['ResponseUser']>, ParentType, ContextType, RequireFields<MutationUpdateVerifyStatusArgs, 'status'>>;
  upsertOrder?: Resolver<Maybe<ResolversTypes['ResponseOrder']>, ParentType, ContextType, RequireFields<MutationUpsertOrderArgs, 'payload'>>;
}>;

export type OrderResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  orderDetails?: Resolver<Maybe<Array<Maybe<ResolversTypes['OrderDetail']>>>, ParentType, ContextType>;
  paymentToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shippingExpCode?: Resolver<Maybe<ResolversTypes['OrderShippingExpCodeEnum']>, ParentType, ContextType>;
  shippingExpPrice?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  shippingExpService?: Resolver<Maybe<ResolversTypes['OrderShippingExpServiceEnum']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['OrderStatusEnum']>, ParentType, ContextType>;
  totalPrice?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalProductPrice?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrderDetailResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['OrderDetail'] = ResolversParentTypes['OrderDetail']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  orderId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalPrice?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  categoryId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  documents?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductDoc']>>>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['ProductGenderEnum']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  imgUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stock?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductDocResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ProductDoc'] = ResolversParentTypes['ProductDoc']> = ResolversObject<{
  type?: Resolver<Maybe<ResolversTypes['ProductDocTypeEnum']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  findUsers?: Resolver<Maybe<ResolversTypes['ResponseUsers']>, ParentType, ContextType>;
  getCarts?: Resolver<Maybe<ResolversTypes['ResponseCarts']>, ParentType, ContextType>;
  getCategories?: Resolver<Maybe<ResolversTypes['ResponseCategories']>, ParentType, ContextType>;
  getCountCarts?: Resolver<Maybe<ResolversTypes['ResponseCountCart']>, ParentType, ContextType>;
  getMyListAddress?: Resolver<Maybe<ResolversTypes['ResponseUserAddresses']>, ParentType, ContextType>;
  getMyOrderDetail?: Resolver<Maybe<ResolversTypes['ResponseOrder']>, ParentType, ContextType, RequireFields<QueryGetMyOrderDetailArgs, 'orderId'>>;
  getMyOrders?: Resolver<Maybe<ResolversTypes['ResponseOrders']>, ParentType, ContextType, Partial<QueryGetMyOrdersArgs>>;
  getMyProfile?: Resolver<Maybe<ResolversTypes['ResponseUser']>, ParentType, ContextType>;
  getProduct?: Resolver<Maybe<ResolversTypes['ResponseProduct']>, ParentType, ContextType, RequireFields<QueryGetProductArgs, 'productId'>>;
  getProducts?: Resolver<Maybe<ResolversTypes['ResponseProducts']>, ParentType, ContextType, Partial<QueryGetProductsArgs>>;
}>;

export type ResponseResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ResponseCart' | 'ResponseCarts' | 'ResponseCategories' | 'ResponseCountCart' | 'ResponseLogin' | 'ResponseOrder' | 'ResponseOrders' | 'ResponseProduct' | 'ResponseProducts' | 'ResponseUser' | 'ResponseUserAddresses' | 'ResponseUsers', ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type ResponseCartResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ResponseCart'] = ResolversParentTypes['ResponseCart']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResponseCartsResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ResponseCarts'] = ResolversParentTypes['ResponseCarts']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Cart']>>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResponseCategoriesResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ResponseCategories'] = ResolversParentTypes['ResponseCategories']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResponseCountCartResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ResponseCountCart'] = ResolversParentTypes['ResponseCountCart']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResponseLoginResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ResponseLogin'] = ResolversParentTypes['ResponseLogin']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['DataLogin']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResponseOrderResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ResponseOrder'] = ResolversParentTypes['ResponseOrder']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResponseOrdersResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ResponseOrders'] = ResolversParentTypes['ResponseOrders']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Order']>>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResponseProductResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ResponseProduct'] = ResolversParentTypes['ResponseProduct']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResponseProductsResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ResponseProducts'] = ResolversParentTypes['ResponseProducts']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResponseUserResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ResponseUser'] = ResolversParentTypes['ResponseUser']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResponseUserAddressesResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ResponseUserAddresses'] = ResolversParentTypes['ResponseUserAddresses']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Address']>>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResponseUsersResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ResponseUsers'] = ResolversParentTypes['ResponseUsers']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  addresses?: Resolver<Maybe<Array<Maybe<ResolversTypes['Address']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  dob?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  imgUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
  roleId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  statusVerify?: Resolver<Maybe<ResolversTypes['UserVerifyStatusEnum']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserRoleResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['UserRole'] = ResolversParentTypes['UserRole']> = ResolversObject<{
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ServerContext> = ResolversObject<{
  Address?: AddressResolvers<ContextType>;
  Cart?: CartResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  DataLogin?: DataLoginResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderDetail?: OrderDetailResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductDoc?: ProductDocResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  ResponseCart?: ResponseCartResolvers<ContextType>;
  ResponseCarts?: ResponseCartsResolvers<ContextType>;
  ResponseCategories?: ResponseCategoriesResolvers<ContextType>;
  ResponseCountCart?: ResponseCountCartResolvers<ContextType>;
  ResponseLogin?: ResponseLoginResolvers<ContextType>;
  ResponseOrder?: ResponseOrderResolvers<ContextType>;
  ResponseOrders?: ResponseOrdersResolvers<ContextType>;
  ResponseProduct?: ResponseProductResolvers<ContextType>;
  ResponseProducts?: ResponseProductsResolvers<ContextType>;
  ResponseUser?: ResponseUserResolvers<ContextType>;
  ResponseUserAddresses?: ResponseUserAddressesResolvers<ContextType>;
  ResponseUsers?: ResponseUsersResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserRole?: UserRoleResolvers<ContextType>;
}>;

