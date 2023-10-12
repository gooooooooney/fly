import { DefaultBlockSchema, defaultBlockSchema } from "@blocknote/core";
import { HeadingBlockContent } from "./heading";
import { PageBlockSpec } from "./schemas/page-schema/page-block-spec";
import { DividerBlockSpec } from "./schemas/divider/divider-block-spec";
import { CalloutBlockSpec } from "./schemas/callout/callout-block-spec";
import { TodoBlockSpec } from "./schemas/todo/todo-block-spec";
import { CodeBlockSpec } from "./schemas/code-block/code-block-schema";
import { CustomSchema } from "./schemas/custom/custom-schema";


export type CustomBlockSpecs = {
  page: PageBlockSpec
  divider: DividerBlockSpec
  callout: CalloutBlockSpec
  todo: TodoBlockSpec
  // custom: CustomSchema
  // codeBlock: CodeBlockSpec
}

export const CustomBlockSchema: DefaultBlockSchema & CustomBlockSpecs = {
  ...defaultBlockSchema,
  // heading: {
  //   ...defaultBlockSchema.heading,
  //   propSchema: {
  //     ...defaultBlockSchema.heading.propSchema,
  //     level: {
  //       default: "1",
  //       values: ["1", "2", "3", "4"] as any,
  //     }
  //   },
  //   node: HeadingBlockContent,
  // },
  page: PageBlockSpec,
  divider: DividerBlockSpec,
  callout: CalloutBlockSpec,
  todo: TodoBlockSpec,
  // custom: CustomSchema,
  // codeBlock: CodeBlockSpec
}


export type CustomBlockSchema = typeof CustomBlockSchema

