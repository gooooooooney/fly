import { InlineContent, createCustomReactBlockSpec } from "@/components/editor/utils/createReactSpec";
import { getBlockInfoFromPos } from "@/components/editor/utils/helper";
import { TipTapNode } from "@blocknote/core";
import Blockquote from "@tiptap/extension-blockquote";
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";

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
      "Enter": ({}) => {
        const { node, contentType } = getBlockInfoFromPos(
          editor.state.doc,
          editor.state.selection.from
        )!;

        debugger
        // If the current block is a callout block, do nothing.
        if (contentType.name.endsWith("codeBlock")) {
          // bnEditor.getTextCursorPosition().block.content.push({
          //   type: "text",
          //   text: "\n",
          //   styles: {},
          // })
          return true;
        }
        // return false;
        return false
      
      },
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