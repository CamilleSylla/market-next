import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import classNames from "classnames";
import { BuildingStorefrontIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { CredentialSchema } from "./validation";
import axios from 'axios'
import { SnackBarContext } from "@/context/SnackBarContext";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";

export default function ConnexionPage({ bff_base }: { bff_base: string }) {
    const [path, setPath] = useState<string>("")
    const [snackBar, setSnackBar] = useContext(SnackBarContext)
    const [user, setUser] = useContext(UserContext)
    const [displayForm, setDisplayForm] = useState<boolean>(false)
    const router = useRouter()
    const paths = {
        user: `${bff_base}/auth/seller/login`,
        seller: `${bff_base}/auth/seller/login`
    }

    useEffect(() => {
        if (user) {
            setSnackBar({ type: 'error', message: 'Vous êtes déja connecté...' })
            router.push('/')
        }
    }, [])

    const handleUserTypeSelect = (type: string) => {
        setPath(paths[type])
        setDisplayForm(true)
    }

    const handleSubmit = async (values: { email: string, password: string }) => {
        try {
            const res = await (await axios.post(path, values))
            const { user, access_token, refresh_token } = res.data
            setUser({ user, access_token, refresh_token })
            setSnackBar({ type: 'info', message: `👋 Hey !, content de vous re-voir ${user.first_name}!` })
            router.push('/')
        } catch (error: any) {
            setSnackBar({ type: 'error', message: error.response.data.message })
        }
    }


    const Input = ({ field, label, type, form }: any) => {
        const classes = classNames('border-b-2 w-full mb-4', { 'border-red-600': form.errors[field.name], 'border-secondary-color': !form.errors[field.name] })
        const required: boolean = CredentialSchema.fields[field.name]?.exclusiveTests?.required

        return (
            <div className={classes}>
                <label className="block font-semibold text-base text-primary-color">{label}<span className="text-red-600">{required ? " *" : ""}</span> </label>
                <input className="mt-5 mb w-full bg-transparent"  {...field} type={type} />
            </div>
        )
    }

    const UserTypeSelect = () => {
        return (
            <Transition
                appear={true}
                show={!displayForm}
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                as={Fragment}
            >
                <div className=" w-full flex gap-6">
                    <button onClick={() => handleUserTypeSelect("user")} className="flex basis-full	 flex-col items-center rounded-lg p-4 font-semibold text-sm border-2 text-primary-color border-primary-color shadow-custom hover:shadow-custom-effect transition-all ease-in-out duration-150">
                        <ShoppingBagIcon className="w-8 stroke-primary-color" />
                        <span className="block text-base font-semibold text-primary-color">Client</span>
                    </button>
                    <button onClick={() => handleUserTypeSelect("seller")} className="flex basis-full flex-col items-center rounded-lg p-4 font-semibold text-sm border-2 text-primary-color border-primary-color shadow-custom hover:shadow-custom-effect transition-all ease-in-out duration-150">
                        <BuildingStorefrontIcon className="w-8 stroke-primary-color" />
                        <span className="block text-base font-semibold text-primary-color">Enseigne</span>
                    </button>
                </div>
            </Transition>
        )
    }

    const LogForm = () => {
        return (
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                enableReinitialize={false}
                validationSchema={CredentialSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
                <Form>
                    <Field name="email" component={Input} label="Adresse email" />
                    <Field name="password" type="password" component={Input} label="Mot de passe" />
                    <button className="w-full rounded-lg py-4 font-semibold text-sm mt-12 border-2 text-primary-color border-primary-color shadow-custom hover:shadow-custom-effect transition-all ease-in-out duration-150" type="submit">Continuer</button>
                </Form>
            </Formik>
        )
    }



    return (
        <div className="absolute -z-20 w-screen h-screen">
            <div className="absolute w-full h-full backdrop-blur-3xl">
                <Transition
                    appear={true}
                    show={true}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                    as={Fragment}
                >
                    <div className="absolute w-[500px] px-12 py-11 bg-main-white rounded-lg  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <h2 className=" text-primary-color font-semibold">Heureux de vous revoir! 👋</h2>
                        <h3 className=" font-semibold text-third-color text-2xl mb-8">Me connecter</h3>
                        <div className="w-full">{displayForm ? <LogForm /> : <UserTypeSelect />}</div>
                        <div></div>
                    </div>
                </Transition>
            </div>
            <img src="https://media.giphy.com/media/IxKubPlRZclS8/giphy.gif" className="h-full w-full object-cover" />
        </div>
    )
}

export function getServerSideProps() {
    return {
        props: {
            bff_base: process.env.BFF_BASE
        }
    }
}