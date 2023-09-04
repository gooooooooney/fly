import { DefaultBlockSchema, defaultBlockSchema } from "@blocknote/core";
import { HeadingBlockContent } from "./heading";
import { pageBlockSpec, PageBlockSpec } from "./schemas/page-schema/page-block-spec";
import { DividerBlockSpec, dividerBlockSpec } from "./schemas/divider/divider-block-spec";


export type CustomBlockSpecs = {
  page: PageBlockSpec
  divider: DividerBlockSpec
}

export const customBlockSchema: DefaultBlockSchema & CustomBlockSpecs = {
  ...defaultBlockSchema,
  // heading: {
  //   ...defaultBlockSchema.heading,
  //   propSchema: {
  //     ...defaultBlockSchema.heading.propSchema,
  //     level: {
  //       default: "1",
  //       values: ["1", "2", "3", "4", "5", "6"] as any,
  //     }
  //   },
  //   node: HeadingBlockContent,
  // },
  page: pageBlockSpec,
  divider: dividerBlockSpec,
}

export type CustomBlockSchema = typeof customBlockSchema

