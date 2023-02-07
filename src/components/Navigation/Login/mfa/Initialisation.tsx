import { LoginContext } from "@/context/LoginContext"
import { useContext } from "react"

export default function Initialisation() {
    const [login] = useContext(LoginContext)
    return (
        <div >
            <img className="w-5 h-5 object-contain" src={login.qrCodeURL} />
        </div>
    )
}