import Helmet from "@/components/helmet";
import Cover from "@/components/page/cover";
import IconAndCover from "@/components/page/icon-cover";
import { PageTitle } from "@/components/page/page-title";
import { Separator } from "@/components/ui/separator";
import { getCollections } from "@/lib/unsplash/getCollections";
import dynamic from "next/dynamic";

async function getGithubEmojis() {
  const res = await fetch("https://api.github.com/emojis")
  const emojis = await res.json()
  return emojis
}

async function getNotionIcons() {
  const res = await fetch("https://www.notion.so/icons/all")
  const icons = await res.json()
  return icons
}

async function getLocalEmojis() {
  const res = await fetch("/api/emojis.json")
  const emojis = await res.json()
  return emojis
}
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });


export default async function BlockPage() {
  return (
    <>
      <Helmet />
      <section className="h-screen   w-full flex flex-col items-center z-1 overflow-auto max-h-full ">
        <Cover />
        <div className="max-w-3xl flex flex-col w-full  ">
          <div className="flex flex-col w-full">
            <div className="group">
              <IconAndCover />
              <PageTitle />
            </div>
          </div>
          <Separator />

          <section className="w-full flex mt-8">
            <Editor />
          </section>
        </div>
      </section>
    </>
  )
}