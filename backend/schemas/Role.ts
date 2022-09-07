import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";

export const Role = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
  },
});
