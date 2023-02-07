import { LoginContext } from "@/context/LoginContext"
import LoginLayout from "@/layouts/login"
import { Disclosure, Transition } from "@headlessui/react"
import { ChevronRightIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/router"
import { useContext } from "react"

export default function InitMFA() {
    const [login] = useContext(LoginContext)
    const router = useRouter()

    return (
        <LoginLayout>
            <h4 className=" text-lg text-primary-color">Authentification a double facteur</h4>
            <div className="grid grid-cols-1 text-left py-2 gap-2">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="py-2 w-full text-left font-semibold text-primary-color bg-blue-100 rounded-lg flex justify-between">
                                <span className=" ml-2">En utilisant IOS</span>
                                <ChevronRightIcon className={`${open ? 'rotate-90 transform' : ''} h-5 mr-2`} />
                            </Disclosure.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Disclosure.Panel className="text-gray-500">
                                    Yes! You can purchase a license that you can share with your entire
                                    team.
                                </Disclosure.Panel>
                            </Transition>

                        </>
                    )}
                </Disclosure>
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="py-2 w-full text-left font-semibold text-primary-color bg-blue-100 rounded-lg flex justify-between">
                                <span className=" ml-2">En utilisant Google Authenticator</span>
                                <ChevronRightIcon className={`${open ? 'rotate-90 transform' : ''} h-5 mr-2`} />
                            </Disclosure.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Disclosure.Panel className="text-gray-500">
                                    Yes! You can purchase a license that you can share with your entire
                                    team.
                                </Disclosure.Panel>
                            </Transition>
                        </>

                    )}
                </Disclosure>
            </div>
            <p className=" text-third-color font-semibold text-xs">Scannez le QrCode avec votre smartphone</p>
            <img className="my-0 mx-auto py-2" src={login.qrCodeURL} />
            <button
                onClick={() => router.push('/connexion/2fa/verify')}
                className="w-full rounded-lg py-4 font-semibold text-sm mt-4 border-2 text-primary-color border-primary-color shadow-custom hover:shadow-custom-effect transition-all ease-in-out duration-150">
                Continuer
            </button>
        </LoginLayout>
    )
}