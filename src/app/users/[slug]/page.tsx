import type { Metadata } from "next";
import { UserCard } from "@/component/UserCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { mapSingleUserData } from "@/service/user-mapper.service";
import { getPosts, getTodos } from "@/service/users.service";
import UserNotFound from "./not-found";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const userId = Number(slug);

    if (Number.isNaN(userId)) {
        return {
            title: "User not found - UserHub",
            description: "The user you are looking for was not found.",
        };
    }

    const user = await mapSingleUserData(userId);

    if (!user) {
        return {
            title: "User not found - UserHub",
            description: "The user you are looking for was not found.",
        };
    }

    return {
        title: `${user.name} - UserHub`,
        description: `Details information for ${user.name}`,
    };
}

export default async function UserDetailPage({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ query?: string; sort?: string }>;
}) {
    const { slug } = await params;
    const currentSearchParams = await searchParams;
    const userId = Number(slug);

    if (Number.isNaN(userId)) {
        return <UserNotFound searchParams={currentSearchParams} />;
    }

    const user = await mapSingleUserData(userId);
    const [posts, todos] = await Promise.all([getPosts(), getTodos()]);
    const backSearchParams = new URLSearchParams();

    if(!user) {
        return <UserNotFound searchParams={currentSearchParams} />;
    }

    const userPosts = posts.filter((post) => post.userId === userId);
    const userTodos = todos.filter((todo) => todo.userId === userId);
    const previewPosts = userPosts.slice(0, 3);
    const previewTodos = userTodos.slice(0, 4);

    if (currentSearchParams.query) {
        backSearchParams.set("query", currentSearchParams.query);
    }

    if (currentSearchParams.sort) {
        backSearchParams.set("sort", currentSearchParams.sort);
    }

    const backHref = backSearchParams.toString()
        ? `/users?${backSearchParams.toString()}`
        : "/users";


    return (
        <div className="min-h-screen px-4 py-6 md:px-8 md:py-8">
            <Link href={backHref}>
                <span className="relative flex items-center text-primary text-md font-medium hover:cursor-pointer hover:underline">
                    <ArrowLeft className="w-5 h-5 mr-1" />Back to list</span>
            </Link>

            <div className="mt-10 flex flex-col items-center justify-center">
                <UserCard user={user} />
            </div>

            <section className="mx-auto mt-10 w-full max-w-4xl">
                <div className="flex flex-col gap-6 rounded-2xl border border-border bg-white/70 p-5">
                    <div>
                        <h2 className="text-lg font-semibold text-primary">Activity</h2>
                        <p className="text-sm text-primary/70">
                            Showing a quick preview of posts and todos to keep things focused.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="rounded-2xl border border-border bg-white px-4 py-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Posts</h3>
                                <span className="text-xs font-semibold text-primary/70">
                                    {previewPosts.length} of {userPosts.length}
                                </span>
                            </div>
                            <div className="mt-4 space-y-3">
                                {previewPosts.length > 0 ? (
                                    previewPosts.map((post) => (
                                        <div key={post.id} className="rounded-xl border border-border bg-light-primary/60 px-3 py-2">
                                            <p className="text-sm font-semibold text-primary">{post.title}</p>
                                            <p className="mt-1 text-xs text-primary/70 line-clamp-2">{post.body}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-primary/70">No posts available.</p>
                                )}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-border bg-white px-4 py-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Todos</h3>
                                <span className="text-xs font-semibold text-primary/70">
                                    {previewTodos.length} of {userTodos.length}
                                </span>
                            </div>
                            <div className="mt-4 space-y-3">
                                {previewTodos.length > 0 ? (
                                    previewTodos.map((todo) => (
                                        <div key={todo.id} className="flex items-start justify-between gap-3 rounded-xl border border-border bg-light-primary/60 px-3 py-2">
                                            <p className="text-sm text-primary">{todo.title}</p>
                                            <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${
                                                todo.completed
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-amber-100 text-red-700"
                                            }`}>
                                                {todo.completed ? "Done" : "Pending"}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-primary/70">No todos available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}