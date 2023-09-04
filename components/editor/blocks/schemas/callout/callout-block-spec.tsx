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
  render: ({ block, editor }) => {
    return (

      <>
        <Callout
          // title={<InlineContent >
          //   {block.props.title}
          // </InlineContent>
          // }
          className="flex bg-default-100 text-default-foreground items-start text-md rounded-sm max-w-3xl"
          icon={block.props.icon}>
          <div className="whitespace-pre-wrap text-base w-full max-w-full break-words">
            <InlineContent className="max-w-full break-words" />
          </div>
        </Callout>

      </>
    );
  }
})

export type CalloutBlockSpec = typeof CalloutBlockSpec;