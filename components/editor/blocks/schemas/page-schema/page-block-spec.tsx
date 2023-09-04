import { useBoundStore } from "@/hooks/store/useBoundStore";
import { getChildrenMenus } from "@/lib/data-source/menus";
import { findMenu, mergeMenus, setMenus } from "@/lib/menus";
import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec, InlineContent } from "@blocknote/react";
import { Link } from "@nextui-org/link";
import _ from "lodash";
import NextLink from "next/link";
import { useState } from "react";



export const PageBlockSpec = createReactBlockSpec({
    type: "page",
    propSchema: {
        ...defaultProps,
        emoji: {
            default: "📄"
        },
        title: {
            default: ""
        },
        cover: {
            default: ""
        },
        editable: {
            default: "1"
        }
    },
    containsInlineContent: true,
    render: ({ block }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isDataLoaded, setIsDataLoaded] = useState(false)

        const handleMouseEnter = () => {
            if (isDataLoaded) return;
            const items = useBoundStore.getState().menus
            const setItems = useBoundStore.getState().setMenus
            const item = findMenu(items, block.id)
            if (item && item.hasChildren) {
                const newMenus = _.cloneDeep(items)

                getChildrenMenus(item.id).then(res => {
                    setIsDataLoaded(true)
                    const newMenu = _.cloneDeep(item)
                    newMenu.children = res
                    setMenus(newMenus, newMenu)
                    setItems(mergeMenus(items, newMenus))
                })
            }
        }

        return (
            <>
                <Link as={NextLink}
                    onMouseEnter={handleMouseEnter}
                    contentEditable={false}
                    href={`/${block.id}`}
                    isBlock
                    className="data-[focus-visible=true]:outline-0 after:rounded-sm  hover:after:bg-primary/10 flex cursor-pointer " >
                    <span className="mr-1">{block.props.emoji}</span>
                    <span className="underline">{block.props.title || "Untitled"}</span>
                    <InlineContent className="hidden" />
                </Link>

            </>

        )
    }
})

export type PageBlockSpec = typeof PageBlockSpec


