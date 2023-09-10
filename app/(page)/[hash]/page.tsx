import { OutHookConfigurator } from "@/components/OutHook";
// import Helmet from "@/components/helmet";
import Cover from "@/components/page/cover";
import TOC from "@/components/toc";
import PageWrapper from "@/components/page/page-wrapper";

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

export default function BlockPage({ params }: { params: { hash: string } }) {
  // const page = await getPageById(params.hash);

  // if (!page) {
  //   return null;
  // }
  // console.log(page)
  return (
    <>
      {/* <OutHookConfigurator /> */}
      <div className="flex ">
        <section className="h-screen  w-full flex flex-col items-center z-1 max-h-full ">
          <Cover />
          <TOC className="sticky h-0 top-10  left-5 self-start" />

          <PageWrapper id={params.hash} />
        </section>
      </div>
    </>
  );
}
