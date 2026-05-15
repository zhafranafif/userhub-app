import type { Metadata } from "next";
import { UserCard } from "@/component/UserCard";
import { getUserById } from "@/services/users.service";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const user = await getUserById(Number(slug));

    return {
        title: `${user.name} - UserHub`,
        description: `Details information for ${user.name}`,
    };
}

export default async function UserDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const user = await getUserById(Number(slug));


    return (
        <div className="min-h-screen px-4 py-6 md:px-8 md:py-8">
            <Link href="/users">
                <span className="relative flex items-center text-primary text-md font-medium hover:cursor-pointer hover:underline">
                    <ArrowLeft className="w-5 h-5 mr-1" />Back to list</span>
            </Link>

            <div className="mt-10 flex flex-col items-center justify-center">
                <UserCard user={user} />
            </div>
        </div>
    );
}