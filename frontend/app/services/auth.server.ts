import { gql } from "@apollo/client";
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";
import type { User } from "~/types";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    ... on UserAuthenticationWithPasswordSuccess {
      item {
        id
        email
        name
      }
    }
  }
`;

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    if (!password) throw new AuthorizationError("Password is required");
    if (!email) throw new AuthorizationError("Email is required");

    // Login with keystone?
    return { name: "josh", id: "T1000" };
  })
);
