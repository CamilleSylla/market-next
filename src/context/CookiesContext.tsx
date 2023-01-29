import { createContext, useState } from "react";

export const CookiesContext = createContext<any>({})

const CookiesContextProvider = ({ children }: { children: any }) => {
    const [cookies, setCookies] = useState({
        essentials: true,
    })
    return (
        <CookiesContext.Provider value={[cookies, setCookies]}>
            {children}
        </CookiesContext.Provider>
    )
}

export default CookiesContextProvider