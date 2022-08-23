import {redirect} from "@remix-run/node";

export default function Login() {
  return (
      <div>
          <form>
              <h1>Welcome to IRIDA Next UI</h1>
              <button type="submit">Login</button>
          </form>
      </div>
  );
}
