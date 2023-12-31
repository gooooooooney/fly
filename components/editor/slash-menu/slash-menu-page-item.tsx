import { ReactSlashMenuItem } from "@blocknote/react";
import { Icons } from "../../icons";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { addNewPage } from "@/lib/data-source/page";
import { MenuProp, setMenus } from "@/hooks/store/create-content-slice";
import cloneDeep from "lodash/cloneDeep";
import { CustomBlockSchema } from "../blocks/custom-block-schema";
import { toast } from "sonner";

export function insertOrUpdateBlock(editor: BlockNoteEditor, block: any) {
  const currentBlock = editor.getTextCursorPosition().block;
  if (
    (currentBlock.content?.length === 1 &&
      currentBlock.content[0].type === "text" &&
      currentBlock.content[0].text === "/") ||
    currentBlock.content?.length === 0
  ) {
    editor.updateBlock(currentBlock, block);
    const { block: b, nextBlock } = editor.getTextCursorPosition()
    editor.setTextCursorPosition(nextBlock || b);
  } else {
    editor.insertBlocks([block], currentBlock, "after");
    editor.setTextCursorPosition(editor.getTextCursorPosition().nextBlock!);
  }
}

// Custom Slash Menu item which executes the above function.
export const SlashMenuPageItem: ReactSlashMenuItem<CustomBlockSchema> = {
  name: "Page",
  execute: (editor) => {
    const childBlock = editor.getTextCursorPosition().block;
    const pageId = useBoundStore.getState().pageId;
    const { menus } = useBoundStore.getState();
    insertOrUpdateBlock(editor, {
      type: "page",
    });
    // saveBlocks({
    //   pageId,
    //   blocks: editor.topLevelBlocks
    // })
    // save({
    //   pageId,
    //   operations: [
    //     {
    //       command: "insert",
    //       data: [childBlock],
    //     },
    //   ],
    // });
    // OutHook.useRouter.push(`/${childBlock.id}`)
    // const spaceId = document.querySelector("#spaceid")?.getAttribute("data-spaceid")!
    const addPageToMenus = () => {
      const item: MenuProp = {
        id: childBlock.id,
        title: "",
        icon: "",
        isActive: false,
        hasChildren: false,
        children: [],
      }
      const cloneMenus = cloneDeep(menus)
      const setChild = (menus: MenuProp[]) => {
        for (const menu of menus) {
          if (menu.id === pageId) {
            menu.children = [...menu.children, item]
            break
          } else {
            menu.children && setChild(menu.children)
          }
        }
      }
      setChild(cloneMenus)
      setMenus(cloneMenus)
    }

    addPageToMenus()
    addNewPage({
      pageId,
      blockId: childBlock.id,
      spaceId: useBoundStore.getState().workspaceId,
    }).then((res: any) => {
      if (res.body.error) {
        toast.error(res.body.error)
        editor.removeBlocks([childBlock])
      }
    });
  },
  aliases: ["page"],
  group: "Basic blocks",
  icon: <Icons.File size={18} />,
  hint: "Embed a sub-page inside this page.",
};
