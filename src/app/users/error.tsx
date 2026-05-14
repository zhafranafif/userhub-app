"use client";
export default function UsersError({
    error,
    reset,   
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-semibold">{error.message}</h2>
            <p className="text-sm text-muted-foreground">
                An error occurred while fetching the users data. Please try again later.
            </p>
            <button
                onClick={reset}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-background hover:cursor-pointer"
            >
                Try Again
            </button>
        </div>
    );
};