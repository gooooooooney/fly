import { Separator } from "@/components/ui/separator";
import { InlineContent, createReactBlockSpec } from "@blocknote/react";
import { Callout } from "./callout-component";

export const CalloutBlockSpec = createReactBlockSpec({
  type: "callout",
  propSchema: {
    title: {
      default: "",
    },
    icon: {
      default: "💡",
    }
  },
  containsInlineContent: true,
  render: ({ block,editor }) => {
   editor.updateBlock(block, {
    type: "callout",
    props: {
      title: "title",
      icon: "💡"
    },
    children: [
      {
        type: "paragraph",
        props: {},
        content: [

        ]
      }
    ]

   })
    return (

      <>
        <Callout title={block.props.title} icon={block.props.icon}>
          <div contentEditable></div>
        </Callout>
        <InlineContent className="hidden" />
      </>
    );
  }
})

export type CalloutBlockSpec = typeof CalloutBlockSpec;