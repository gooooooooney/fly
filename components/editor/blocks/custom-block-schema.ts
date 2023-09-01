import { DefaultBlockSchema, defaultBlockSchema } from "@blocknote/core";
import { HeadingBlockContent } from "./heading";
import { pageBlockSpec, PageBlockSpec } from "./schemas/page-schema/page-block-spec";


export const customBlockSchema: DefaultBlockSchema & { page: PageBlockSpec } = {
  ...defaultBlockSchema,
  heading: {
    ...defaultBlockSchema.heading,
    propSchema: {
      ...defaultBlockSchema.heading.propSchema,
      level: {
        default: "1",
        values: ["1", "2", "3", "4", "5", "6"] as any,
      }
    },
    node: HeadingBlockContent,
  },
  page: pageBlockSpec
}

export type CustomBlockSchema = typeof customBlockSchema

