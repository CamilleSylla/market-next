import Navigation from "@/components/Navigation/Navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DefaultLayout({ children }: { children: any }) {
    const router = useRouter()
    const blackListPaths = ["/inscription/enseigne", "/connexion/type", "/connexion/credentials", '/connexion/2fa/init', "/connexion/2fa/verify"]
    const [visible, setVisible] = useState<boolean>(true)

    useEffect(() => {
        setVisible(!blackListPaths.includes(router.asPath))
    }, [router])

    const Layout = () => {
        return (
            <>
                <Navigation />
                {children}
            </>
        )
    }

    return (
        <>
            {visible ? <Layout /> : <>{children}</>}
        </>
    )

}