import { InlineContent, createCustomReactBlockSpec } from "@/components/editor/utils/createReactSpec";

export const CodeBlockSpec = createCustomReactBlockSpec({
  type: "codeBlock",
  propSchema: {
    language: {
      default: "javascript",
    }
  },
  containsInlineContent: true,
  render(props) {

    return (
      <InlineContent >
        
      </InlineContent>
    )
  }
})

export type CodeBlockSpec = typeof CodeBlockSpec