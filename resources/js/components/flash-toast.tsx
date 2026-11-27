'use client';

import { useEffect } from 'react';
import { toast as show } from 'sonner';
import type { FlashToast as Toast } from '@/types/ui';

/**
 * Toasts already shown, by the object the render handed over. A page you
 * have visited is kept alive while you are elsewhere, and React runs its
 * effects again each time it is shown: without this, coming back to the
 * profile page said "Profile updated." again. A new flash is a new render,
 * so a new object, and it is shown.
 */
const shown = new WeakSet<Toast>();

/**
 * What the action before this page flashed as session('toast') - read by the
 * page with rpc('Shared.toast') and shown once.
 */
export function FlashToast({ toast }: { toast: Toast | null }) {
    useEffect(() => {
        if (toast && !shown.has(toast)) {
            shown.add(toast);
            show[toast.type](toast.message, { id: toast.message });
        }
    }, [toast]);

    return null;
}
