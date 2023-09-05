import { BlockNoteDOMAttributes, createTipTapBlock, mergeCSSClasses, blockStyles } from "@blocknote/core";
import { mergeAttributes, textblockTypeInputRule } from "@tiptap/core";
import { Plugin, PluginKey, TextSelection } from '@tiptap/pm/state'

export const backtickInputRegex = /^```([a-z]+)?[\s\n]$/
export const tildeInputRegex = /^~~~([a-z]+)?[\s\n]$/
const styles = blockStyles as any

export interface CodeBlockOptions {
  /**
   * Adds a prefix to language classes that are applied to code tags.
   * Defaults to `'language-'`.
   */
  languageClassPrefix: string
  /**
   * Define whether the node should be exited on triple enter.
   * Defaults to `true`.
   */
  exitOnTripleEnter: boolean
  /**
   * Define whether the node should be exited on arrow down if there is no node after it.
   * Defaults to `true`.
   */
  exitOnArrowDown: boolean
  /**
   * Custom HTML attributes that should be added to the rendered HTML tag.
   */
  HTMLAttributes: Record<string, any>

  domAttributes?: BlockNoteDOMAttributes;

}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    codeBlock: {
      /**
       * Set a code block
       */
      setCodeBlock: (attributes?: { language: string }) => ReturnType
      /**
       * Toggle a code block
       */
      toggleCodeBlock: (attributes?: { language: string }) => ReturnType
    }
  }
}

export type CodeBlockSpec = typeof CodeBlockSpec
export const CodeBlockSpec = {
  propSchema: {},
  node: createTipTapBlock<"codeBlock", CodeBlockOptions>({
    name: "codeBlock",
    content: "inline*",
    addOptions() {
      return {
        languageClassPrefix: 'language-',
        exitOnTripleEnter: true,
        exitOnArrowDown: true,
        HTMLAttributes: {},
        domAttributes: {},
      }

    },
    addAttributes() {
      return {
        language: {
          default: null,
          parseHTML: element => {
            const { languageClassPrefix } = this.options
            const classNames = [...(element.firstElementChild?.classList || [])]
            const languages = classNames
              .filter(className => className.startsWith(languageClassPrefix))
              .map(className => className.replace(languageClassPrefix, ''))
            const language = languages[0]

            if (!language) {
              return null
            }

            return language
          },
          rendered: false,
        },
      }
    },

    parseHTML() {
      return [
        {
          tag: 'pre',
          preserveWhitespace: 'full',
        },
      ]
    },
    renderHTML({ node, HTMLAttributes }) {
      return [
        'pre',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        [
          'code',
          {
            class: node.attrs.language
              ? this.options.languageClassPrefix + node.attrs.language
              : null,
          },
          0,
        ],
      ]
    },
    addNodeView() {
      return ({ HTMLAttributes, getPos }) => {
        // Create blockContent element
        const blockContent = document.createElement("div");
        const blockConfig = {
          type: "codeBlock",
          render: (block: any, editor: any) => {
            return {
              dom: document.createElement("div"),
              contentDOM: document.createElement("div"),
            }
          }
        }
        // Add custom HTML attributes
        const blockContentDOMAttributes =
          this.options.domAttributes?.blockContent || {};
        for (const [attribute, value] of Object.entries(
          blockContentDOMAttributes
        )) {
          if (attribute !== "class") {
            blockContent.setAttribute(attribute, value);
          }
        }
        // Set blockContent & custom classes
        blockContent.className = mergeCSSClasses(
          styles.blockContent,
          blockContentDOMAttributes.class
        );
        // Add blockContent HTML attribute
        blockContent.setAttribute("data-content-type", blockConfig.type);
        // Add props as HTML attributes in kebab-case with "data-" prefix
        for (const [attribute, value] of Object.entries(HTMLAttributes)) {
          blockContent.setAttribute(attribute, value);
        }
console.log(this.options, "this.options")
        // Gets BlockNote editor instance
        const editor = this.options.editor! as BlockNoteEditor<
          BSchema & {
            [k in BType]: BlockSpec<BType, PSchema, ContainsInlineContent>;
          }
        >;
        // Gets position of the node
        if (typeof getPos === "boolean") {
          throw new Error(
            "Cannot find node position as getPos is a boolean, not a function."
          );
        }
        const pos = getPos();
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

        // Render elements
        const rendered = blockConfig.render(block as any, editor);
        // Add HTML attributes to contentDOM
        if ("contentDOM" in rendered) {
          const inlineContentDOMAttributes =
            this.options.domAttributes?.inlineContent || {};
          // Add custom HTML attributes
          for (const [attribute, value] of Object.entries(
            inlineContentDOMAttributes
          )) {
            if (attribute !== "class") {
              rendered.contentDOM.setAttribute(attribute, value);
            }
          }
          // Merge existing classes with inlineContent & custom classes
          rendered.contentDOM.className = mergeCSSClasses(
            rendered.contentDOM.className,
            styles.inlineContent,
            inlineContentDOMAttributes.class
          );
        }
        // Add elements to blockContent
        blockContent.appendChild(rendered.dom);

        return "contentDOM" in rendered
          ? {
              dom: blockContent,
              contentDOM: rendered.contentDOM,
              // destroy: rendered.destroy,
            }
          : {
              dom: blockContent,
              // destroy: rendered.destroy,
            };
      };
    },

    addCommands() {
      return {
        setCodeBlock:
          attributes => ({ commands }) => {
            return commands.setNode(this.name, attributes)
          },
        toggleCodeBlock:
          attributes => ({ commands }) => {
            return commands.toggleNode(this.name, 'paragraph', attributes)
          },
      }
    },

    addKeyboardShortcuts() {
      return {
        'Mod-Alt-c': () => this.editor.commands.toggleCodeBlock(),

        // remove code block when at start of document or code block is empty
        Backspace: () => {
          const { empty, $anchor } = this.editor.state.selection
          const isAtStart = $anchor.pos === 1

          if (!empty || $anchor.parent.type.name !== this.name) {
            return false
          }

          if (isAtStart || !$anchor.parent.textContent.length) {
            return this.editor.commands.clearNodes()
          }

          return false
        },

        // exit node on triple enter
        Enter: ({ editor }) => {
          if (!this.options.exitOnTripleEnter) {
            return false
          }

          const { state } = editor
          const { selection } = state
          const { $from, empty } = selection

          if (!empty || $from.parent.type !== this.type) {
            return false
          }

          const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2
          const endsWithDoubleNewline = $from.parent.textContent.endsWith('\n\n')

          if (!isAtEnd || !endsWithDoubleNewline) {
            return false
          }

          return editor
            .chain()
            .command(({ tr }) => {
              tr.delete($from.pos - 2, $from.pos)

              return true
            })
            .exitCode()
            .run()
        },

        // exit node on arrow down
        ArrowDown: ({ editor }) => {
          if (!this.options.exitOnArrowDown) {
            return false
          }

          const { state } = editor
          const { selection, doc } = state
          const { $from, empty } = selection

          if (!empty || $from.parent.type !== this.type) {
            return false
          }

          const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2

          if (!isAtEnd) {
            return false
          }

          const after = $from.after()

          if (after === undefined) {
            return false
          }

          const nodeAfter = doc.nodeAt(after)

          if (nodeAfter) {
            return false
          }

          return editor.commands.exitCode()
        },
      }
    },

    addInputRules() {
      return [
        textblockTypeInputRule({
          find: backtickInputRegex,
          type: this.type,
          getAttributes: match => ({
            language: match[1],
          }),
        }),
        textblockTypeInputRule({
          find: tildeInputRegex,
          type: this.type,
          getAttributes: match => ({
            language: match[1],
          }),
        }),
      ]
    },

    addProseMirrorPlugins() {
      return [
        // this plugin creates a code block for pasted content from VS Code
        // we can also detect the copied code language
        new Plugin({
          key: new PluginKey('codeBlockVSCodeHandler'),
          props: {
            handlePaste: (view, event) => {
              if (!event.clipboardData) {
                return false
              }

              // don’t create a new code block within code blocks
              if (this.editor.isActive(this.type.name)) {
                return false
              }

              const text = event.clipboardData.getData('text/plain')
              const vscode = event.clipboardData.getData('vscode-editor-data')
              const vscodeData = vscode ? JSON.parse(vscode) : undefined
              const language = vscodeData?.mode

              if (!text || !language) {
                return false
              }

              const { tr } = view.state

              // create an empty code block
              tr.replaceSelectionWith(this.type.create({ language }))

              // put cursor inside the newly created code block
              tr.setSelection(TextSelection.near(tr.doc.resolve(Math.max(0, tr.selection.from - 2))))

              // add text to code block
              // strip carriage return chars from text pasted as code
              // see: https://github.com/ProseMirror/prosemirror-view/commit/a50a6bcceb4ce52ac8fcc6162488d8875613aacd
              tr.insertText(text.replace(/\r\n?/g, '\n'))

              // store meta information
              // this is useful for other plugins that depends on the paste event
              // like the paste rule plugin
              tr.setMeta('paste', true)

              view.dispatch(tr)

              return true
            },
          },
        }),
      ]
    },
  })
}

