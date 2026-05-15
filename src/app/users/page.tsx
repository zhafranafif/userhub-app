import { FilterBar } from "@/component/FilterBar";
import { SearchBar } from "@/component/SearchBar";
import { UsersTable } from "@/component/UsersTable";
import { mapUserData } from "@/service/user-mapper.service";
import { notFound } from "next/navigation";

interface UsersPageProps {
    searchParams: Promise<{
        query?: string;
        sort?: string;
    }>;
}

export const metadata = {
    title: "Users - UserHub",
    description: "A list of all the users in your workspace.",
};

export default async function UsersPage({searchParams}: UsersPageProps) {

    const params = await searchParams;
    const mappedUsers = await mapUserData();

    if (mappedUsers.length === 0) {
        notFound();
    }

    const query = params.query?.toLowerCase() ?? "";
    const sort = params.sort?.toLowerCase() ?? "name-asc";
    const detailSearchParams = new URLSearchParams();

    if (params.query) {
        detailSearchParams.set("query", params.query);
    }

    if (params.sort) {
        detailSearchParams.set("sort", params.sort);
    }

    const filteredUsers = mappedUsers.filter(user => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query));

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (sort === "name-desc") {
            return b.name.localeCompare(a.name);
        }

        if (sort === "pending-desc") {
            return b.pendingTodos - a.pendingTodos || a.name.localeCompare(b.name);
        }

        if (sort === "pending-asc") {
            return a.pendingTodos - b.pendingTodos || a.name.localeCompare(b.name);
        }

        return a.name.localeCompare(b.name);
    });


  return (
    <div className="min-h-screen px-4 py-6 md:px-8 md:py-8">
        <div>
            <h1 className="font-heading text-4xl font-semibold text-foreground">Users</h1>
            <p className="mt-2 text-md text-primary">A list of all the users in your workspace.</p>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 max-[954px]:flex-wrap max-[954px]:justify-start max-[954px]:gap-3 max-[768px]:flex-col max-[768px]:items-stretch">
        <SearchBar />
        <FilterBar />
        </div>

        <div className="px-5">
            <UsersTable users={sortedUsers} detailSearchParams={detailSearchParams.toString()} />
        </div>
    </div>
  );
}