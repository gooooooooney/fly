import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { saveProperty } from "@/prisma/services/pages/pages-services";
import { SavePropertyParams } from "@/types";


export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new NextResponse("Unauthorized", { status: 403 });
    }
    const requestBody = await request.json() as HttpRequestData<SavePropertyParams>;
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