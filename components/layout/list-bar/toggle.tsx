import { Icons } from "@/components/icons";
import { MenuProp } from "@/hooks/store/create-content-slice";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { getChildrenMenus } from "@/lib/data-source/menus";
import { setMenus } from "@/lib/menus";
import { Disclosure } from "@headlessui/react";
import { cn } from "@nextui-org/system";
import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";
import Link from "next/link";
import { useState } from "react";
import { useStore } from "zustand";





export function Toggle({ open, item }: { open: boolean; item: MenuProp }) {
  const [items, setItems] = useStore(useBoundStore, (state) => [
    state.menus,
    state.setMenus,
  ])!;
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  
  return (
    <div
      onMouseEnter={async () => {
        if (!open) {
          if (isDataLoaded) return;
          const newMenus = _.cloneDeep(items)

          Promise.all(item.children
            .filter(v => v.hasChildren)
            .map(async (v) =>
              v && getChildrenMenus(v.id).then(res => {
                setIsDataLoaded(true)
                const newMenu = _.cloneDeep(v)
                newMenu.children = res
                return newMenu
              })))
            .then(res => {
              res.forEach(v => {
                setMenus(newMenus, v)
              })
              res.length &&  setItems(newMenus)
            })
          // if (res) {
          //   const newMenu = _.cloneDeep(v)
          //   const newMenus = _.cloneDeep(items)
          //   newMenu.children = res
          //   setMenus(newMenus, newMenu)
          //   setItems(newMenus)

          // }
        }
      }}
      className={cn(
        [
          "hover:bg-default-100/80",
          "hover:text-default-foreground",
          "flex",
          "group",
          "items-center",
          "justify-between",
          "relative",
          "py-1.5",
          "w-full",
          "box-border",
          "subpixel-antialiased",
          "cursor-pointer",
          "tap-highlight-transparent",
          "outline-none",
          "px-3",
          "h-8",
          "rounded-md",
        ],
        {
          "bg-default-100/80": item.isActive,
        }
      )}
    >
      <Disclosure.Button

      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            className="text-lg"
            key={open ? "less" : "more"}
            initial={{
              rotate: open ? -90 : 90,
            }}
            animate={{
              zIndex: 1,
              rotate: 0,
              transition: {
                type: "tween",
                duration: 0.15,
                ease: "circOut",
              },
            }}
            exit={{
              zIndex: 0,
              rotate: open ? -90 : 90,
              transition: {
                type: "tween",
                duration: 0.15,
                ease: "circIn",
              },
            }}
          >
            {open ? <Icons.TriangleDownIcon /> : <Icons.TriangleRightIcon />}
          </motion.div>
        </AnimatePresence>

        {/* <motion.div
        className="mr-1"
        animate={{
          rotate: open ? 90 : 0,
        }}
        transition={{
          duration: 0.1,
        }}
      >
        <Icons.ChevronRightIcon />
      </motion.div> */}
      </Disclosure.Button>
      <Link href={`/${item.id}`} className="flex-1">
        <span className="mr-1 inline-block w-5 h-5">{item.icon || "📄"}</span>
        {item.title || "Untitled"}
      </Link>
    </div>
  );
}