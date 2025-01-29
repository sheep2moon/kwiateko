import { getSession } from "@/app/actions";
import Link from "next/link";

export default async function Navbar() {
    const session = await getSession();
    console.log(session);

    return (
        <div className="flex gap-4 p-4 text-lg">
            <Link href="/">Kwiateko</Link>

            {session.isLoggedIn ? (
                <>
                    <Link href="/plants/add-plant">Dodaj roślinę</Link>
                    <Link href="/account">Konto</Link>
                </>
            ) : (
                <>
                    <Link href="/sign-in">Zaloguj</Link>
                    <Link href="/sign-up">Zarejestruj</Link>
                </>
            )}
        </div>
    );
}
