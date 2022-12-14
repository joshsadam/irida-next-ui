import { gql, useQuery } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        name
        email
      }
    }
  }
`;

export function useUser() {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  console.log({ data, loading, error });
  return { loading, user: data?.authenticatedItem, error };
}
