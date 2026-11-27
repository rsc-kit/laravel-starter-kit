import { Suspense, type ReactNode } from "react";
import { AppContent } from "@/components/app-content";
import { AppShell } from "@/components/app-shell";
import { AppShellSkeleton } from "@/components/app-shell-skeleton";
import { AppSidebar } from "@/components/app-sidebar";
import type { User } from "@/types";

// What HandleInertiaRequests shared - the signed-in user - is read here, by
// the layout that shows it, rather than for every page. Under Suspense, so
// the outline is stored with the build and paints before the session is read.
export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={<AppShellSkeleton />}>
            <SignedIn>{children}</SignedIn>
        </Suspense>
    );
}

async function SignedIn({ children }: { children: ReactNode }) {
    const [user, sidebarOpen] = await Promise.all([
        rpc<User>("Shared.user"),
        rpc<boolean>("Shared.sidebarOpen"),
    ]);

    return (
        <AppShell variant="sidebar" defaultOpen={sidebarOpen}>
            <AppSidebar user={user} />
            <AppContent variant="sidebar" className="min-w-0 overflow-x-clip">
                {children}
            </AppContent>
        </AppShell>
    );
}
