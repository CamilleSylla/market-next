import { createContext, useState } from "react";
import { User } from "types/context/user";

export const UserContext = createContext<[{ access_token: string, user: User } | null, any, any] | [null]>([null])

const UserContextProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState<{ access_token: string, user: User } | null>(null)
    function clear() {
        setUser(null)
    }
    return (
        <UserContext.Provider value={[user, setUser, clear]}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider