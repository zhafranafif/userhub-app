

export function UsersTableSkeleton() {
  return (
        <div className="min-h-screen px-4 py-6 md:px-8 md:py-8">
            <div className="px-5">
                <div className="mt-6">
                    <div className="hidden xl:block overflow-hidden rounded-xl border border-border">
                        <div className="animate-pulse">
                            <div className="flex h-12 items-center bg-light-primary/80 px-4">
                                <div className="grid w-full grid-cols-6 gap-4">
                                    <div className="h-4 w-24 rounded bg-primary" />
                                    <div className="h-4 w-24 rounded bg-primary" />
                                    <div className="h-4 w-24 rounded bg-primary" />
                                    <div className="h-4 w-24 rounded bg-primary" />
                                    <div className="h-4 w-24 rounded bg-primary" />
                                    <div className="h-4 w-24 rounded bg-primary" />
                                </div>
                            </div>

                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="grid h-14 grid-cols-6 gap-4 border-t border-border px-4 py-3">
                                    <div className="h-4 w-40 rounded bg-primary" />
                                    <div className="h-4 w-44 rounded bg-primary" />
                                    <div className="h-4 w-28 rounded bg-primary" />
                                    <div className="h-4 w-24 rounded bg-primary" />
                                    <div className="h-4 w-24 rounded bg-primary" />
                                    <div className="h-4 w-24 rounded bg-primary" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="xl:hidden">
                        <div className="animate-pulse space-y-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="rounded-2xl border border-border bg-white/80 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-11 w-11 rounded-full bg-light-primary" />
                                        <div className="min-w-0 flex-1 space-y-2">
                                            <div className="h-4 w-40 rounded bg-primary" />
                                            <div className="h-3 w-52 rounded bg-primary/70" />
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <div className="h-5 w-24 rounded-full bg-light-primary" />
                                    </div>

                                    <div className="mt-4 grid grid-cols-3 gap-3">
                                        <div className="rounded-xl border border-border bg-white px-3 py-2">
                                            <div className="h-3 w-12 rounded bg-primary/60" />
                                            <div className="mt-2 h-4 w-10 rounded bg-primary" />
                                        </div>
                                        <div className="rounded-xl border border-border bg-white px-3 py-2">
                                            <div className="h-3 w-16 rounded bg-primary/60" />
                                            <div className="mt-2 h-4 w-10 rounded bg-primary" />
                                        </div>
                                        <div className="rounded-xl border border-border bg-white px-3 py-2">
                                            <div className="h-3 w-14 rounded bg-primary/60" />
                                            <div className="mt-2 h-4 w-10 rounded bg-primary" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}