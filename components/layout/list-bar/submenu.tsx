import { MenuProp } from "@/hooks/store/create-content-slice";
import { Disclosure } from "@headlessui/react";
import { cn } from "@nextui-org/system";
import { Menus } from "./menu";

export function SubMenu({ item }: { item: MenuProp }) {
  return (
    <Disclosure.Panel
      as="div"
      unmount={false}

    >
      <Menus className={cn(
        "p-0 gap-0 pl-[1em] pt-[1px]   dark:divide-default-100/80  max-w-xs overflow-visible "
      )}
        itemWithoutChildClassName="pl-[14px]"
        items={item.children} />
    </Disclosure.Panel>
  );
}