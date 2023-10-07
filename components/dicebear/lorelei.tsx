import { Image, Input, Radio, RadioGroup, Select, SelectItem } from "@nextui-org/react";
import { backgroundColor, backgroundType, hairs, radius as rdList, rotates, scales, seeds, translateX } from "./data/lorelei";
import { useMemo, useState } from "react";
import { assign, assignWith, isEmpty, isUndefined } from "lodash";

interface LoreleiProps {
  seed: string
  rotate: string
  scale: string
  hair: string
  backgroundColor: string[]
  translateX: string
  radius: string
  backgroundType: string
  bgType: string
}

export function Lorelei(props: LoreleiProps) {

  const propsInfo = Object.assign({
    seed: seeds[0],
    rotate: rotates[0].value,
    scale: scales[0].value,
    hair: hairs[0].value,
    backgroundColor: [backgroundColor[0]],
    translateX: translateX[0].value,
    radius: rdList[0].value,
    backgroundType: backgroundType[0].value,
    bgType: backgroundType[0].value,
  }, props)

  // const [seed, setSeed] = useState(new Set([props.seed]))
  // const [rotate, setRotate] = useState(new Set([props.rotate]))
  // const [scale, setScale] = useState(new Set([props.scale]))
  // const [hair, setHair] = useState(new Set([props.hair]))
  // const [background, setBackground] = useState(new Set([props.backgroundColor]))
  // const [translate, setTranslate] = useState(new Set([props.translateX]))
  // const [radius, setRadius] = useState(new Set([props.radius]))
  // const [bgType, setBgType] = useState(new Set([props.bgType]))
  const getImgSrc = (propsParams: Partial<LoreleiProps>) => {
    console.log(propsParams)
    return `https://api.dicebear.com/7.x/lorelei/svg?${new URLSearchParams(assignWith({
      seed: propsInfo.seed,
      rotate: propsInfo.rotate,
      scale: propsInfo.scale,
      hair: propsInfo.hair,
      backgroundColor: propsInfo.backgroundColor.join(","),
      translateX: propsInfo.translateX,
      radius: propsInfo.radius,
      backgroundType: propsInfo.backgroundType,
    }, {
      ...propsParams,
      backgroundColor: isEmpty(propsParams.backgroundColor) ? null : propsParams.backgroundColor!.join(",")
    }, (objValue, srcValue) => {
      return srcValue || objValue
    }))
      }`
  }
  const [imgSrc, setImgSrc] = useState(getImgSrc({}))

  // const imgSrc = useMemo(() => {
  //   return `https://api.dicebear.com/7.x/lorelei/svg?${new URLSearchParams({
  //     seed: [...seed].join(","),
  //     rotate: [...rotate].join(","),
  //     scale: [...scale].join(","),
  //     hair: [...hair].join(","),
  //     backgroundColor: [...background].join(","),
  //     translateX: [...translate].join(","),
  //     radius: [...radius].join(","),
  //     backgroundType: [...bgType].join(","),
  //   })
  //     }`
  // }, [
  //   seed,
  //   rotate,
  //   scale,
  //   hair,
  //   background,
  //   translate,
  //   radius,
  //   bgType,
  // ])
  const getImgSrcParams = () => {
    const params = new URL(imgSrc).searchParams
    return [...params.entries()].reduce((acc, [key, value]) => {
      if (key == "backgroundColor") {
        acc[key] = value.split(",")
      
      } else {
        acc[key] = value
      }
      return acc
    }, {} as any)
  }
  return (
    <div className="flex flex-col gap-4">
      <Image width={100} height={100} src={imgSrc} alt="avatar" ></Image>
      <section className="grid grid-cols-2 gap-4 ">
        <Select
          onSelectionChange={e => {
            if (typeof e !== "string") {
              const src = getImgSrc({ 
                ...getImgSrcParams(),
                seed: [...e.values()][0] as string
               })
              console.log(src)
              setImgSrc(src)
            }
          }}
          defaultSelectedKeys={[propsInfo.seed]}
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
          onSelectionChange={e => {
            if (typeof e !== "string") {
              setImgSrc(getImgSrc({ rotate: [...e.values()][0] as string }))
            }
          }}
          defaultSelectedKeys={[propsInfo.rotate]}
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
          onSelectionChange={e => {
            if (typeof e !== "string") {
              setImgSrc(getImgSrc({ scale: [...e.values()][0] as string }))
            }
          }}
          defaultSelectedKeys={[propsInfo.scale]}
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
          onSelectionChange={e => {
            if (typeof e !== "string") {
              setImgSrc(getImgSrc({ radius: [...e.values()][0] as string }))
            }
          }}
          defaultSelectedKeys={[propsInfo.radius]}
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
          selectionMode="multiple"
          onSelectionChange={e => {
            if (typeof e !== "string") {
              setImgSrc(getImgSrc({ backgroundColor: [...e.values()] as string[] }))
            }
          }}
          defaultSelectedKeys={propsInfo.backgroundColor}
          label="Background color"
          placeholder="Select background color"
          className="max-w-xs"
        >
          {backgroundColor.map((bg) => (
            <SelectItem startContent={
              <span className="inline-block w-4 h-4 rounded-sm" style={{
                backgroundColor: `#${bg}`
              }}></span>
            } key={bg} value={bg}>
              {bg}
            </SelectItem>
          ))}
        </Select>
        <Select
          onSelectionChange={e => {
            if (typeof e !== "string") {
              setImgSrc(getImgSrc({ backgroundType: [...e.values()][0] as string }))
            }
          }}
          defaultSelectedKeys={[propsInfo.bgType]}
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
          onSelectionChange={e => {
            if (typeof e !== "string") {
              setImgSrc(getImgSrc({ translateX: [...e.values()][0] as string }))
            }
          }}
          defaultSelectedKeys={[propsInfo.translateX]}
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
          onSelectionChange={e => {
            if (typeof e !== "string") {
              setImgSrc(getImgSrc({ hair: [...e.values()][0] as string }))
            }
          }}
          defaultSelectedKeys={[propsInfo.hair]}
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