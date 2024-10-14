const responseTypeDefs = `#graphql
  interface Response {
    statusCode: Int
    message: String
    error: String
  }

  type ResponseUser implements Response {
    statusCode: Int
    message: String
    error: String
    data: User
  }

  type ResponseUsers implements Response {
    statusCode: Int
    message: String
    error: String
    data: [User]
  }
  
  type DataLogin {
    token: String!
    user: User
  }

  type ResponseLogin implements Response {
    statusCode: Int
    message: String
    error: String
    data: DataLogin
  }

  type ResponseCategories implements Response {
    statusCode: Int
    message: String
    error: String
    data: [Category]
  }

  type ResponseProducts implements Response {
    statusCode: Int
    message: String
    error: String
    data: [Product]
  }

  type ResponseProduct implements Response {
    statusCode: Int
    message: String
    error: String
    data: Product
  }

  type ResponseCart implements Response {
    statusCode: Int
    message: String
    error: String
    data: Cart
  }

  type ResponseCarts implements Response {
    statusCode: Int
    message: String
    error: String
    data: [Cart]
  }

  type ResponseCountCart implements Response {
    statusCode: Int
    message: String
    error: String
    data: Int
  }
`;

export default responseTypeDefs;
