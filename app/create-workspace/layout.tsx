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
    <section className="h-full mt-20 flex justify-center items-center">
      {children}
    </section>
  );
}
