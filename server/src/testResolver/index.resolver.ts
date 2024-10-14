import { GraphQLResolveInfo } from 'graphql';
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
};

export type Address = {
  __typename?: 'Address';
  address?: Maybe<Scalars['String']['output']>;
  benchmark?: Maybe<Scalars['String']['output']>;
  cityId?: Maybe<Scalars['ID']['output']>;
  contactName?: Maybe<Scalars['String']['output']>;
  isMainAddress?: Maybe<Scalars['Boolean']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  provinceId?: Maybe<Scalars['ID']['output']>;
  subDistrictId?: Maybe<Scalars['ID']['output']>;
  tag?: Maybe<AddressTagEnum>;
  zipCode?: Maybe<Scalars['ID']['output']>;
};

export enum AddressTagEnum {
  Home = 'HOME',
  Office = 'OFFICE'
}

export type DataLogin = {
  __typename?: 'DataLogin';
  token: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<ResponseLogin>;
  register?: Maybe<ResponseLogin>;
  updateVerifyStatus?: Maybe<ResponseUser>;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  payload?: InputMaybe<RegisterInput>;
};


export type MutationUpdateVerifyStatusArgs = {
  status: UserVerifyStatusEnum;
};

export type Query = {
  __typename?: 'Query';
  findUserRoles?: Maybe<Array<Maybe<UserRole>>>;
  findUsers?: Maybe<ResponseUsers>;
  getMyProfile?: Maybe<ResponseUser>;
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
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type ResponseCarts = Response & {
  __typename?: 'ResponseCarts';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type ResponseCategories = Response & {
  __typename?: 'ResponseCategories';
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

export type ResponseProduct = Response & {
  __typename?: 'ResponseProduct';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type ResponseProducts = Response & {
  __typename?: 'ResponseProducts';
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
  createdAt?: Maybe<Scalars['String']['output']>;
  dob?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  imgUrl?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  role?: Maybe<UserRole>;
  roleId?: Maybe<Scalars['ID']['output']>;
  statusVerify?: Maybe<UserVerifyStatusEnum>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserRole = {
  __typename?: 'UserRole';
  code?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export enum UserVerifyStatusEnum {
  NotVerified = 'NOT_VERIFIED',
  Pending = 'PENDING',
  Verified = 'VERIFIED'
}

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
  Response: ( ResponseCart ) | ( ResponseCarts ) | ( ResponseCategories ) | ( ResponseCountCart ) | ( ResponseLogin ) | ( ResponseProduct ) | ( ResponseProducts ) | ( ResponseUser ) | ( ResponseUsers );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Address: ResolverTypeWrapper<Address>;
  AddressTagEnum: AddressTagEnum;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DataLogin: ResolverTypeWrapper<DataLogin>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  Response: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Response']>;
  ResponseCart: ResolverTypeWrapper<ResponseCart>;
  ResponseCarts: ResolverTypeWrapper<ResponseCarts>;
  ResponseCategories: ResolverTypeWrapper<ResponseCategories>;
  ResponseCountCart: ResolverTypeWrapper<ResponseCountCart>;
  ResponseLogin: ResolverTypeWrapper<ResponseLogin>;
  ResponseProduct: ResolverTypeWrapper<ResponseProduct>;
  ResponseProducts: ResolverTypeWrapper<ResponseProducts>;
  ResponseUser: ResolverTypeWrapper<ResponseUser>;
  ResponseUsers: ResolverTypeWrapper<ResponseUsers>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserRole: ResolverTypeWrapper<UserRole>;
  UserVerifyStatusEnum: UserVerifyStatusEnum;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Address: Address;
  Boolean: Scalars['Boolean']['output'];
  DataLogin: DataLogin;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  RegisterInput: RegisterInput;
  Response: ResolversInterfaceTypes<ResolversParentTypes>['Response'];
  ResponseCart: ResponseCart;
  ResponseCarts: ResponseCarts;
  ResponseCategories: ResponseCategories;
  ResponseCountCart: ResponseCountCart;
  ResponseLogin: ResponseLogin;
  ResponseProduct: ResponseProduct;
  ResponseProducts: ResponseProducts;
  ResponseUser: ResponseUser;
  ResponseUsers: ResponseUsers;
  String: Scalars['String']['output'];
  User: User;
  UserRole: UserRole;
}>;

export type AddressResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  benchmark?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cityId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  contactName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isMainAddress?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provinceId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  subDistrictId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['AddressTagEnum']>, ParentType, ContextType>;
  zipCode?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DataLoginResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['DataLogin'] = ResolversParentTypes['DataLogin']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  login?: Resolver<Maybe<ResolversTypes['ResponseLogin']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  register?: Resolver<Maybe<ResolversTypes['ResponseLogin']>, ParentType, ContextType, Partial<MutationRegisterArgs>>;
  updateVerifyStatus?: Resolver<Maybe<ResolversTypes['ResponseUser']>, ParentType, ContextType, RequireFields<MutationUpdateVerifyStatusArgs, 'status'>>;
}>;

export type QueryResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  findUserRoles?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserRole']>>>, ParentType, ContextType>;
  findUsers?: Resolver<Maybe<ResolversTypes['ResponseUsers']>, ParentType, ContextType>;
  getMyProfile?: Resolver<Maybe<ResolversTypes['ResponseUser']>, ParentType, ContextType>;
}>;

export type ResponseResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ResponseCart' | 'ResponseCarts' | 'ResponseCategories' | 'ResponseCountCart' | 'ResponseLogin' | 'ResponseProduct' | 'ResponseProducts' | 'ResponseUser' | 'ResponseUsers', ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type ResponseCartResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ResponseCart'] = ResolversParentTypes['ResponseCart']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResponseCartsResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ResponseCarts'] = ResolversParentTypes['ResponseCarts']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResponseCategoriesResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ResponseCategories'] = ResolversParentTypes['ResponseCategories']> = ResolversObject<{
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

export type ResponseProductResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ResponseProduct'] = ResolversParentTypes['ResponseProduct']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResponseProductsResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ResponseProducts'] = ResolversParentTypes['ResponseProducts']> = ResolversObject<{
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

export type ResponseUsersResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ResponseUsers'] = ResolversParentTypes['ResponseUsers']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  addresses?: Resolver<Maybe<Array<Maybe<ResolversTypes['Address']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dob?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  imgUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
  roleId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  statusVerify?: Resolver<Maybe<ResolversTypes['UserVerifyStatusEnum']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  DataLogin?: DataLoginResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  ResponseCart?: ResponseCartResolvers<ContextType>;
  ResponseCarts?: ResponseCartsResolvers<ContextType>;
  ResponseCategories?: ResponseCategoriesResolvers<ContextType>;
  ResponseCountCart?: ResponseCountCartResolvers<ContextType>;
  ResponseLogin?: ResponseLoginResolvers<ContextType>;
  ResponseProduct?: ResponseProductResolvers<ContextType>;
  ResponseProducts?: ResponseProductsResolvers<ContextType>;
  ResponseUser?: ResponseUserResolvers<ContextType>;
  ResponseUsers?: ResponseUsersResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserRole?: UserRoleResolvers<ContextType>;
}>;

