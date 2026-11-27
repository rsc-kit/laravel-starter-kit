import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import type { AppLayoutProps, User } from '@/types';

/**
 * The header variant of the app layout. To use it, render it from
 * app/(app)/layout.tsx in place of the sidebar shell, with the user that
 * layout reads.
 */
export default function AppHeaderLayout({
    user,
    children,
    breadcrumbs,
}: AppLayoutProps & { user: User }) {
    return (
        <AppShell variant="header">
            <AppHeader user={user} breadcrumbs={breadcrumbs} />
            <AppContent variant="header">{children}</AppContent>
        </AppShell>
    );
}
