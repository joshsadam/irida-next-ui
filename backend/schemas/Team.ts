import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";

export const Team = list({
  fields: {
    name: text(),
    description: text(),
    members: relationship({
      ref: "User.teams",
      many: true,
      isFilterable: true,
    }),
    parentTeam: relationship({
      ref: "Team",
      isFilterable: true,
      many: false,
    }),
  },
});
