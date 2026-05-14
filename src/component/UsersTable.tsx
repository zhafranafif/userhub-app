import type { IUser } from "@/lib/types";


export function UsersTable({ users }: { users: IUser[] }) {
    return (
        <div className="mt-6 overflow-hidden rounded-xl border border-border">
            <table className="w-full table-auto">
                <thead className="bg-light-primary/80 border-b border-border">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-primary">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-primary">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-primary">Website</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {users.map((user: IUser) => (
                        <tr key={user.id}>
                            <td className="px-4 py-3 text-sm text-primary">
                                <a href={`/users/${user.id}`} className="hover:underline">
                                    {user.name}
                                </a>
                            </td>
                            <td className="px-4 py-3 text-sm text-primary">{user.email}</td>
                            <td className="px-4 py-3 text-sm text-primary">{user.website}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}