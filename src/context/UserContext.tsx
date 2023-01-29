import { createContext, useEffect, useState } from "react";
import { User } from "types/context/user";
import Cookies from "universal-cookie";
import axios from "axios"

export const UserContext = createContext<any>([null])

const UserContextProvider = ({ children, refresh }: { children: any, refresh: { access_token: string, refresh_token: string, user: User } | null }) => {
    const [user, setUser] = useState<{ access_token: string, refresh_token: string, user: User } | null>(null)


    function clear() {
        setUser(null)
    }

    //set user if refresh 
    useEffect(() => {
        setUser(refresh)
    }, [refresh])

    //set access token as cookie
    useEffect(() => {
        if (user?.access_token) {
            const expires = new Date().setDate(new Date().getDate() + 1)
            const aWeekLater = new Date().setDate(new Date().getDate() + 7);
            new Cookies().set('access_token', user?.access_token, { path: '/', expires: new Date(expires) })
            new Cookies().set('refresh_token', user?.refresh_token, { path: '/', expires: new Date(aWeekLater) })
        }
    }, [user])

    return (
        <UserContext.Provider value={[user, setUser, clear]}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider