'use client';

import { useEffect } from 'react';
import { toast as show } from 'sonner';
import type { FlashToast as Toast } from '@/types/ui';

/**
 * What the action before this page flashed as session('toast') - read by the
 * page with rpc('Shared.toast') and shown once. The message is the toast's
 * id, so a render shown twice does not stack two.
 */
export function FlashToast({ toast }: { toast: Toast | null }) {
    useEffect(() => {
        if (toast) {
            show[toast.type](toast.message, { id: toast.message });
        }
    }, [toast]);

    return null;
}
