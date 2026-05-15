import Link from "next/link";

type UserNotFoundProps = {
    searchParams?: {
        query?: string;
        sort?: string;
    };
};

export default function UserNotFound({ searchParams }: UserNotFoundProps) {
    const backSearchParams = new URLSearchParams();

    if (searchParams?.query) {
        backSearchParams.set("query", searchParams.query);
    }

    if (searchParams?.sort) {
        backSearchParams.set("sort", searchParams.sort);
    }

    const backHref = backSearchParams.toString()
        ? `/users?${backSearchParams.toString()}`
        : "/users";

    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-semibold">User not found</h2>
            <p className="text-sm text-muted-foreground text-center max-w-md">
                The user you are looking for was not found.
            </p>
            <Link
                href={backHref}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-background"
            >
                Back to list
            </Link>
        </div>
    );
}
