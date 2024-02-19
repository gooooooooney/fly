import Cover from "@/components/page/cover";
import TOC from "@/components/toc";
import PageWrapper from "@/components/page/page-wrapper";
import { notFound, redirect } from "next/navigation";
import { getSharePageSetting } from "@/prisma/services/pages/pages-services";
import { getUserAuth } from "@/lib/auth/utils";

async function getGithubEmojis() {
  const res = await fetch("https://api.github.com/emojis");
  const emojis = await res.json();
  return emojis;
}

async function getNotionIcons() {
  const res = await fetch("https://www.notion.so/icons/all");
  const icons = await res.json();
  return icons;
}

async function getLocalEmojis() {
  const res = await fetch("/api/emojis.json");
  const emojis = await res.json();
  return emojis;
}

export default async function BlockPage({ params }: { params: { hash: string, 'spaceName': string } }) {
  
  const userAuth = await getUserAuth();

  const shareSetting = await getSharePageSetting({ pageId: params.hash})


  if (!shareSetting) {
    notFound();
  }
  const isShared = shareSetting.ownerUserId !== userAuth.session?.user.id
  if (isShared && !shareSetting.enabled) {
    notFound()
  }
  return (
    <>
      {/* <OutHookConfigurator /> */}
      <div className="flex ">
        <section className="h-screen  w-full flex flex-col items-center z-1 max-h-full ">
          <div className="w-full">
            <Cover />
            <TOC className="sticky h-0 top-10  z-50 left-5 self-start" />
            <PageWrapper id={params.hash} />
          </div>
        </section>
      </div>
    </>
  );
}
