

export function UsersTableSkeleton() {
  return (
        <div className="min-h-screen px-4 py-6 md:px-8 md:py-8">
            <div className="space-y-2">
                <div className="h-10 w-28 animate-pulse rounded bg-primary" />
                <div className="h-5 w-72 animate-pulse rounded bg-primary" />
            </div>

            <div className="mt-10 flex items-center justify-between gap-4">
                <div className="h-12 w-full max-w-sm animate-pulse rounded-lg bg-primary" />
                <div className="h-12 w-full max-w-56 animate-pulse rounded-xl bg-primary" />
            </div>

            <div className="px-5">
                <div className="mt-6 overflow-hidden rounded-xl border border-border">
                    <div className="animate-pulse">
                        <div className="flex h-12 items-center bg-light-primary/80 px-4">
                            <div className="grid w-full grid-cols-3 gap-4">
                                <div className="h-4 w-24 rounded bg-primary" />
                                <div className="h-4 w-24 rounded bg-primary" />
                                <div className="h-4 w-24 rounded bg-primary" />
                            </div>
                        </div>

                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="grid h-14 grid-cols-3 gap-4 border-t border-border px-4 py-3">
                                <div className="h-4 w-40 rounded bg-primary" />
                                <div className="h-4 w-44 rounded bg-primary" />
                                <div className="h-4 w-28 rounded bg-primary" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
  );
}