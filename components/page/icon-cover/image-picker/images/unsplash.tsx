
import { gradientColors, pureColors, spaceBackgrounds } from "@/constatns/images/unsplash";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";

import { useBoundStore } from "@/hooks/store/useBoundStore";
import { saveProperty } from "@/lib/data-source/page";
import { useUuidPathname } from "@/hooks/useUuidPathname";
import { setCover } from "@/hooks/store/create-content-slice";
export const UnsplashImages = () => {
  const pageId = useUuidPathname()
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
      <Link isBlock href="https://unsplash.com/s/photos/pure-color" className="my-2 px-3 text-[#37352fa6] dark:text-[#ffffff71]" target="_blank" underline="none" as={NextLink}>
        Pure Color
      </Link>
      <div className="w-full flex items-start px-3 flex-wrap">


        {pureColors.map((item, index) => (
          <div className="w-1/4 p-[3px]" key={item.id}>
            <Image
              onClick={() => setUrl(item.urls.raw)}
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
              src={item.urls.small}
              alt="NextUI hero Image"
            />
          </div>
        ))}
      </div>
      <Link isBlock href="https://unsplash.com/s/photos/gradient-color" className="my-2 px-3 text-[#37352fa6] dark:text-[#ffffff71]" target="_blank" underline="none" as={NextLink}>
        Gradient Color
      </Link>
      <div className="w-full flex items-start px-3 flex-wrap">


        {gradientColors.map((item, index) => (
          <div className="w-1/4 p-[3px]" key={item.id}>
            <Image
              classNames={{
                wrapper: "!max-w-full",
              }}
              onClick={() => setUrl(item.urls.raw)}
              as={NextImage}
              width={0}
              className="w-full cursor-pointer h-16"
              height={64}
              sizes="100vw"
              isZoomed
              radius="none"
              src={item.urls.small}
              alt="NextUI hero Image"
            />
          </div>
        ))}


      </div>
      <Link isBlock href="https://unsplash.com/s/photos/universe" className="my-2 px-3 text-[#37352fa6] dark:text-[#ffffff71]" target="_blank" underline="none" as={NextLink}>
        Universe
      </Link>
      <div className="w-full flex items-start px-3 flex-wrap">


        {spaceBackgrounds.map((item, index) => (
          <div className="w-1/4 p-[3px]" key={item.id}>
            <Image
              classNames={{
                wrapper: "!max-w-full",
              }}
              onClick={() => setUrl(item.urls.raw)}
              as={NextImage}
              width={0}
              className="w-full cursor-pointer h-16"
              height={64}
              sizes="100vw"
              isZoomed
              radius="none"
              src={item.urls.small}
              alt="NextUI hero Image"
            />
          </div>
        ))}


      </div>
    </>

  )
}