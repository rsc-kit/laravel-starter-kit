import { useFlash } from '@rsc-kit/core/useFlash';
import { toast } from 'sonner';

/** What an action flashed with Rsc::flash(), shown once as a toast. */
export function useFlashToast(): void {
    useFlash(({ message, kind }) => {
        (kind === 'error' ? toast.error : kind === 'info' ? toast.info : kind === 'warning' ? toast.warning : toast.success)(message);
    });
}
