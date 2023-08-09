"use client"
import { Tab, Tabs } from "@nextui-org/tabs"
import { ScrollArea } from "@/components/ui/scroll-area";
import { UnsplashImages } from "./images/unsplash";
import { PelexsImages } from "./images/pelexs";

function ImagePicker() {

  return (
    <Tabs variant="underlined" size="sm" aria-label="Options">
      <Tab key="unsplash" title="Unsplash" className="w-full">
        <ScrollArea className="h-96 w-full">
          <UnsplashImages  />
        </ScrollArea>
      </Tab>
      <Tab key="pelexs" title="Pelexs">
      <ScrollArea className="h-96 w-full">
          <PelexsImages  />
        </ScrollArea>
      </Tab>
    </Tabs>
  )
}
export default ImagePicker