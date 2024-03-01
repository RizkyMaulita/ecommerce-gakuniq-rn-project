import { API_URL } from "@/config";
import { SecureStoreKeyEnums } from "@/context/AuthContext";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync(SecureStoreKeyEnums.TOKEN);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
