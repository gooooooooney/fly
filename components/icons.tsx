import { IconSvgProps } from "@/types";

import { RiCodeSSlashFill } from "react-icons/ri";
import { HiOutlineChevronUpDown } from "react-icons/hi2";

import {
  RxFace,
  RxHome,
  RxQuestionMark,
  RxDoubleArrowLeft,
  RxImage,
  RxTrash,
  RxFile,
  RxDragHandleDots2,
  RxPlus,
  RxEnvelopeClosed,
  RxChevronRight,
  RxChevronDown,
  RxFileText,
  RxTriangleRight,
  RxTriangleDown,
  RxDotsHorizontal,
} from "react-icons/rx";

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export function Google({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <linearGradient
        id="b"
        x1="55.41"
        x2="12.11"
        y1="96.87"
        y2="21.87"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#1e8e3e" />
        <stop offset="1" stopColor="#34a853" />
      </linearGradient>
      <linearGradient
        id="c"
        x1="42.7"
        x2="86"
        y1="100"
        y2="25.13"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#fcc934" />
        <stop offset="1" stopColor="#fbbc04" />
      </linearGradient>
      <linearGradient
        id="a"
        x1="6.7"
        x2="93.29"
        y1="31.25"
        y2="31.25"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#d93025" />
        <stop offset="1" stopColor="#ea4335" />
      </linearGradient>
      <path fill="url(#a)" d="M93.29 25a50 50 90 0 0-86.6 0l3 54z" />
      <path fill="url(#b)" d="M28.35 62.5 6.7 25A50 50 90 0 0 50 100l49-50z" />
      <path fill="url(#c)" d="M71.65 62.5 50 100a50 50 90 0 0 43.29-75H50z" />
      <path fill="#fff" d="M50 75a25 25 90 1 0 0-50 25 25 90 0 0 0 50z" />
      <path
        fill="#1a73e8"
        d="M50 69.8a19.8 19.8 90 1 0 0-39.6 19.8 19.8 90 0 0 0 39.6z"
      />{" "}
    </svg>
  );
}

export function Github({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export const Icons = {
  SunFilledIcon,
  MoonFilledIcon,
  Face: RxFace,
  ChevronsUpDownIcon: HiOutlineChevronUpDown,
  ChevronRightIcon: RxChevronRight,
  ChevronDownIcon: RxChevronDown,
  TriangleRightIcon: RxTriangleRight,
  TriangleDownIcon: RxTriangleDown,
  CodeIcon: RiCodeSSlashFill,
  HomeIcon: RxHome,
  QuestionMarkIcon: RxQuestionMark,
  DoubleArrowLeftIcon: RxDoubleArrowLeft,
  ImageIcon: RxImage,
  TrashIcon: RxTrash,
  File: RxFile,
  FileText: RxFileText,
  DragHandle: RxDragHandleDots2,
  Plus: RxPlus,
  Google,
  Github,
  Email: RxEnvelopeClosed,
  DotsHorizontal: RxDotsHorizontal
};
