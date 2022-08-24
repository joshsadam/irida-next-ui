import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { destroySession } from "~/services/session.server";

export const action: ActionFunction = async ({ request }) => {
  console.log("REDIRECTING TO LOGIN");
  await authenticator.logout(request, { redirectTo: "/login" });
};

export const loader: LoaderFunction = () => {
  throw new Response("", { status: 404 });
};
