import { Icons } from "@/components/icons";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { useUuidPathname } from "@/hooks/useUuidPathname";
import { saveProperty } from "@/lib/data-source/page";
// import {
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownSection,
//   DropdownTrigger,
// } from "@nextui-org/dropdown";

import { FC } from "react";
import { PageWidthConfig } from "./page-width";
import { setEditable } from "@/hooks/store/create-content-slice";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const enum DropdownMenuKeys {
  LOCK = "lock",
  PAGE_WIDTH = "page-width",
}



const DropdownDataMenus = {
  editSection: [
    {
      key: DropdownMenuKeys.LOCK,
    },
  ],
};

export const DropdownMenus: FC = () => {
  const [editable] = useBoundStore((s) => [
    s.editable,
  ]);
  const pageId = useUuidPathname();
  const saveEditable = () => {
    setEditable(!editable);
    saveProperty({
      pageId,
      data: {
        editable: !editable,
      },
    });
  };
  const handleAction = (key: DropdownMenuKeys) => {
    switch (key) {
      case DropdownMenuKeys.LOCK: {
        saveEditable();
        break;
      }
      default:
    }
  };
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <Icons.DotsHorizontal size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background w-40" >
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Page width</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent sideOffset={5} className="px-5">
                <PageWidthConfig />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            textValue={DropdownMenuKeys.LOCK}
            onClick={saveEditable}
            key={DropdownMenuKeys.LOCK}
          >
            {editable ? "Lock page" : "Unlock page"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  // return (
  //   <Dropdown>
  //     <DropdownTrigger>
  //       <Button variant="light" isIconOnly>
  //         <Icons.DotsHorizontal size={20} />
  //       </Button>
  //     </DropdownTrigger>
  //     <DropdownMenu
  //       itemClasses={{
  //         base: "data-[hover=true]:bg-default-100/80",
  //       }}
  //       onAction={handleAction as any}
  //       aria-label="edit"
  //     >
  //       <DropdownSection showDivider>
  //         <DropdownItem
  //           onClick={e => e.preventDefault()}
  //           textValue={DropdownMenuKeys.PAGE_WIDTH}
  //           endContent={<Icons.ChevronRightIcon />}
  //           key={DropdownMenuKeys.PAGE_WIDTH}
  //         >
  //           <PageWidthConfig />
  //         </DropdownItem>
  //       </DropdownSection>
  //       <DropdownSection>
  //         <DropdownItem
  //           textValue={DropdownMenuKeys.LOCK}
  //           key={DropdownMenuKeys.LOCK}
  //         >
  //           {editable ? "Lock page" : "Unlock page"}
  //         </DropdownItem>
  //       </DropdownSection>
  //     </DropdownMenu>
  //   </Dropdown>
  // );
};
