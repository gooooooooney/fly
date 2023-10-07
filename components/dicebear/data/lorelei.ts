export const seeds = [
  "Casper",
  "Midnight",
  "Misty",
  "Peanut",
  "Muffin",
  "Rocky",
  "Salem",
  "Pepper",
  "Jasper",
  "Daisy",
  "Willow",
  "Molly",
  "Bandit",
  "Nala",
  "Milo",
  "Shadow",
  "Baby",
  "Sasha",
  "Bailey",
  "Max",
]

export const rotates = Array.from({ length: 36 }, (_, i) => ({
  label: `${i * 10}°`,
  value: `${i * 10}`,
}))

// 生成一个数组在100到200之间, 每次增加10
export const scales = Array.from({ length: 11 }, (_, i) => ({
  label: `${i * 10 + 100}%`,
  value: `${i * 10 + 100}`,
}))

// 生成一个数组在0到50之间, 每次增加5
export const radius = Array.from({ length: 11 }, (_, i) => ({
  label: `${i * 5}%`,
  value: `${i * 5}`,
}))

// 生成10个背景颜色的数组, 用16进制表示, 颜色从冷色到暖色
export const backgroundColor = [
  "b6e3f4",
  "c0aede",
  "d1d4f9",
  "ffd5dc",
  "ffdfbf",
]

export const backgroundType = [
  {
    label: "solid",
    value: "solid",
  },
  {
    label: "gradientLinear",
    value: "gradientLinear",
  }
]

export const translateX = Array.from({ length: 20 }, (_, i) => ({
  label: `${i * 5}%`,
  value: `${i * 5}`,
}))

export const hairs = Array.from({ length: 47 }, (_, i) => ({
  label: i>9 ?  `variant${i + 1}` : `variant0${i + 1}`,
  value: i>9 ?  `variant${i + 1}` : `variant0${i + 1}`,
}))