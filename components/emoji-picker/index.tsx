import { Card, CardBody } from "@nextui-org/card"
import { Tab, Tabs } from "@nextui-org/tabs"
import { ACTIVITIES, EXPRESSIONES, GESTURES, OBJECTS, SKY_WEATHER, SYMBOLS } from './statics';
import { ScrollArea } from "../ui/scroll-area";

function EmojiPicker() {
    const LIST = [
        EXPRESSIONES,
        ACTIVITIES,
        GESTURES,
        OBJECTS,
        SKY_WEATHER,
        SYMBOLS
    ]
    return (
        <Tabs variant="underlined" size="sm" aria-label="Options">
            <Tab key="emoji" title="Emojis" className="w-full">
                <ScrollArea className="h-96 w-full">
                    <div className="w-full">
                        {LIST.map((list, index) => (
                            <div className="flex w-full flex-wrap" key={index}>
                                {list.map((emoji, index) => (
                                    <span key={index} className=" w-7 h-7 p-1 cursor-pointer text-xl">{emoji}</span>
                                ))}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </Tab>
            <Tab key="custom" title="Custom">
                <Card>
                    <CardBody>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </CardBody>
                </Card>
            </Tab>
        </Tabs>
    )
}
export default EmojiPicker