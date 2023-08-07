
"use client"

import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { useStore } from "zustand";
import { Button } from "@nextui-org/react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import ImagePicker from "./image-picker";
import { Icons } from "../icons";
function Cover() {

  const [cover, setCover] = useStore(useBoundStore, (state) => [state.cover, state.setCover])


  return (
    <>
      {
        cover && (
          <section className="w-full relative group">
            <Image
              classNames={{
                wrapper: "!max-w-full",
              }}
              as={NextImage}
              width={0}
              className="w-full h-[30vh] "
              height={0}
              sizes="100vw"
              isZoomed
              radius="none"
              src={cover}
              alt="NextUI hero Image"
            />
            <div className="opacity-0 z-11 ml-[calc(96px+env(safe-area-inset-left))] mr-[calc(96px+env(safe-area-inset-right))] group-hover:opacity-100 absolute right-2 bottom-2 transition-opacity">
              <Popover placement="left">
                <PopoverTrigger >
                  <Button variant="shadow" size="sm">Change cover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-[540px] items-start">
                  <ImagePicker />
                </PopoverContent>
              </Popover>

              <Button variant="shadow" className="mx-2 z-[11]" size="sm">Reposition</Button>
              <Button onClick={() => setCover("")} className="z-[11]" isIconOnly variant="shadow" size="sm">
                <Icons.TrashIcon />
              </Button>
            </div>
          </section>
        )
      }

    </>
  )
}

export default Cover