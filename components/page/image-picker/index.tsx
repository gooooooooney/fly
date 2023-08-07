"use client"
import { Tab, Tabs } from "@nextui-org/tabs"
import { Images } from "./images";
import { ScrollArea } from "@/components/ui/scroll-area";

function ImagePicker() {

  return (
    <Tabs variant="underlined" size="sm" aria-label="Options">
      <Tab key="gallery" title="Gallery" className="w-full">
        <ScrollArea className="h-96 w-full">
          <Images  />
        </ScrollArea>
      </Tab>
      <Tab key="upload" title="Upload">
        111
      </Tab>
    </Tabs>
  )
}
export default ImagePicker