"use client";

import React from "react";
import { SidebarFooter } from "./ui/sidebar";
import { authClient } from "../lib/auth-client";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogInIcon, LogOutIcon } from "lucide-react";

const CustomSidebarFooter = () => {
    const session = authClient.useSession();
    if (session.data?.user) {
        return (
            <SidebarFooter className="group-data-[collapsible=icon]:w-[--sidebar-width-icon] overflow-hidden flex flex-row gap-2 justify-center items-center bg-gray-100">
                <p className="text-sm group-data-[collapsible=icon]:hidden overflow-hidden">{session.data.user.email}</p>
                <Button onClick={() => authClient.signOut()} variant="outline" size="sm" className="flex">
                    <LogOutIcon />
                    <div className="group-data-[collapsible=icon]:hidden">Wyloguj się</div>
                </Button>
            </SidebarFooter>
        );
    }
    return (
        <SidebarFooter className="group-data-[collapsible=icon]:w-[--sidebar-width-icon] overflow-hidden flex justify-center flex-row bg-gray-100">
            <Link className="bg-white flex items-center gap-2 border rounded-sm p-2 font-semibold" href="/sign-in">
                <LogInIcon />
                <div className="group-data-[collapsible=icon]:hidden">Zaloguj się</div>
            </Link>
        </SidebarFooter>
    );
};

export default CustomSidebarFooter;
