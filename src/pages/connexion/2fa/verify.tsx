import { SnackBarContext } from "@/context/SnackBarContext";
import { UserContext } from "@/context/UserContext";
import LoginLayout from "@/layouts/login";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export default function Verify2fa() {
    const [value, setValue] = useState<string | null>(null)
    const [, setSnackBar] = useContext(SnackBarContext)
    const [user, setUser] = useContext(UserContext)
    const router = useRouter()

    const handleClick = async () => {
        try {
            const res = await axios.post(`${process.env.BFF_BASE || 'http://localhost:3000'}/totp/turn-on`,
                {
                    code: value
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`
                    }
                }
            )
            setUser({ ...res.data })
            setSnackBar({ type: 'info', message: `👋 Hey !, content de vous re-voir ${res.data.user.first_name}!` })
            router.push('/')
        } catch (error: any) {
            setSnackBar({ type: "error", message: error.response.data.message })
        }
    }

    return (
        <LoginLayout>
            <p className="text-center">Utilisez votre application pour inscrire le code a 6 chiffres</p>
            <div className="flex justify-evenly w-full">
                <input type="text" className=" w-3/4 text-center text-lg text-primary-color font-semibold my-4 h-12 rounded-lg border-2 border-primary-color" onChange={e => setValue(e.target.value)} />
            </div>
            <button
                onClick={handleClick}
                className="w-full rounded-lg py-4 font-semibold text-sm mt-4 border-2 text-primary-color border-primary-color shadow-custom hover:shadow-custom-effect transition-all ease-in-out duration-150">
                Verifier
            </button>
        </LoginLayout>
    )
}