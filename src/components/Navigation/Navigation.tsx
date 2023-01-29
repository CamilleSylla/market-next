import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useContext } from "react";

export default function Navigation() {
    const [user] = useContext(UserContext)
    return (
        <nav className="py-2">
            {user ? null
                : <Link href="/connexion" className="inline-block rounded-lg p-2 font-semibold text-sm  border-2 text-primary-color border-primary-color shadow-custom hover:shadow-custom-effect transition-all ease-in-out duration-150">Inscrption / Connexion</Link>}
        </nav>
    )
}