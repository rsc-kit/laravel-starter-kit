'use client';

import Link from '@rsc-kit/core/Link';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { usePathname } from '@rsc-kit/core/usePathname';
import type { Route } from '@rsc-kit/core/routes';
import type { NavItem } from '@/types';

export function NavMain({ items }: { items: NavItem[] }) {
    const pathname = usePathname();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={item.href === pathname}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href as Route}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
