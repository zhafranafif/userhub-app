"use client";

import { Button } from "@/component/Button";
import { ArrowRight, LayoutDashboard, Search, UserCog, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleOpenDirectory = () => {
    router.push("/users");
  };

  const features: { icon: React.ReactNode; title: string; desc: string }[] = [
  {
    icon: <Users />,
    title: "User directory",
    desc: "A fast, sortable, searchable table of every user in your workspace.",
  },
  {
    icon: <Search />,
    title: "Instant search",
    desc: "Filter by name in real time with a keyboard-first experience.",
  },
  {
    icon: <LayoutDashboard />,
    title: "Detail views",
    desc: "Drill into any user to see contact, company, and address info.",
  },
];

  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section
          id="home"
          className="flex flex-col justify-center gap-5 items-center rounded-4xl border border-secondary/80 bg-white/80 p-6 shadow-sm backdrop-blur md:p-10"
        >
        <div className="inline-flex items-center gap-2 rounded-full border border-border px-2 py-1 text-md font-medium text-foreground backdrop-blur">
            <UserCog className="h-5 w-5" />
            Modern user directory
        </div>
          <h1 className="font-heading mt-3 text-5xl text-center tracking-tight font-semibold text-foreground">
            The directory your team actually enjoys using.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-center text-primary">
            A curated workspace for browsing users, exploring activity, and navigating operational insights with clarity and speed.
          </p>

          <div className="flex justify-center items-center mt-4 gap-5">
            <Button label="Open directory" isPrimary onClick={handleOpenDirectory} icon={<ArrowRight />} />
            <Button label="Learn more" />
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-border p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-foreground">
                {Icon}
              </div>
              <h1 className="mt-4 text-md font-bold text-foreground">{title}</h1>
              <p className="mt-1 text-sm text-primary">{desc}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
