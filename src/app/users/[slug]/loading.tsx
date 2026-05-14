

export default function UserDetailLoading() {
    return (
        <div className="min-h-screen px-4 py-6 md:px-8 md:py-8">
            <div className="animate-pulse">
                <div className="mb-8 h-5 w-28 rounded bg-primary" />

                <div className="flex justify-center">
                    <div className="w-full max-w-sm rounded-2xl border border-border bg-white/80 p-5">
                        <div className="flex items-center gap-2">
                            <div className="h-12 w-12 shrink-0 rounded-full bg-primary" />
                            <div className="min-w-0 flex-1 space-y-2">
                                <div className="h-4 w-3/4 rounded bg-primary" />
                                <div className="h-3 w-1/2 rounded bg-primary" />
                            </div>
                        </div>

                        <hr className="my-4 border-border" />

                        <div className="space-y-3">
                            <div className="h-4 w-20 rounded bg-primary" />
                            <div className="space-y-2">
                                <div className="h-4 w-full rounded bg-primary" />
                                <div className="h-4 w-5/6 rounded bg-primary" />
                                <div className="h-4 w-4/5 rounded bg-primary" />
                            </div>
                        </div>

                        <hr className="my-4 border-border" />

                        <div className="space-y-3">
                            <div className="h-4 w-20 rounded bg-primary" />
                            <div className="space-y-2">
                                <div className="h-4 w-11/12 rounded bg-primary" />
                                <div className="h-4 w-4/5 rounded bg-primary" />
                            </div>
                        </div>

                        <hr className="my-4 border-border" />

                        <div className="space-y-3">
                            <div className="h-4 w-20 rounded bg-primary" />
                            <div className="rounded-xl bg-primary/20 p-4 space-y-3">
                                <div className="h-4 w-3/5 rounded bg-primary" />
                                <div className="h-4 w-11/12 rounded bg-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}