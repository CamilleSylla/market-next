import { UserContext } from "@/context/UserContext";
import { Popover, Transition } from "@headlessui/react";
import { UserCircleIcon, ChartBarIcon, PowerIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from 'axios'
import { SnackBarContext } from "@/context/SnackBarContext";


export default function UserMenu() {
    const [snackBar, setSnackBar] = useContext(SnackBarContext)
    const [user, setUser] = useContext(UserContext)
    const [activeUser, setActiveUser] = useState<{ name: string, href: string, icon: any, iconColors: string, iconWrapper: string, description: string }[]>()
    const manager = [
        {
            name: "Dashboard",
            href: `/dashboard/utilisateur/${user.user.id}`,
            icon: ChartBarIcon,
            iconColors: "stroke-primary-color",
            iconWrapper: 'flex h-10 w-10 p-2 rounded-lg shrink-0 bg-blue-100 items-center justify-center text-white sm:h-12 sm:w-12 ',
            description: "Consulter l'activité de votre enseigne"
        },
        {
            name: "Déconnexion",
            href: `/connexion`,
            icon: PowerIcon,
            iconColors: "stroke-red-500",
            iconWrapper: 'flex h-10 w-10 p-2 rounded-lg shrink-0 bg-red-100 items-center justify-center text-white sm:h-12 sm:w-12 ',
            description: "Vous allez nous manquer..."
        },
    ]

    const handleClick = async () => {
        try {
            const res = await axios.post(process.env.BFF_BASE || 'http://localhost:3000/auth/seller/logout', { id: user.user.id }, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`
                }
            })
            if (res.data?.error) {
                throw new Error()
            }
            new Cookies().remove('access_token')
            new Cookies().remove('refresh_token')
            setUser(null)
            setSnackBar({ type: "info", message: "Vous avez été déconnecté" })
        } catch (error) {
            setSnackBar({ type: "error", message: "Une erreur est survenue durant votre déconnexion" })
        }
    }

    useEffect(() => {
        const loggedInUser = user.user

        if (loggedInUser.manager) {
            setActiveUser(manager)
        }
    }, [])

    return (
        <Popover className="relative w-auto ">
            <Popover.Button className="p-2 hover:bg-blue-100 rounded-full"><UserCircleIcon className="h-8 stroke-primary-color" /></Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute max-w-xs min-w-[375px] right-0 z-10 mt-3 px-4 sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden rounded-lg shadow-lg ">
                        <div className="relative grid gap-8 bg-white p-7">
                            {activeUser?.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.name !== 'Déconnexion' ? item.href : {}}
                                >
                                    <div
                                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-slate-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                        onClick={e => item.name === 'Déconnexion' ? handleClick() : e}
                                    >
                                        <div className={item.iconWrapper}>
                                            <item.icon aria-hidden="true" className={item.iconColors} />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-third-color">
                                                {item.name}
                                            </p>
                                            <p className="text-sm text-secondary-color">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}