import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "create-workspace ",
  description: "Your personal noted app",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full flex justify-center items-center">
      {children}
    </section>
  );
}
