import { list } from "@keystone-6/core";
import { relationship, text, timestamp } from "@keystone-6/core/fields";

export const Project = list({
  fields: {
    name: text(),
    description: text(),
    createdDate: timestamp({ defaultValue: { kind: "now" } }),
    users: relationship({
      ref: "User.projects",
      many: true,
    }),
    teams: relationship({
      ref: "Team",
      many: true,
    }),
    // samples: relationship({
    //   ref: "Sample.projects",
    //   many: true,
    // }),
  },
  ui: {
    listView: {
      initialColumns: ["name", "description", "createdDate"],
    },
  },
});
