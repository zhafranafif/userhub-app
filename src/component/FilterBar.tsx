"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownUp, Check, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type SortOption = {
  label: string;
  value: string;
};

const sortOptions: SortOption[] = [
  { label: "Name (A → Z)", value: "asc" },
  { label: "Name (Z → A)", value: "desc" },
];


export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") ?? "asc";

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const selectedOption = sortOptions.find((option) => option.value === currentSort) ?? sortOptions[0];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelect = (option: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());

    if (option.value) {
      params.set("sort", option.value);
    } else {
      params.delete("sort");
    }

    setIsOpen(false);

    const queryString = params.toString();
    router.replace(queryString ? `/users?${queryString}` : "/users");
  };

  return (
    <div ref={menuRef} className="relative inline-flex w-full max-w-56 flex-col">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex h-12 w-full items-center justify-between rounded-xl border border-border bg-background px-4 text-sm text-primary shadow-sm transition hover:border-primary/30"
      >
        <span className="flex min-w-0 items-center gap-2">
          <ArrowDownUp className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate font-medium">{selectedOption.label}</span>
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-primary/70" />
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-[calc(100%+0.35rem)] z-50 w-full overflow-hidden rounded-xl border border-border bg-background shadow-[0_12px_30px_rgba(49,48,47,0.10)]">
          <ul role="listbox" className="py-1">
            {sortOptions.map((option) => {
              const isSelected = option.value === selectedOption.value;

              return (
                <li key={option.value} className="p-2">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option)}
                    className={`flex w-full items-center justify-between 
                    px-4 py-2.5 text-left text-sm text-foreground transition hover:bg-light-primary
                    ${isSelected ? "bg-light-primary rounded-2xl" : ""}`}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected ? <Check className="h-4 w-4 shrink-0 text-foreground" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
