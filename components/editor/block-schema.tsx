import { BlockSchema, defaultBlockSchema, defaultProps } from "@blocknote/core";
import { createReactBlockSpec, InlineContent } from "@blocknote/react";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";


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
        return (
            <>
                <Link as={NextLink}
                    href={`/${block.id}`}
                    isBlock
                    className=" after:rounded-sm  hover:after:bg-primary/10 flex cursor-pointer " >
                    <span className="mr-1">{block.props.icon}</span>
                    <span className="underline">{block.props.title}</span>
                    <InlineContent className="hidden" />
                </Link>

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