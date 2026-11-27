import { usePathname } from '@rsc-kit/core/usePathname';

export type IsCurrentUrlFn = (
    urlToCheck: string,
    currentUrl?: string,
    startsWith?: boolean,
) => boolean;

export type IsCurrentOrParentUrlFn = (
    urlToCheck: string,
    currentUrl?: string,
) => boolean;

export type WhenCurrentUrlFn = <TIfTrue, TIfFalse = null>(
    urlToCheck: string,
    ifTrue: TIfTrue,
    ifFalse?: TIfFalse,
) => TIfTrue | TIfFalse;

export type UseCurrentUrlReturn = {
    currentUrl: string;
    isCurrentUrl: IsCurrentUrlFn;
    isCurrentOrParentUrl: IsCurrentOrParentUrlFn;
    whenCurrentUrl: WhenCurrentUrlFn;
};

/** Whether a link is the page the visitor is on, from the router's path. */
export function useCurrentUrl(): UseCurrentUrlReturn {
    const currentUrlPath = usePathname();

    const isCurrentUrl: IsCurrentUrlFn = (
        urlToCheck,
        currentUrl,
        startsWith = false,
    ) => {
        const urlToCompare = currentUrl ?? currentUrlPath;

        const comparePath = (path: string): boolean =>
            startsWith ? urlToCompare.startsWith(path) : path === urlToCompare;

        if (!urlToCheck.startsWith('http')) {
            return comparePath(urlToCheck);
        }

        try {
            return comparePath(new URL(urlToCheck).pathname);
        } catch {
            return false;
        }
    };

    const isCurrentOrParentUrl: IsCurrentOrParentUrlFn = (
        urlToCheck,
        currentUrl,
    ) => isCurrentUrl(urlToCheck, currentUrl, true);

    const whenCurrentUrl: WhenCurrentUrlFn = <TIfTrue, TIfFalse = null>(
        urlToCheck: string,
        ifTrue: TIfTrue,
        ifFalse: TIfFalse = null as TIfFalse,
    ): TIfTrue | TIfFalse => (isCurrentUrl(urlToCheck) ? ifTrue : ifFalse);

    return {
        currentUrl: currentUrlPath,
        isCurrentUrl,
        isCurrentOrParentUrl,
        whenCurrentUrl,
    };
}
