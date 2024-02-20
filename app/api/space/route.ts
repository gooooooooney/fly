import { NextResponse } from "next/server";
import {  getWorkspaces } from "@/prisma/services/workspace/workspcae-services";
import prisma from "@/lib/prisma"
import { getUserAuth } from "@/lib/auth/utils";



export interface AddSpaceResponse {
  head: {
    spaceId: string;
    pageId: string;
  };
  body: {
    page: {
      id: string;
      properties: {
        title: string;
        emoji: string;
      };
    };
    spaceName: string;
  };
}

export async function POST(request: Request) {
  const userAuth = await getUserAuth();
  if (!userAuth.session) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const requestBody = await request.json();
  const wp = await prisma?.workspace.create({
    data: {
      name: requestBody.name,
      avatar: requestBody.avatar,
      isActive: true,
      user: {
        connect: {
          id: userAuth.session.user.id
        }
      },
      pages: {
        // 为新空间创建第一个页面，后期可以删除
        create: {
          properties: {
            create: {
              
            }
          },
          sharePage: {
            create: {
              ownerUserId: userAuth.session.user.id,
            }
          }
        },

      }
    },
    select: {
      pages: true,
      id: true,
      name: true
    }
  })
  if (!wp) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
  return NextResponse.json({
    head: {
      spaceId: wp.id,
      pageId: wp.pages[0].id
    },
    body: {
      page: wp.pages[0],
      spaceName: wp.name,
    }
  });
}


export type SpaceResponse = HttpRequestData<ReturnTypePromiseFunc<typeof getWorkspaces>>

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const userAuth = await getUserAuth();
  if (!userAuth.session) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  try {
    const spaces = await getWorkspaces(userAuth.session.user.id, searchParams.get("pageId") ?? "")
    return NextResponse.json({
      head: { },
      body: spaces
    })
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}