import { FlashToast } from "@/components/flash-toast";
import type { FlashToast as Toast } from "@/types/ui";

/**
 * The toast the last action flashed, read on its own so the page around it
 * can be stored: put it under a <Suspense> with nothing as the fallback.
 */
export async function SessionToast() {
    return <FlashToast toast={await rpc<Toast | null>("Shared.toast")} />;
}
