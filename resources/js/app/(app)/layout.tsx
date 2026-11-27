import { cookies } from "@rsc-kit/core/request";
import { Suspense, type ReactNode } from "react";
import { AppContent } from "@/components/app-content";
import { AppShell } from "@/components/app-shell";
import { AppSidebar } from "@/components/app-sidebar";
import { NavUser, NavUserSkeleton } from "@/components/nav-user";
import type { User } from "@/types";

// The shell renders at once: the sidebar, its links and the page. Only the
// user menu waits on Laravel for the signed-in user, and only it shows a
// skeleton while it does.
export default async function AppLayout({ children }: { children: ReactNode }) {
    // The cookie the sidebar writes when toggled, read here rather than asked
    // of Laravel - it is left unencrypted for that (bootstrap/app.php) - so
    // the first paint is the visitor's, not a default corrected on hydration.
    const sidebarOpen = (await cookies()).get("sidebar_state")?.value !== "false";

    return (
        <AppShell variant="sidebar" defaultOpen={sidebarOpen}>
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
