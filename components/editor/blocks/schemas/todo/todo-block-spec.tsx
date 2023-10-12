// import { Checkbox } from "@/components/ui/checkbox";
import {
  InlineContent,
  createCustomReactBlockSpec,
} from "@/components/editor/utils/createReactSpec";
import { getBlockInfoFromPos } from "@/components/editor/utils/helper";
import { BlockName } from "@/constatns/block";
import { cn } from "@/lib/utils";
// import { InlineContent, createReactBlockSpec } from "@blocknote/react";
import { Checkbox } from "@nextui-org/react";

export const TodoBlockSpec = createCustomReactBlockSpec({
  type: "todo",
  propSchema: {
    completed: {
      default: "0",
    },
  },
  containsInlineContent: true,
  addKeyboardShortcuts({ editor }) {
    return {
      Enter: () => {
        const { node, contentType } = getBlockInfoFromPos(
          editor.state.doc,
          editor.state.selection.from
        )!;

        const selectionEmpty =
          editor.state.selection.anchor === editor.state.selection.head;

        if (!contentType.name.endsWith(BlockName.TODO) || !selectionEmpty) {
          return false;
        }
        return editor.commands.first(({ state, chain, commands }) => [
          () =>
            // Changes list item block to a text block if the content is empty.
            commands.command(() => {
              if (node.textContent.length === 0) {
                return commands.BNUpdateBlock(state.selection.from, {
                  type: "paragraph",
                  props: {},
                });
              }

              return false;
            }),

          () =>
            // Splits the current block, moving content inside that's after the cursor to a new block of the same type
            // below.
            commands.command(() => {
              if (node.textContent.length > 0) {
                chain()
                  .deleteSelection()
                  .BNSplitBlock(state.selection.from, true)
                  .run();

                return true;
              }

              return false;
            }),
        ]);
      },
      "Mod-Enter": () => {
        const { node, contentType } = getBlockInfoFromPos(
          editor.state.doc,
          editor.state.selection.from
        )!;

        // If the current block is a todo block, do nothing.
        if (contentType.name.endsWith(BlockName.TODO)) {
          return true;
        }
        return false;
      },
      "Mod-a": () => {
        const { node, contentType, startPos, endPos } = getBlockInfoFromPos(
          editor.state.doc,
          editor.state.selection.from
        )!;
        if (!contentType.name.endsWith(BlockName.TODO)) {
          return false;
        }

        return editor.commands.setTextSelection({
          from: startPos,
          to: endPos,
        });
      },
    };
  },
  render: ({ block, editor }) => {
    return (
      <div className="flex items-center">
        <Checkbox
          isDisabled={editor.isEditable == false}
          onValueChange={(bol) => {
            editor.updateBlock(block, {
              props: {
                completed: bol ? "1" : "0",
              },
            });
          }}
          isSelected={block.props.completed == "1"}
        />
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
          <InlineContent
            className={cn("max-w-full break-words", {
              "line-through": block.props.completed == "1",
              "text-muted-foreground": block.props.completed == "1",
            })}
          />
        </div>
      </div>
    );
  },
});

export type TodoBlockSpec = typeof TodoBlockSpec;
