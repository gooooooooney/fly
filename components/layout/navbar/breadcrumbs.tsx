"use client"
import { MenuProp } from "@/hooks/store/create-content-slice";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { useUuidPathname } from "@/hooks/useUuidPathname";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { Fragment, useMemo } from "react";
import { useStore } from "zustand";

function findParents(tree: MenuProp[], targetId: string, currentPath: MenuProp[] = []): MenuProp[] | null {
  console.log(tree, targetId, currentPath)
  for (const node of tree) {
    const nodeId = node.id;
    const children = node.children;

    if (nodeId === targetId) {
      return [...currentPath, node];
    }

    if (children.length > 0) {
      const foundInChildren = findParents(children, targetId, [...currentPath, node]);
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  }

  return null;
}

export function Breadcrumbs() {
  const pageId = useUuidPathname()
  const menus = useStore(useBoundStore, (state) => state.menus)

  const breadcrumbs = useMemo(() => {
    const paths = findParents(menus, pageId)
    if (paths) {
      if (paths.length > 3) {
        const start = paths[0]
        const end = paths[paths.length - 1]
        const middle = paths.slice(1, paths.length - 1)
        return [
          {
            title: `${start.icon} ${start.title}`,
            id: start.id,
          },
          {
            title: "...",
            id: "",
            menus: middle.map((item) => ({ title: `${item.icon} ${item.title}`, id: item.id }))
          },
          {
            title: `${end.icon} ${end.title}`,
            id: end.id,
          }
        ]
      }
      return paths.map((item) => ({ title: `${item.icon} ${item.title}`, id: item.id }))
    }
    return []
  }, [pageId, menus])

  return (
    <div className="flex items-center">
      {
        breadcrumbs?.map((path, index) => {
          return (
            <Fragment key={path.id}>
              {
                path.menus ? (
                  <>
                    <Dropdown className="rounded-sm">
                      <DropdownTrigger>
                        <div className="cursor-pointer" >
                          {path.title}
                        </div>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Dynamic Actions" items={path.menus}>
                        {(item: any) => (
                          <DropdownItem
                            key={item.id}
                            
                            className="data-[hover=true]:bg-default-100/80"
                          >
                            <Link as={NextLink} href={`/${item.id}`}>{item.title}</Link>

                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                    <div className="text-divider mx-2">/</div>
                  </>
                )
                  : (
                    <>
                      <Link isDisabled={path.id === pageId} as={NextLink} href={`/${path.id}`}>{path.title}</Link>
                      {
                        index == breadcrumbs.length - 1 ? null : <div className="text-divider mx-2">/</div>
                      }
                    </>
                  )
              }
            </Fragment>
          )
        })
      }
    </div >
  )
}