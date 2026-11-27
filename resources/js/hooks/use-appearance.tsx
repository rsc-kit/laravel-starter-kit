'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

const nothing = () => () => {};

export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = ResolvedAppearance | 'system';

export type UseAppearanceReturn = {
    readonly appearance: Appearance;
    readonly resolvedAppearance: ResolvedAppearance;
    readonly updateAppearance: (mode: Appearance) => void;
};

/**
 * The visitor's appearance, kept by the ThemeProvider in app/layout.tsx.
 *
 * The browser remembers it, in localStorage, and the class is set before the
 * first paint. Nothing on the server reads it, so a page that reads nothing
 * else about the visitor can still be stored and served to everyone.
 */
export function useAppearance(): UseAppearanceReturn {
    const { theme, resolvedTheme, setTheme } = useTheme();
    // 'system' until hydrated, as the server rendered it: the stored choice
    // is the browser's, and reading it during hydration would not match.
    const hydrated = useSyncExternalStore(nothing, () => true, () => false);

    return {
        appearance: hydrated ? ((theme as Appearance | undefined) ?? 'system') : 'system',
        resolvedAppearance: resolvedTheme === 'dark' ? 'dark' : 'light',
        updateAppearance: setTheme,
    } as const;
}
