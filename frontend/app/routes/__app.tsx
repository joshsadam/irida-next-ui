import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, Outlet } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import type { User } from "~/types";

type LoaderData = {
  user: User;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return json<LoaderData>({ user });
};

export default function AppLayout() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Link to="/">Dashboard</Link> <Link to="/projects">Projects</Link>
        </div>
        <Form action="/logout" method="post">
          <button>Logout: </button>
        </Form>
      </div>
      <Outlet />
    </div>
  );
}
