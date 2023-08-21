
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";

import { useBoundStore } from "@/hooks/store/useBoundStore";
import { useStore } from "zustand";
import { loves, nature, outdoor } from "@/constatns/images/pelexs";
import { saveProperty } from "@/lib/data-source/page";
export const PelexsImages = () => {
  const [setCover, pageId] = useStore(useBoundStore, (state) => [state.setCover, state.pageId])
  const setUrl = (url: string) => {
    setCover(url)
    saveProperty({
      pageId: pageId,
      data: {
        cover: url
      }
    })
  }
  return (
    <>
      <Link isBlock href="https://www.pexels.com/search/nature" className="my-2 px-3 text-[#37352fa6] dark:text-[#ffffff71]" target="_blank" underline="none" as={NextLink}>
        Nature
      </Link>
      <div className="w-full flex items-start px-3 flex-wrap">


        {nature.map((item, index) => (
          <div className="w-1/4 p-[3px]" key={item.id}>
            <Image
              onClick={() => setUrl(item.src.original)}
              classNames={{
                wrapper: "!max-w-full",
              }}
              as={NextImage}
              width={0}
              className="w-full cursor-pointer h-16"
              height={64}
              fallbackSrc
              sizes="100vw"
              isZoomed
              radius="none"
              src={item.src.original}
              alt="NextUI hero Image"
            />
          </div>
        ))}
      </div>
      <Link isBlock href="https://www.pexels.com/search/outdoor/" className="my-2 px-3 text-[#37352fa6] dark:text-[#ffffff71]" target="_blank" underline="none" as={NextLink}>
        Outdoor
      </Link>
      <div className="w-full flex items-start px-3 flex-wrap">


        {outdoor.map((item, index) => (
          <div className="w-1/4 p-[3px]" key={item.id}>
            <Image
              classNames={{
                wrapper: "!max-w-full",
              }}
              onClick={() => setUrl(item.src.original)}
              as={NextImage}
              width={0}
              className="w-full cursor-pointer h-16"
              height={64}
              sizes="100vw"
              isZoomed
              radius="none"
              src={item.src.original}
              alt="NextUI hero Image"
            />
          </div>
        ))}


      </div>
      <Link isBlock href="https://www.pexels.com/search/love" className="my-2 px-3 text-[#37352fa6] dark:text-[#ffffff71]" target="_blank" underline="none" as={NextLink}>
        Love
      </Link>
      <div className="w-full flex items-start px-3 flex-wrap">


        {loves.map((item, index) => (
          <div className="w-1/4 p-[3px]" key={item.id}>
            <Image
              classNames={{
                wrapper: "!max-w-full",
              }}
              onClick={() => setUrl(item.src.original)}
              as={NextImage}
              width={0}
              className="w-full cursor-pointer h-16"
              height={64}
              sizes="100vw"
              isZoomed
              radius="none"
              src={item.src.original}
              alt="NextUI hero Image"
            />
          </div>
        ))}


      </div>
    </>

  )
}