import { gql } from "@apollo/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "../../../apollo/client";

export const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Login to IRIDA",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email Address",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { data } = await client.mutate({
          mutation: SIGN_IN_MUTATION,
          variables: credentials,
        });

        if (
          data.authenticateUserWithPassword.__typename ===
          "UserAuthenticationWithPasswordFailure"
        ) {
          return null;
        }

        return data.authenticateUserWithPassword.item;
      },
    }),
  ],
  callbacks: {
    // async jwt({ token }) {
    //   console.log("TOKEN", { token });
    //   token.userRole = "admin";
    //   return token;
    // },
  },
};

export default NextAuth(authOptions);
