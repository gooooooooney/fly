import { OutHookConfigurator } from "@/components/OutHook";
import { EditorWrapper } from "@/components/editor";
// import Helmet from "@/components/helmet";
import Cover from "@/components/page/cover";
import IconAndCover from "@/components/page/icon-cover";
import { PageTitle } from "@/components/page/page-title";
import { Separator } from "@/components/ui/separator";
import { getPageById } from "@/prisma/services/pages/pages-services";
import { redirect } from "next/navigation";
import { StoreInitializer } from "./store-initializer";
import { useBoundStore } from "@/hooks/store/useBoundStore";
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

export default async function BlockPage({
  params,
}: {
  params: { hash: string };
}) {
  // const page = await getPageById(params.hash);

  // if (!page) {
  //   return null;
  // }
  // console.log(page)
  return (
    <>
      {/* <OutHookConfigurator /> */}
      <>
        <section
          className="h-screen  w-full flex flex-col items-center z-1 max-h-full "
        >
          <Cover />
          <section className="max-w-3xl flex flex-col w-full flex-grow ">
            <div className="flex flex-col w-full">
              <div className="group">
                <IconAndCover id={params.hash} />
                <PageTitle id={params.hash} />
              </div>
            </div>
            <Separator />

            <section className=" flex-grow flex flex-col mt-8">
              <EditorWrapper 
              // blocks={page?.blocks as any} 
              />
            </section>
          </section>
        </section>
      </>
    </>
  );
}
