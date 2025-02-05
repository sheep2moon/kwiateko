import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar";
import { CircleUserRound, DiamondPlus, Flower, LogIn } from "lucide-react";
import Link from "next/link";
import CustomSidebarFooter from "./sidebar-footer";

const menuItems = [
    { title: "Dodaj Rośline", href: "/plants/add-plant", icon: Flower },
    { title: "Konto", href: "/account", icon: CircleUserRound },
    { title: "Zarejestruj", href: "/sign-up", icon: DiamondPlus },
    { title: "Zaloguj", href: "/sign-in", icon: LogIn }
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
            <CustomSidebarFooter />
        </Sidebar>
    );
}
