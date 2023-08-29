import { MenuProp } from "@/hooks/store/create-content-slice";
import { Disclosure } from "@headlessui/react";
import { ListboxProps, Listbox, ListboxItem } from "@nextui-org/react";
import { cn } from "@nextui-org/system";
import _ from "lodash";
import Link from "next/link";
import { Toggle } from "./toggle";
import { SubMenu } from "./submenu";

export function Menus({
  items,
  itemWithoutChildClassName,
  ...props
}: ListboxProps & { items: MenuProp[]; itemWithoutChildClassName?: string }) {
  return (
    <Listbox
      aria-label="User Menu"
      // onAction={(key) => alert(key)}
      className="px-1 gap-0   divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible"
      items={items}
      itemClasses={{
        base: "rounded-md",
      }}
      {...props}
    >
      {(item: MenuProp) => {
        if (_.isArray(item.children) && item.children.length > 0) {
          return (
            <ListboxItem
              className="px-0 py-0    data-[hover=true]:bg-transparent h-fit"
              key={item.id}
            >
              <Disclosure as="div">
                {({ open }) => (
                  <>
                    <Toggle open={open} item={item} />
                    <SubMenu item={item} />
                  </>
                )}
              </Disclosure>
            </ListboxItem>
          );
        }
        return (
          <ListboxItem
            className={cn(
              "px-3 pl-[26px]   h-8 data-[hover=true]:bg-default-100/80",
              itemWithoutChildClassName,
              {
                "bg-default-100/80": item.isActive,
              }
            )}
            key={item.id}
          // startContent={<span className="w-5 h-5">{item.emoji}</span>}
          >
            <Link href={`/${item.id}`} className="flex-1 py-1.5 block">
              <span className="mr-1 inline-block w-5 h-5">
                {item.icon || "📄"}
              </span>
              {item.title || "Untitled"}
            </Link>
          </ListboxItem>
        );
      }}
    </Listbox>
  );
}