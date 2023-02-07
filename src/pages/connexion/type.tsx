import TypeSeletion from "@/components/Navigation/Login/TypeSelection";
import LoginContextProvider, { LoginContext } from "@/context/LoginContext";
import LoginLayout from "@/layouts/login";
import { useContext, useEffect } from "react";

export default function TypePage() {
    return (
        <LoginLayout>
            <TypeSeletion />
        </LoginLayout>
    )
}