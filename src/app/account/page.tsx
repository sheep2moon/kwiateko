import { getSession, onLogoutAction } from "@/app/actions";
import { Button } from "../../components/ui/button";

export default async function Account() {
    const session = await getSession();
    console.log(session);
    return (
        <div className="container-wrapper">
            <h1>Zalogowany jako: {session.username}</h1>
            <Button onClick={onLogoutAction}>Wyloguj</Button>
        </div>
    );
}
