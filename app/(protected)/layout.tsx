"use client"

import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import { useIdleLogout } from '@/hooks/auth/use-idle-logout'
import { usePathname } from 'next/navigation'

const routeTitles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/inventory': 'Inventory Management',
    '/workers': 'Workers Management',
    '/products': 'Product Catalog',
    '/customers': 'Customer Relations',
    '/finance': 'Finance & Invoices',
    '/reports': 'System Reports',
}

function ProtectedLayoutInner({ children }: { children: React.ReactNode }) {
    // Auto-logout after idle timeout
    useIdleLogout()
    const pathname = usePathname()

    // Find the title for the current route, or default to Dashboard
    const title = Object.entries(routeTitles).find(([route]) => pathname.startsWith(route))?.[1] || 'Dashboard'

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 lg:px-6 bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <div className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-none">{title}</div>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-slate-50">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <ProtectedLayoutInner>{children}</ProtectedLayoutInner>
}
