import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function Random(min: number, max: number) {
  return Math.round(Math.random() * (max - min)) + min;
}

export const isAppleOS = () =>
  typeof navigator !== "undefined" &&
  (/Mac/.test(navigator.platform) ||
    (/AppleWebKit/.test(navigator.userAgent) &&
      /Mobile\/\w+/.test(navigator.userAgent)));

export function formatKeyboardShortcut(shortcut: string) {
  if (isAppleOS()) {
    return shortcut.replace("Mod", "⌘");
  } else {
    return shortcut.replace("Mod", "Ctrl");
  }
}
