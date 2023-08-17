import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";


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
  };
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
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
          id: session.user.id
        }
      },
      pages: {
        // 为新空间创建第一个页面，后期可以删除
        create: {
          properties: {
            create: {
              title: "Untitled",
              emoji: "📝",
            }
          }
        },

      }
    },
    select: {
      pages: true,
      id: true
    }
  })
  if (!wp) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
  // console.log(wp)
  // redirect(`/${wp.pages[0].id}`)
  return NextResponse.json({
    head: {
      spaceId: wp.id,
      pageId: wp.pages[0].id
    },
    body: {
      page: wp.pages[0]
    }
  });
}