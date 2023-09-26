import { Image, Input, Radio, RadioGroup, Select, SelectItem } from "@nextui-org/react";
import { backgroundColor, backgroundType, hairs, radius as rdList, rotates, scales, seeds, translateX } from "./data/lorelei";
import { useMemo, useState } from "react";

export function Lorelei() {

  const [seed, setSeed] = useState(new Set([seeds[0]])) 
  const [rotate, setRotate] = useState(new Set([rotates[0].value])) 
  const [scale, setScale] = useState(new Set([scales[0].value])) 
  const [hair, setHair] = useState(new Set([hairs[0].value])) 
  const [background, setBackground] = useState(new Set([backgroundColor[0]])) 
  const [translate, setTranslate] = useState(new Set([translateX[0].value])) 
  const [radius, setRadius] = useState(new Set([rdList[0].value])) 
  const [bgType, setBgType] = useState(new Set([backgroundType[0].value])) 
  const imgSrc= useMemo(() => {
    return `https://api.dicebear.com/7.x/lorelei/svg?${
     new URLSearchParams({
      seed: [...seed].join(","),
      rotate: [...rotate].join(","),
      scale: [...scale].join(","),
      hair: [...hair].join(","),
      background: [...background].join(","),
      translate: [...translate].join(","),
      radius: [...radius].join(","),
      bgType: [...bgType].join(","),
     })
    }`
  }, [
    seed,
    rotate,
    scale,
    hair,
    background,
    translate,
    radius,
    bgType,
  ])
  return (
    <div>
      <Image  width={100} height={100} src={imgSrc} ></Image>
      <section className="grid grid-cols-2 gap-4 ">
        <Select
          onSelectionChange={e => setSeed(e)}
          selectedKeys={seed}
          label="Seed"
          placeholder="Select seed"
          className="max-w-xs"
        >
          {seeds.map((seed) => (
            <SelectItem key={seed} value={seed}>
              {seed}
            </SelectItem>
          ))}
        </Select>
        <Select
          onSelectionChange={setRotate}
          selectedKeys={rotate}
          label="Rotate"
          placeholder="Select rotate"
          className="max-w-xs"
        >
          {rotates.map((rotate) => (
            <SelectItem key={rotate.value} value={rotate.value}>
              {rotate.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          onSelectionChange={setScale}
          selectedKeys={scale}
          label="Scale"
          placeholder="Select scale"
          className="max-w-xs"
        >
          {scales.map((scale) => (
            <SelectItem key={scale.value} value={scale.value}>
              {scale.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          onSelectionChange={setRadius}
          selectedKeys={radius}
          label="Radius"
          placeholder="Select radius"
          className="max-w-xs"
        >
          {rdList.map((radiu) => (
            <SelectItem key={radiu.value} value={radiu.value}>
              {radiu.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          onSelectionChange={setBackground}
          selectedKeys={background}
          label="Background color"
          placeholder="Select background color"
          className="max-w-xs"
        >
          {backgroundColor.map((bg) => (
            <SelectItem key={bg} value={bg}>
              {bg}
            </SelectItem>
          ))}
        </Select>
        <Select
          onSelectionChange={setBgType}
          selectedKeys={bgType}
          label="Background type"
          placeholder="Select background type"
          className="max-w-xs"
        >
          {backgroundType.map((bg) => (
            <SelectItem key={bg.value} value={bg.value}>
              {bg.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          onSelectionChange={setTranslate}
          selectedKeys={translate}
          label="Translate X"
          placeholder="Select translate X"
          className="max-w-xs"
        >
          {translateX.map((tx) => (
            <SelectItem key={tx.value} value={tx.value}>
              {tx.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          onSelectionChange={setHair}
          selectedKeys={hair}
          label="Hair"
          placeholder="Select hair type"
          className="max-w-xs"
        >
          {hairs.map((hair) => (
            <SelectItem key={hair.value} value={hair.value}>
              {hair.label}
            </SelectItem>
          ))}
        </Select>
      </section>
    </div>
  )
}