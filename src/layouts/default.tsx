import Navigation from "@/components/Navigation/Navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DefaultLayout({ children }) {
    const router = useRouter()
    const blackListPaths = ["/inscription/enseigne"]
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