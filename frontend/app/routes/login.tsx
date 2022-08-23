import { redirect } from "@remix-run/node";
import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  // TODO (Josh - 8/23/22): Handle login here!
  return redirect(`/`);
};

export const meta: MetaFunction = () => {
  return { title: `IRIDA Login Page` };
};

export default function Login() {
  return (
    <div>
      <Form method="post">
        <h1>Welcome to IRIDA Next UI</h1>
        <button type="submit">Login</button>
      </Form>
    </div>
  );
}
