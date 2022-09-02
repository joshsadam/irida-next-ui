/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/
import "dotenv/config";
import { config } from "@keystone-6/core";
import { Project } from "./schemas/Project";
import { Team } from "./schemas/Team";
import { User } from "./schemas/User";

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from "./auth";

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      provider: "sqlite",
      url: "file:./keystone.db",
    },
    server: {
      cors: {
        origin: [frontendUrl],
        credentials: true,
      },
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists: { Team, User, Project },
    session,
  })
);
