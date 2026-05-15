import type { IUserData } from "@/lib/types";
import Link from "next/link";


export function UsersTable({ users, detailSearchParams }: { users: IUserData[]; detailSearchParams: string }) {

    return (
        <div className="mt-6 overflow-hidden rounded-xl border border-border">
            <table className="w-full table-auto">
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
    );
}