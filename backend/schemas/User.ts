import { list } from "@keystone-6/core";
import {
  checkbox,
  password,
  relationship,
  text,
} from "@keystone-6/core/fields";

type UserData = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

const isUser = ({ session }: { session: Session }) => !!session?.data.id;

export const User = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
    }),
    password: password({ validation: { isRequired: true } }),
    projects: relationship({ ref: "Project.users", many: true }),
    teams: relationship({
      ref: "Team.members",
      many: true,
      isFilterable: true,
    }),
    isAdmin: checkbox(),
  },
});
