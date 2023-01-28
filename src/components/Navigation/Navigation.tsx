import Link from "next/link";

export default function Navigation() {

    return (
        <nav className="py-2">
            <Link href="/connexion" className="inline-block px-6 py-2 rounded bg-primary-color text-sm font-semibold text-main-white">Inscrption / Connexion</Link>
        </nav>
    )
}