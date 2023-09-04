import { Separator } from "@/components/ui/separator";
import { InlineContent, createReactBlockSpec } from "@blocknote/react";

export const TodoBlockSpec = createReactBlockSpec({
  type: "todo",
  propSchema: {
    
  },
  containsInlineContent: true,
  render: ({ block }) => {
    return (

      <>
        <Separator contentEditable="false" data-id={block.id} className="my-4" />
        <InlineContent className="hidden" />
      </>
    );
  }
})

export type TodoBlockSpec = typeof TodoBlockSpec;