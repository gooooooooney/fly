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
                {/* <div className="relative items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline px-2 py-1 hover:after:opacity-100 after:content-[''] after:inset-0 after:opacity-0 after:w-full after:h-full after:rounded-xl after:transition-background after:absolute hover:after:bg-primary/20 flex cursor-pointer " >
                    <span className="mr-1">{block.props.icon}</span>
                    <span className="underline">{block.props.title}</span>
                    <InlineContent className="hidden" />
                </div> */}
                <NextLink href={`/${block.id}`}  className="relative items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline px-2 py-1 hover:after:opacity-100 after:content-[''] after:inset-0 after:opacity-0 after:w-full after:h-full after:rounded-xl after:transition-background after:absolute hover:after:bg-primary/20 flex cursor-pointer " >
                    <span className="mr-1">{block.props.icon}</span>
                    <span className="underline">{block.props.title}</span>
                    <InlineContent className="hidden" />
                </NextLink>

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