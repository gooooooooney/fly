import { NextResponse } from "next/server";
import { saveProperty } from "@/prisma/services/pages/pages-services";
import { SavePropertyParams } from "@/types";
import { z } from "@/lib/zod";
import { getUserAuth } from "@/lib/auth/utils";

const schema: z.ZodSchema<HttpRequestData<SavePropertyParams>> = z.object({
    head: z.object({}),
    body: z.object({
        pageId: z.string().nonempty(),
        data: z.object({
            title: z.string().optional(),
            emoji: z.string().optional(),
            cover: z.string().optional(),
            editable: z.boolean().optional(),
        })
    })
})

export async function POST(request: Request) {
    const userAuth = await getUserAuth();
    if (!userAuth.session) {
        return new NextResponse("Unauthorized", { status: 403 });
    }
    const requestBody = await request.json() as HttpRequestData<SavePropertyParams>;
    if (!schema.safeParse(requestBody).success) {
        return new NextResponse("Bad Request", { status: 400 });
    }
    try {
        const res = await saveProperty(requestBody.body)
        return NextResponse.json({
            head: {

            },
            body: res
        })
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}