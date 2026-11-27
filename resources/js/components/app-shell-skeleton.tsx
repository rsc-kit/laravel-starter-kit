import { Skeleton } from '@/components/ui/skeleton';

/**
 * What the app's pages show while the signed-in user is read: the sidebar and
 * a page's header, in outline. Stored with the build and served at once, so a
 * page paints before the session has been asked anything.
 */
export function AppShellSkeleton() {
    return (
        <div className="flex min-h-svh w-full">
            <aside className="hidden w-(--sidebar-width,16rem) shrink-0 flex-col gap-4 bg-sidebar p-4 md:flex">
                <Skeleton className="h-8 w-32" />
                <div className="flex flex-col gap-2 pt-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-4/5" />
                </div>
                <Skeleton className="mt-auto h-10 w-full" />
            </aside>
            <main className="flex flex-1 flex-col gap-6 p-4 md:m-2 md:ml-0 md:rounded-xl md:bg-background md:shadow-sm">
                <Skeleton className="h-5 w-40" />
                <div className="grid gap-4 md:grid-cols-3">
                    <Skeleton className="aspect-video rounded-xl" />
                    <Skeleton className="aspect-video rounded-xl" />
                    <Skeleton className="aspect-video rounded-xl" />
                </div>
                <Skeleton className="min-h-64 flex-1 rounded-xl" />
            </main>
        </div>
    );
}
