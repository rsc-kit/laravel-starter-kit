import { Suspense, type ReactNode } from "react";
import { AppContent } from "@/components/app-content";
import { AppShell } from "@/components/app-shell";
import { AppSidebar } from "@/components/app-sidebar";
import { NavUser, NavUserSkeleton } from "@/components/nav-user";
import type { User } from "@/types";

// The shell renders at once: the sidebar, its links and the page. Only the
// user menu waits on Laravel for the signed-in user, and only it shows a
// skeleton while it does. Whether the sidebar is collapsed is the browser's
// to remember, and it reads its own cookie (components/ui/sidebar.tsx): read
// here, it kept every page from being stored at build.
export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar
                userMenu={
                    <Suspense fallback={<NavUserSkeleton />}>
                        <SignedInUser />
                    </Suspense>
                }
            />
            <AppContent variant="sidebar" className="min-w-0 overflow-x-clip">
                {children}
            </AppContent>
        </AppShell>
    );
}

async function SignedInUser() {
    return <NavUser user={await rpc<User>("Shared.user")} />;
}
