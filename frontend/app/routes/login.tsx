import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { json, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { getSession } from "~/services/session.server";

type LoaderData = {
  error: {
    message: string;
  } | null;
};

export const action: ActionFunction = async ({ request }) => {
  await authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, { successRedirect: "/" });
  const session = await getSession(request.headers.get("Cookie"));
  const error = session.get(
    authenticator.sessionErrorKey
  ) as LoaderData["error"];
  return json<LoaderData>({ error });
};

export const meta: MetaFunction = () => {
  return { title: `IRIDA Login Page` };
};

export default function Login() {
  const { error } = useLoaderData<LoaderData>();
  return (
    <div>
      {error ? <div>{error.message}</div> : null}
      <Form method="post">
        <h2>Sign Into Your Account</h2>
        <input
          name="email"
          autoComplete="email"
          placeholder="You're email address"
        />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </Form>
    </div>
  );
}
