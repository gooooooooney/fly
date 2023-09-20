import { Callout } from "./callout-component";
import { InlineContent, createCustomReactBlockSpec } from "@/components/editor/utils/createReactSpec";
import { getBlockInfoFromPos } from "@/components/editor/utils/helper";
import { BlockName } from "@/constatns/block";
import { Selection } from "@tiptap/pm/state"

export const CalloutBlockSpec = createCustomReactBlockSpec({
  type: "callout",
  propSchema: {
    title: {
      default: "",
    },
    icon: {
      default: "💡",
    },
  },
  containsInlineContent: true,
  addKeyboardShortcuts({ editor }) {
    return {
      "Mod-Enter": () => editor.commands.first(({ state }) => [
        () => {
          const { node, contentType } = getBlockInfoFromPos(
            state.doc,
            state.selection.from
          )!;

          // If the current block is a callout block, do nothing.
          if (contentType.name.endsWith(BlockName.CALLOUT)) {
            return true;
          }
          return false;
        }
      ]),
      "Mod-a": () => editor.commands.first(({ state }) => [
        () => {
          const { contentType, startPos, endPos } = getBlockInfoFromPos(
            state.doc,
            state.selection.from
          )!;

          if (!contentType.name.endsWith(BlockName.CALLOUT)) {
            return false;
          }

          return editor.commands.setTextSelection({
            from: startPos + 1, // +1 to exclude the first character
            to: endPos,
          });
        },
      ])
    };
  },
  render: ({ block, editor }) => {
    return (
      <>
        <Callout
          setEmoji={(emoji) => {
            editor.updateBlock(block, {
              // type: "callout",
              props: {
                icon: emoji,
              },
            });
          }}
          className="flex bg-default-100 text-default-foreground items-start text-md rounded-sm max-w-3xl"
          icon={block.props.icon}
        >
          <div className="whitespace-pre-wrap text-base w-full max-w-full break-words">
            <InlineContent className="max-w-full break-words" />
          </div>
        </Callout>
      </>
    );
  },
});

export type CalloutBlockSpec = typeof CalloutBlockSpec;
