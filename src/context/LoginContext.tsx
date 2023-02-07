import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext<any>([])

const LoginContextProvider = ({ children }: { children: any }) => {
    const [login, setLogin] = useState<{
        type: "user" | "seller" | null,
        qrCodeURL: string
    }>({
        type: null,
        qrCodeURL: ""
    })
    return (
        <LoginContext.Provider value={[login, setLogin]}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider