"use client"
import { Random } from '@/lib/utils'
import data from '@emoji-mart/data/sets/14/apple.json'
import Picker from '@emoji-mart/react'
import { useTheme } from 'next-themes'
import { FC } from "react"
export function randomEmoji() {
    const emojis = data.emojis
    const emojiKeys = Object.keys(emojis)
    const randomEmojiKey = emojiKeys[Random(0, emojiKeys.length - 1)]
    const randomEmoji = emojis[randomEmojiKey as keyof typeof emojis]
    return randomEmoji.skins[0].native
}
interface EmojiInfo {
    "id": string,
    "name": string,
    "native": string,
    "unified": string,
    "keywords": string[],
    "shortcodes": string,
    "emoticons": string[]
}

interface EmojiMartPickerProps {
    onEmojiSelect: (emoji: EmojiInfo) => void
}

export const EmojiMartPicker: FC<EmojiMartPickerProps> = ({onEmojiSelect}) => {
    const {theme} = useTheme()
   
    return (
        <Picker data={data} theme={theme} set="apple" onEmojiSelect={onEmojiSelect} />
    )
}