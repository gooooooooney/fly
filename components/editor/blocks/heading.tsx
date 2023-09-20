import { blockStyles, createTipTapBlock } from "@blocknote/core";
import { InputRule, mergeAttributes } from "@tiptap/core";


export const HeadingBlockContent = createTipTapBlock<"heading">({
  name: "heading",
  content: "inline*",

  addAttributes() {
    return {
      level: {
        default: "1",
        // instead of "level" attributes, use "data-level"
        parseHTML: (element) => element.getAttribute("data-level"),
        renderHTML: (attributes) => {
          return {
            "data-level": attributes.level,
          };
        },
      },
    };
  },

  addInputRules() {
    return [
      ...["1", "2", "3", "4"].map((level) => {
        // Creates a heading of appropriate level when starting with "#", "##", or "###".
        return new InputRule({
          find: new RegExp(`^(#{${parseInt(level)}})\\s$`),
          handler: ({ state, chain, range }) => {
            chain()
              .BNUpdateBlock(state.selection.from, {
                type: "heading",
                props: {
                  level: level as "1" | "2" | "3" | "4",
                },
              })
              // Removes the "#" character(s) used to set the heading.
              .deleteRange({ from: range.from, to: range.to });
          },
        });
      }),
    ];
  },

  parseHTML() {
    return [
      {
        tag: "h1",
        attrs: { level: "1" },
        node: "heading",
      },
      {
        tag: "h2",
        attrs: { level: "2" },
        node: "heading",
      },
      {
        tag: "h3",
        attrs: { level: "3" },
        node: "heading",
      },
      {
        tag: "h4",
        attrs: { level: "4" },
        node: "heading",
      },
      // {
      //   tag: "h5",
      //   attrs: { level: "5" },
      //   node: "heading",
      // },
      // {
      //   tag: "h6",
      //   attrs: { level: "6" },
      //   node: "heading",
      // },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        class: (blockStyles as any).blockContent,
        "data-content-type": this.name,
        "id": node.attrs.id
      }),
      ["h" + node.attrs.level, { class: (blockStyles as any).inlineContent }, 0],
    ];
  },
});
