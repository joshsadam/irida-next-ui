import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GRAPHQL_DEV_ENDPOINT } from "../config";

const client = new ApolloClient({
  uri: GRAPHQL_DEV_ENDPOINT,
  cache: new InMemoryCache(),
});

export default client;
