import { Separator } from "@/components/ui/separator";
import { InlineContent, createReactBlockSpec } from "@blocknote/react";

export const DividerBlockSpec = createReactBlockSpec({
  type: "divider",
  propSchema: {
  },
  containsInlineContent: false,
  render: ({ block }) => {
    return (

      <>
        <Separator contentEditable="false" data-id={block.id} className="my-4" />
      </>
    );
  }
})

export type DividerBlockSpec = typeof DividerBlockSpec;