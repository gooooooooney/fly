import {
  BlockConfig,
  BlockNoteDOMAttributes,
  BlockNoteEditor,
  BlockSchema,
  BlockSpec,
  blockStyles as styles,
  camelToDataKebab,
  createTipTapBlock,
  mergeCSSClasses,
  parse,
  PropSchema,
  propsToAttributes,
  render,
  TipTapNodeConfig,
} from "@blocknote/core";
import { Editor } from "@tiptap/core";
import {
  KeyboardShortcutCommand,
  NodeViewContent,
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  SingleCommands,
} from "@tiptap/react";
import { createContext, ElementType, FC, HTMLProps, useContext } from "react";
import { CustomBlockSchema } from "../blocks/custom-block-schema";

const blockStyles = styles as any;
type ContentType = "blockContainer" | "blockContent" | "inlineContent" | "blockContent*" | "blockContent+" | "paragraph+" | "paragraph*";
// extend BlockConfig but use a React render function
export type ReactBlockConfig<
  Type extends string,
  PSchema extends PropSchema,
  ContainsInlineContent extends boolean,
  BSchema extends BlockSchema
> = Omit<
  BlockConfig<Type, PSchema, ContainsInlineContent, BSchema>,
  "render"
> & {
  render: FC<{
    block: Parameters<
      BlockConfig<Type, PSchema, ContainsInlineContent, BSchema>["render"]
    >[0];
    editor: Parameters<
      BlockConfig<Type, PSchema, ContainsInlineContent, CustomBlockSchema>["render"]
    >[1];
  }>;
} & {
  addCommands?: (commands: any) => any;
  addKeyboardShortcuts?: (props: { editor: Editor, bnEditor: BlockNoteEditor<CustomBlockSchema> }) => {
    [key: string]: KeyboardShortcutCommand;
  };
  content?: ContentType;
};

const BlockNoteDOMAttributesContext = createContext<BlockNoteDOMAttributes>({});

export const InlineContent = <Tag extends ElementType>(
  props: { as?: Tag } & HTMLProps<Tag>
) => {
  const inlineContentDOMAttributes =
    useContext(BlockNoteDOMAttributesContext).inlineContent || {};

  const classNames = mergeCSSClasses(
    props.className || "",
    blockStyles.inlineContent,
    inlineContentDOMAttributes.class
  );

  return (
    <NodeViewContent
      {...Object.fromEntries(
        Object.entries(inlineContentDOMAttributes).filter(
          ([key]) => key !== "class"
        )
      )}
      {...props}
      className={classNames}
    />
  );
};

// A function to create custom block for API consumers
// we want to hide the tiptap node from API consumers and provide a simpler API surface instead
export function createCustomReactBlockSpec<
  BType extends string,
  PSchema extends PropSchema,
  ContainsInlineContent extends boolean,
  BSchema extends BlockSchema
>(
  blockConfig: ReactBlockConfig<BType, PSchema, ContainsInlineContent, BSchema>
): BlockSpec<BType, PSchema, true> {
  const node = createTipTapBlock<
    BType,
    true,
    {
      editor: BlockNoteEditor<CustomBlockSchema>;
      domAttributes?: BlockNoteDOMAttributes;
    }
  >({
    name: blockConfig.type,
    content: blockConfig.containsInlineContent ? "inline*" : blockConfig.content as any, 
    selectable: blockConfig.containsInlineContent,

    addAttributes() {
      return propsToAttributes(blockConfig);
    },

    parseHTML() {
      return parse(blockConfig);
    },

    renderHTML({ HTMLAttributes }) {
      return render(blockConfig, HTMLAttributes);
    },

    addCommands() {
      return blockConfig.addCommands ? blockConfig.addCommands({}) : {};
    },

    addKeyboardShortcuts() {
      const result = blockConfig.addKeyboardShortcuts
        ? blockConfig.addKeyboardShortcuts({
          editor: this.editor,
          bnEditor: this.options.editor! as BlockNoteEditor<CustomBlockSchema>,
        })
        : {};
      return result;
    },

    addNodeView() {
      const BlockContent: FC<NodeViewProps> = (props: NodeViewProps) => {
        const Content = blockConfig.render;

        // Add custom HTML attributes
        const blockContentDOMAttributes =
          this.options.domAttributes?.blockContent || {};

        // Add props as HTML attributes in kebab-case with "data-" prefix
        const htmlAttributes: Record<string, string> = {};
        for (const [attribute, value] of Object.entries(props.node.attrs)) {
          if (
            attribute in blockConfig.propSchema &&
            value !== blockConfig.propSchema[attribute].default
          ) {
            htmlAttributes[camelToDataKebab(attribute)] = value;
          }
        }

        // Gets BlockNote editor instance
        const editor = this.options.editor! as BlockNoteEditor<
          CustomBlockSchema & { [k in BType]: BlockSpec<BType, PSchema, true> }
        > as any;
        // Gets position of the node
        const pos =
          typeof props.getPos === "function" ? props.getPos() : undefined;
        // Gets TipTap editor instance
        const tipTapEditor = editor._tiptapEditor;
        // Gets parent blockContainer node
        const blockContainer = tipTapEditor.state.doc.resolve(pos!).node();
        // Gets block identifier
        const blockIdentifier = blockContainer.attrs.id;
        // Get the block
        const block = editor.getBlock(blockIdentifier)!;
        if (block.type !== blockConfig.type) {
          throw new Error("Block type does not match");
        }

        return (
          <NodeViewWrapper
            {...Object.fromEntries(
              Object.entries(blockContentDOMAttributes).filter(
                ([key]) => key !== "class"
              )
            )}
            className={mergeCSSClasses(
              blockStyles.blockContent,
              blockContentDOMAttributes.class
            )}
            data-content-type={blockConfig.type}
            {...htmlAttributes}
          >
            <BlockNoteDOMAttributesContext.Provider
              value={this.options.domAttributes || {}}
            >
              <Content block={block as any} editor={editor} />
            </BlockNoteDOMAttributesContext.Provider>
          </NodeViewWrapper>
        );
      };

      return ReactNodeViewRenderer(BlockContent, {
        className: blockStyles.reactNodeViewRenderer,
      });
    },
  });

  return {
    node: node,
    propSchema: blockConfig.propSchema,
  };
}
