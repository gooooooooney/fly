import Editor from "@/components/editor";
import IconAndCover from "@/components/icon-cover";
import { Icons } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";

export default function BlockPage() {
  return (
    <section className="h-screen  w-full flex flex-col items-center z-1 overflow-auto max-h-full ">

      <section className="w-full">
        <Image
          as={NextImage}
          width={0}
          className="w-full h-[30vh] "
          height={0}
          sizes="100vw"
          isZoomed
          removeWrapper
          radius="none"
          src="/notion.jpeg"
          alt="NextUI hero Image"
        />
      </section>


      <div className="max-w-3xl flex flex-col w-full px-6 pt-9 ">

        <section className="group">
          <IconAndCover />
        </section>
        <Editor />
      </div>
    </section>
  )
}