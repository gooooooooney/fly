import { InlineContent, createCustomReactBlockSpec } from "@/components/editor/utils/createReactSpec";
import { getBlockInfoFromPos } from "@/components/editor/utils/helper";

// export const CodeBlockSpec = {
//   node: Blockquote.extend({
//     name: "codeBlock",
//     group: "blockContent",
//     content: "blockContent*",
//     addNodeView() {
//       return ReactNodeViewRenderer(() => {
//         return (
//           <NodeViewWrapper >

//             <pre className="h-20 w-full bg-muted">
//               <NodeViewContent as="code"></NodeViewContent>
//             </pre>
//           </NodeViewWrapper>
//         )
//       })
//     }
//   }) as TipTapNode<"codeBlock">,
//   propSchema: {},
// }
export const CodeBlockSpec = createCustomReactBlockSpec({
  type: "codeBlock",
  content: "blockContent*",
  propSchema: {
    language: {
      default: "javascript",
    }
  },
  addKeyboardShortcuts({ editor, bnEditor }) {
    return {
      "Enter": () => editor.commands.first(({ commands }) => [
        ({ state }) => {
          const { node, contentType } = getBlockInfoFromPos(
            state.doc,
            state.selection.from
          )!;

          // If the current block is a callout block, do nothing.
          if (contentType.name.endsWith("codeBlock")) {

            return commands.BNUpdateBlock(state.selection.from, {
              content: [
                {
                  type: "text",
                  text: "hello"
                }
              ]
            });
          }
          // return false;
          return false

        },
      ]),
    };
  },
  containsInlineContent: true,
  render(props) {

    return (
      <pre className="min-h-unit-10 bg-muted rounded-sm">
        <code>
          <InlineContent />
        </code>
      </pre>
    )
  }
})

export type CodeBlockSpec = typeof CodeBlockSpec