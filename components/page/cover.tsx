
"use client"

import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { useStore } from "zustand";
import { Button } from "@nextui-org/react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import ImagePicker from "./icon-cover/image-picker";
import { Icons } from "../icons";
import {  memo, useState } from "react";
import { Slider } from "@/components/ui/slider"
import { saveProperty } from "@/lib/data-source/page";
import { useUuidPathname } from "@/hooks/useUuidPathname";

function Cover() {
  console.log("render cover")
  const [cover, setCover] = useStore(useBoundStore, (state) => [state.cover, state.setCover])
  const pageId = useUuidPathname()


  const [originalY, setOriginalY] = useState(50)
  const [y, setY] = useState(50)

  const [showSlider, setShowSlider] = useState(false)

  const removeCover = () => {
    setCover("");
    saveProperty({
      pageId,
        data: {
        cover: ""
      }
    })
  }

  return (
    <>
      {
        cover && (
          <section className="w-full relative group">
            <Image
              classNames={{
                wrapper: "!max-w-full",
              }}
              style={{
                objectPosition: `center ${y}%`,
              }}
              draggable={false}
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
            {
              !showSlider && (
                <div className="opacity-0 z-11 ml-[calc(96px+env(safe-area-inset-left))] mr-[calc(96px+env(safe-area-inset-right))] group-hover:opacity-100 absolute right-2 bottom-2 transition-opacity">
                  <Popover placement="left">
                    <PopoverTrigger >
                      <Button variant="shadow" size="sm">Change cover</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[540px] items-start">
                      <ImagePicker />
                    </PopoverContent>
                  </Popover>

                  <Button onClick={() => setShowSlider(true)} variant="shadow" className="mx-2 z-[11]" size="sm">Reposition</Button>
                  <Button onClick={() => removeCover()} className="z-[11]" isIconOnly variant="shadow" size="sm">
                    <Icons.TrashIcon />
                  </Button>
                </div>
              )
            }
            {
              showSlider && (
                <>
                  <div className="absolute opacity-50 w-1/2 z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Slider value={[y]} onValueChange={([v]) => setY(v)} max={100} step={1} min={0} />
                  </div>
                  <div className=" z-11 ml-[calc(96px+env(safe-area-inset-left))] mr-[calc(96px+env(safe-area-inset-right))]  absolute right-2 bottom-2 ">
                    <Button onClick={() => {
                      setOriginalY(y)
                      setShowSlider(false)
                    }} variant="shadow" className="z-[11]" size="sm">Save position</Button>
                    <Button onClick={() => {
                      setY(originalY)
                      setShowSlider(false)
                    }} variant="shadow" className="mx-2 z-[11]" size="sm">Cancel</Button>
                  </div>
                </>
              )
            }
          </section>
        )
      }

    </>
  )
}

export default memo(Cover)