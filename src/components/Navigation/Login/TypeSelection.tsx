import { LoginContext } from "@/context/LoginContext";
import { Transition } from "@headlessui/react";
import { BuildingStorefrontIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { Fragment, useContext } from "react";

export default function TypeSeletion() {
    const [login, setLogin] = useContext(LoginContext)
    const router = useRouter()
    const handleSubmit = (type: "user" | "seller") => {
        setLogin({ ...login, type: type })
        router.push('/connexion/credentials')
    }
    return (
        <Transition
            appear={true}
            show={true}
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}
        >
            <div className=" w-full flex gap-6">
                <button onClick={() => handleSubmit("user")} className="flex basis-full	 flex-col items-center rounded-lg p-4 font-semibold text-sm border-2 text-primary-color border-primary-color shadow-custom hover:shadow-custom-effect transition-all ease-in-out duration-150">
                    <ShoppingBagIcon className="w-8 stroke-primary-color" />
                    <span className="block text-base font-semibold text-primary-color">Client</span>
                </button>
                <button onClick={() => handleSubmit('seller')} className="flex basis-full flex-col items-center rounded-lg p-4 font-semibold text-sm border-2 text-primary-color border-primary-color shadow-custom hover:shadow-custom-effect transition-all ease-in-out duration-150">
                    <BuildingStorefrontIcon className="w-8 stroke-primary-color" />
                    <span className="block text-base font-semibold text-primary-color">Enseigne</span>
                </button>
            </div>
        </Transition>
    )
}