// import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { InlineContent, createReactBlockSpec } from "@blocknote/react";
import { Checkbox } from "@nextui-org/react";

export const TodoBlockSpec = createReactBlockSpec({
  type: "todo",
  propSchema: {
    completed: {
      default: "0",
    }
  },
  containsInlineContent: true,
  render: ({ block, editor }) => {
    return (

      <div className="flex items-center">
        <Checkbox onValueChange={bol => {
          editor.updateBlock(block, {
            props: {
              completed: bol ? "1" : "0",
            },
          });
        }} isSelected={block.props.completed == "1"} />
        {/* <Checkbox
          checked={block.props.completed == "1"}
          onCheckedChange={bol => {
            editor.updateBlock(block, {
              props: {
                completed: bol ? "1" : "0",
              },
            });
          }}
         /> */}
        <div className="whitespace-pre-wrap text-base w-full max-w-full break-words">
          <InlineContent className={cn("max-w-full break-words", {
            "line-through": block.props.completed == "1",
            "text-muted-foreground": block.props.completed == "1",
          })} />
        </div>
      </div>
    );
  }
})

export type TodoBlockSpec = typeof TodoBlockSpec;