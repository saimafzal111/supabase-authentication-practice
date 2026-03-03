'use client'

import * as React from 'react'
import { LayoutDashboard, Users, LogOut, ChevronRight } from 'lucide-react'
import { logout } from '@/app/(auth)/actions'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar'
import Link from 'next/link'

const data = {
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: LayoutDashboard,
        },
        {
            title: 'Customers',
            url: '/dashboard',
            icon: Users,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props} className="border-r border-slate-200">
            <SidebarHeader className="flex items-center justify-center py-6 border-b border-slate-200">
                <div className="flex items-center gap-2 px-4">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-slate-900 text-slate-50 font-bold">
                        S
                    </div>
                    <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">Supabase Dashboard</span>
                </div>
            </SidebarHeader>
            <SidebarContent className="p-2">
                <SidebarMenu>
                    {data.navMain.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild tooltip={item.title} className="hover:bg-slate-100 transition-colors">
                                <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="border-t border-slate-200 p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => logout()}
                            className="text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                            tooltip="Logout"
                        >
                            <LogOut className="rotate-180" />
                            <span>Log out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
