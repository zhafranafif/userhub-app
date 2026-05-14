"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/UseDebounce";
import { Loader2, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";


export function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [currentQuery, setCurrentQuery] = useState(searchParams.get("query") ?? "");
    const debouncedQuery = useDebounce(currentQuery, 500);
    const isTyping = currentQuery !== debouncedQuery;

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedQuery) {
            params.set("query", debouncedQuery);
        } else {
            params.delete("query");
        }

        const nextUrl = params.toString() ? `/users?${params.toString()}` : "/users";
        const currentUrl = searchParams.toString() ? `/users?${searchParams.toString()}` : "/users";

        if (nextUrl !== currentUrl) {
        router.replace(nextUrl);
        }
    }, [debouncedQuery, router, searchParams]);

    const handleSearch = (value: string) => {
        setCurrentQuery(value);
    }
    return (
        <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {isTyping ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : (
                <Search className="h-5 w-5 text-primary" />
            )}
            </div>

            <input
                id="search-input"
                type="text"
                placeholder="Search users..."
                className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-primary placeholder:text-primary/50 focus:outline-primary"
                value={currentQuery}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
}