import type { Route } from '@rsc-kit/core/routes';
import type { LucideIcon } from 'lucide-react';

export type BreadcrumbItem = {
    title: string;
    href: Route;
};

export type NavItem = {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
};
