/* eslint-disable react-hooks/rules-of-hooks */
import { db } from "@/lib/models/db";
import { addPageInfo } from "@/lib/models/init-db";
import { UpdatePageInfo } from "@/lib/models/update-page-info";
import { BlockSchema, defaultBlockSchema, defaultProps } from "@blocknote/core";
import { createReactBlockSpec, InlineContent } from "@blocknote/react";
import { Link } from "@nextui-org/link";
import { set } from "lodash";

import { useParams, useRouter } from 'next/navigation'

export const PageBlock = createReactBlockSpec({
    type: "page",
    propSchema: {
        ...defaultProps,
        icon: {
            default: "📄"
        },
        title: {
            default: "Untitled"
        }
    },
    containsInlineContent: true,
    render: ({ block }) => {
        const params = useParams()
        const router = useRouter()
        return (
            <>
                <div onClick={() => {
                    addPageInfo({
                        id: block.id,
                        parentId: params.hash as string,
                    })
                    router.push(`/${block.id}`)
                }} className="flex hover:bg-foreground-50 cursor-pointer" >


                    <span className="mr-1">{block.props.icon}</span>
                    <span className="underline">{block.props.title}</span>
                    <InlineContent className="hidden" />
                </div>

            </>

        )
    }
})

export type PageBlockSpec = typeof PageBlock


export const blockSchema = {
    ...defaultBlockSchema,
    page: PageBlock
} satisfies BlockSchema

export type CustomBlockSchema = typeof blockSchema