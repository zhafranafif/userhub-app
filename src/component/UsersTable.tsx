import type { IUserData } from "@/lib/types";
import Link from "next/link";


export function UsersTable({ users, detailSearchParams }: { users: IUserData[]; detailSearchParams: string }) {
    const getInitials = (name: string) =>
        name
            .split(" ")
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
            .toUpperCase();

    return (
        <div className="mt-6">
            <div className="hidden xl:block overflow-hidden rounded-xl border border-border">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-245 table-auto">
                        <thead className="bg-light-primary/80 border-b border-border">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-primary">Name</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-primary">Email</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-primary">Website</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-primary">Total Posts</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-primary">Completed Todos</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-primary">Pending Todos</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {users.length > 0 ? (
                                users.map((user: IUserData) => (
                                    <tr key={user.id}>
                                        <td className="px-4 py-3 text-sm text-primary font-semibold">
                                            <Link
                                                href={`/users/${user.id}${detailSearchParams ? `?${detailSearchParams}` : ""}`}
                                                className="inline-flex min-h-9 items-center rounded-sm px-1 py-0.5 hover:underline"
                                            >
                                                {user.name}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-primary">{user.email}</td>
                                        <td className="px-4 py-3 text-sm text-primary">{user.website}</td>
                                        <td className="px-4 py-3 text-sm text-primary">{user.totalPosts}</td>
                                        <td className="px-4 py-3 text-sm text-primary">{user.completedTodos}</td>
                                        <td className="px-4 py-3 text-sm text-primary">{user.pendingTodos}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-4 py-16 text-center text-sm text-primary">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="xl:hidden">
                {users.length > 0 ? (
                    <div className="space-y-3">
                        {users.map((user: IUserData) => (
                            <div key={user.id} className="rounded-2xl border border-border bg-white/80 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-11 w-11 rounded-full bg-light-primary text-primary flex items-center justify-center text-sm font-semibold">
                                        {getInitials(user.name)}
                                    </div>
                                    <div className="min-w-0">
                                        <Link
                                            href={`/users/${user.id}${detailSearchParams ? `?${detailSearchParams}` : ""}`}
                                            className="block text-base font-semibold text-primary hover:underline truncate"
                                        >
                                            {user.name}
                                        </Link>
                                        <p className="text-sm text-primary/70 truncate">{user.email}</p>
                                    </div>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold uppercase text-primary/60">
                                    <span className="rounded-full bg-light-primary px-2.5 py-1">{user.website}</span>
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                                    <div className="rounded-xl border border-border bg-white px-3 py-2 text-center">
                                        <p className="text-xs uppercase text-primary/60">Posts</p>
                                        <p className="text-base font-semibold text-primary">{user.totalPosts}</p>
                                    </div>
                                    <div className="rounded-xl border border-border bg-white px-3 py-2 text-center">
                                        <p className="text-xs uppercase text-primary/60">Completed</p>
                                        <p className="text-base font-semibold text-primary">{user.completedTodos}</p>
                                    </div>
                                    <div className="rounded-xl border border-border bg-white px-3 py-2 text-center">
                                        <p className="text-xs uppercase text-primary/60">Pending</p>
                                        <p className="text-base font-semibold text-primary">{user.pendingTodos}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-border bg-white/70 px-4 py-10 text-center text-sm text-primary">
                        No users found.
                    </div>
                )}
            </div>
        </div>
    );
}