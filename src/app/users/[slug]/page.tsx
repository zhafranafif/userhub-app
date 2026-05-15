import type { Metadata } from "next";
import { UserCard } from "@/component/UserCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { mapSingleUserData } from "@/service/user-mapper.service"; 
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
    const backSearchParams = new URLSearchParams();

    if(!user) {
        return <UserNotFound searchParams={currentSearchParams} />;
    }

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
        </div>
    );
}