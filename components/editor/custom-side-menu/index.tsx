import { Icons } from "@/components/icons";
import { AddBlockButton, DragHandle, SideMenuProps } from "@blocknote/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { CustomBlockSchema } from "../blocks/custom-block-schema";
// import { DragHandle } from "./drag-handle";
// import { AddBlocks } from "./add-blocks";

export const CustomSideMenu = (props: SideMenuProps<CustomBlockSchema>) => (
  <section className="flex items-center">

    {
      props.block.type !== "page" && (
        // <AddBlocks {...props} />
        <AddBlockButton {...props} />
      )
    }
    <DragHandle {...props} />

  </section>
);