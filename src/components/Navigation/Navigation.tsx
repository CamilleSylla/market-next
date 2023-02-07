import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useContext } from "react";
import UserMenu from "./UserMenu/UserMenu";

export default function Navigation() {
    const [user] = useContext(UserContext)
    return (
        <nav className="py-2 w-full">
            {/* //actions */}
            <div className="w-full flex justify-between">
                <h1>Logo</h1>
                <div className="mr-36">
                    {user ? <UserMenu />
                        : <Link href="/connexion/type"
                            className="inline-block rounded-lg p-2 font-semibold text-sm  border-2 text-primary-color border-primary-color shadow-custom hover:shadow-custom-effect transition-all ease-in-out duration-150">
                            Inscrption / Connexion
                        </Link>
                    }
                </div>
            </div>
        </nav>
    )
}