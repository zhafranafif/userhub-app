export default function UsersNotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 py-6 md:px-8 md:py-8">
            <h2 className="text-2xl font-semibold">Users not found</h2>
            <p className="text-sm text-muted-foreground">
                No users are available right now.
            </p>
        </div>
    );
}