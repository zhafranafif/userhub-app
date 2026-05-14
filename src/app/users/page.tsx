import { getUsers } from "@/services/users.service";
import { FilterBar } from "@/component/FilterBar";
import { SearchBar } from "@/component/SearchBar";
import { UsersTable } from "@/component/UsersTable";

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
    const users = await getUsers();

    const query = params.query?.toLowerCase() ?? "";
    const sort = params.sort?.toLowerCase() ?? "asc";

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query));

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (sort === "asc") {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });


  return (
    <div className="min-h-screen px-4 py-6 md:px-8 md:py-8">
        <div>
            <h1 className="font-heading text-4xl font-semibold text-foreground">Users</h1>
            <p className="mt-2 text-md text-primary">A list of all the users in your workspace.</p>
        </div>

        <div className="flex justify-between items-center mt-10">
        <SearchBar />
        <FilterBar />
        </div>

        <div className="px-5">
            <UsersTable users={sortedUsers} />
        </div>
    </div>
  );
}