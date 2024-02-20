import { InlineContent, createCustomReactBlockSpec } from "@/components/editor/utils/createReactSpec";
import { defaultProps } from "@blocknote/core";

export const CustomSchema = createCustomReactBlockSpec({
  type: "custom",
  propSchema: {
    ...defaultProps,
  },
  containsInlineContent: true,
  render: ({ block }) => {
    return (
      <pre className="bg-muted">
        {/* <code> */}
          <InlineContent as="code" />
        {/* </code> */}
      </pre>
    );
  },
  addKeyboardShortcuts: (e) => {
    return {
        "Mod-A": () => {
            return e.editor.commands.exitCode()
        },
    }
  }
});

export type CustomSchema = typeof CustomSchema;
