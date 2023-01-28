import { SnackBarContext } from "@/context/SnackBarContext";
import { useContext, useEffect } from "react";
import classNames from "classnames";
import { Transition } from "@headlessui/react";
import { XCircleIcon } from '@heroicons/react/24/solid'



export default function SnackBar({ children }: { children: any }) {
    const [snackBar, setSnackBar, clear] = useContext(SnackBarContext)
    const classes = classNames("absolute flex justify-between items-center py-6 px-4 w-2/5 left-1/2 transform -translate-x-1/2 mt-4 rounded-lg border-2 ", {
        "bg-red-100 text-red-500 border-red-500": snackBar?.type === 'error',
        "bg-orange-100 text-orange-500 border-orange-500": snackBar?.type === 'warn',
        "bg-blue-100 text-primary-color border-primary-color": snackBar?.type === 'info'
    })
    const type = {
        info: "Info",
        warn: "Warning",
        error: "Error",
    }

    const Snack = () => {
        return (
            <div className={classes}>
                <p>
                    <span className="mr-2 font-semibold">{type[snackBar?.type ? snackBar?.type : 'info']} : </span>
                    {snackBar?.message}
                </p>
                <XCircleIcon className=" h-8" onClick={() => clear()} />
            </div>
        )
    }


    return (
        <>
            <Transition
                appear={true}
                show={snackBar ? true : false}
                enter="transition duration-100 ease-out"
                enterFrom="transform translate-x-full opacity-0"
                enterTo="transform translate-x-0 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform translate-x-full opacity-100"
                leaveTo="transform translate-x-0 opacity-0"
            >
                <Snack />
            </Transition>
            {children}
        </>
    )
}