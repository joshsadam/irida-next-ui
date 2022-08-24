import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";
import type { User } from "~/types";

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
