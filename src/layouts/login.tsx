import LoginContextProvider, { LoginContext } from "@/context/LoginContext";
import { useContext, useEffect } from "react";

export default function LoginLayout({ children }) {
    return (
        <div className="absolute -z-20 w-screen h-screen">
            <div className="absolute w-full h-full backdrop-blur-3xl">
                <div className="absolute w-[500px] px-12 py-11 bg-main-white rounded-lg  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h2 className=" text-primary-color font-semibold">Heureux de vous revoir! 👋</h2>
                    <h3 className=" font-semibold text-third-color text-2xl mb-8">Me connecter</h3>
                    <div className="w-full">
                        {children}
                    </div>
                    <div></div>
                </div>
            </div>
            <img src="https://media.giphy.com/media/IxKubPlRZclS8/giphy.gif" className="h-full w-full object-cover" />
        </div>
    )
}