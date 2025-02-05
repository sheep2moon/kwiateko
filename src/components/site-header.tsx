import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import Link from "next/link";

export default async function SiteHeader() {
    return (
        <div className="flex shrink-0 items-center gap-2 sticky top-0 z-20 overflow-hidden shadow-[0_1px_0_0_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-2 h-[--header-height] bg-background">
                <SidebarTrigger className="h-10 w-10" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Link href="/" className="">
                    KWIATEKO
                </Link>
            </div>
        </div>
    );
}
