import { getSession } from "@/app/actions";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import Link from "next/link";

export default async function SiteHeader() {
    const session = await getSession();
    console.log(session);

    return (
        <header className="flex shrink-0 items-center gap-2 border-b sticky top-0 z-20">
            <div className="flex items-center gap-2 px-2 h-[--header-height] bg-background">
                <SidebarTrigger className="h-10 w-10" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Link href="/" className="">
                    KWIATEKO
                </Link>
            </div>
        </header>
    );
}
