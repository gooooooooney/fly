import { Button, Image, Select, SelectItem } from "@nextui-org/react";
import { backgroundColor, backgroundType, hairs, radius as rdList, rotates, scales, seeds, translateX } from "./data/lorelei";
import { useState } from "react";
import {  assignWith } from "lodash";
import useSWRMutation from "swr/mutation";
import {  updateSpaceInfo } from "@/lib/data-source/space";
import { toast } from "sonner";
import { getImgSrcParams } from "@/lib/utils";
import { setAvatar } from "@/hooks/store/create-user-slice";

interface LoreleiProps {
  onCancel: () => void
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
    backgroundColor: [],
    translateX: translateX[0].value,
    radius: rdList[0].value,
    backgroundType: backgroundType[0].value,
    bgType: backgroundType[0].value,
  }, props)

  const getImgSrc = (propsParams: Partial<LoreleiProps>) => {
    const obj: any = {
      seed: propsInfo.seed,
      rotate: propsInfo.rotate,
      scale: propsInfo.scale,
      hair: propsInfo.hair,
      // backgroundColor: propsInfo.backgroundColor.join(","),
      translateX: propsInfo.translateX,
      radius: propsInfo.radius,
      backgroundType: propsInfo.backgroundType,
    }
    if (propsInfo.backgroundColor.length) {
      obj.backgroundColor = propsInfo.backgroundColor.join(",")
    } else {
      delete obj.backgroundColor
    }
    const assignObj: any = {
      ...propsParams
    }
    if (propsParams.backgroundColor?.length) {
      assignObj.backgroundColor = propsParams.backgroundColor!.join(",")
    } else {
      delete assignObj.backgroundColor
    }
    return `https://api.dicebear.com/7.x/lorelei/svg?${new URLSearchParams(assignWith(obj, assignObj, (objValue, srcValue) => {
      return srcValue || objValue
    }))
      }`
  }
  const [imgSrc, setImgSrc] = useState(getImgSrc({}))

  const {trigger, isMutating} = useSWRMutation("updateSpaceInfo", updateSpaceInfo)

  const handleCreate = () => {
    if (isMutating) return
    trigger({avatar: imgSrc}).catch(err => {
      toast.error(err.message)
    }).then(res => {
      setAvatar(imgSrc)
      toast.success("Success")
      props.onCancel()
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <Image width={100} height={100} src={imgSrc} alt="avatar" ></Image>
      <section className="grid grid-cols-2 gap-4 ">
        <Select
          onSelectionChange={e => {
            if (typeof e !== "string") {
              const src = getImgSrc({
                ...getImgSrcParams(imgSrc),
                seed: [...e.values()][0] as string
              })
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
              setImgSrc(getImgSrc({ ...getImgSrcParams(imgSrc), rotate: [...e.values()][0] as string }))
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
              setImgSrc(getImgSrc({ ...getImgSrcParams(imgSrc), scale: [...e.values()][0] as string }))
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
              setImgSrc(getImgSrc({ ...getImgSrcParams(imgSrc), radius: [...e.values()][0] as string }))
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

              setImgSrc(getImgSrc({ ...getImgSrcParams(imgSrc), backgroundColor: [...e.values()] as string[] }))
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
              setImgSrc(getImgSrc({ ...getImgSrcParams(imgSrc), backgroundType: [...e.values()][0] as string }))
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
              setImgSrc(getImgSrc({ ...getImgSrcParams(imgSrc), translateX: [...e.values()][0] as string }))
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
              setImgSrc(getImgSrc({ ...getImgSrcParams(imgSrc), hair: [...e.values()][0] as string }))
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
      <section className="flex justify-end mt-4">
        <div className="flex gap-4">
          <Button disabled={isMutating} variant="light" color="danger" onClick={() => props.onCancel()}>Cancel</Button>
          <Button isLoading={isMutating} variant="shadow" color="primary" onClick={handleCreate}>Save</Button>
        </div>
      </section>
    </div>
  )
}