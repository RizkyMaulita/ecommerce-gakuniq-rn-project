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
`;

export default responseTypeDefs;
