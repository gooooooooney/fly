import { Link } from "@nextui-org/link";
import NextLink from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen text-center flex flex-col justify-center items-center">
      <div className="leading-10 flex items-center">
        <h1 className="inline-block mr-5 pr-6 text-2xl font-bold align-top border-r-1 border-muted">
          404
        </h1>
        <div className="inline-block">
          <h2 className="text-[14px] font-bold leading-7">
            This page could not be found.
          </h2>
        </div>
      </div>
      <Link as={NextLink} href="/">Go back home</Link>
    </div>
  );
}
