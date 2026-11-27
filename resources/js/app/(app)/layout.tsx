import type { ReactNode } from 'react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import type { User } from '@/types';

// What HandleInertiaRequests shared - the signed-in user - is read here, by
// the layout that shows it, rather than for every page.
export default async function AppLayout({ children }: { children: ReactNode }) {
    const [user, sidebarOpen] = await Promise.all([
        rpc<User>('Shared.user'),
        rpc<boolean>('Shared.sidebarOpen'),
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
