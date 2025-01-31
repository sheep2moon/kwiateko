import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar";
import { CircleUserRound, Flower, LogOut } from "lucide-react";
import Link from "next/link";

const menuItems = [
    { title: "Dodaj Rośline", href: "/plants/add-plant", icon: Flower },
    { title: "Konto", href: "/account", icon: CircleUserRound },
    { title: "Wyloguj", href: "/sign-out", icon: LogOut }
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" className="top-[--header-height] !h-[calc(100svh-var(--header-height))]">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Kwiateko</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map(item => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton variant="outline" asChild tooltip={item.title}>
                                        <Link href={item.href} className="text-lg">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
            <SidebarFooter />
        </Sidebar>
    );
}
