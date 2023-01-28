import classNames from "classnames";
import { Formik, Form, Field } from "formik";
import { useContext, useEffect, useState } from "react";
import { Seller, Shop, ShopType } from "types/pages/enseigne.dto";
import { SellerSchema, ShopSchema } from "./validations";
import { Listbox, Transition } from '@headlessui/react'
import axios from "axios";
import { SnackBarContext } from "@/context/SnackBarContext";

export default function EnseigneSignIn({ types }: { types: ShopType[] }) {

    const [user, setUser] = useState<Seller>()
    const [view, setView] = useState<'seller' | 'shop'>('seller')
    const [shopType, setShopType] = useState<ShopType>(types[0])
    const [snackBar, setSnackBar] = useContext(SnackBarContext)

    const handleSellerSubmit = (values: Seller & { confirm: string }, actions: any) => {
        const validatePassword = values.password === values.confirm
        if (validatePassword) {
            setUser(values)
            setView('shop')
        } else {
            console.log(actions);
            ["password", "confirm"].forEach(field => {
                actions.setFieldError(field, "Not Matching")
            })
        }
    }

    const handleShopSubmit = async (e: Shop) => {
        await saveUser(e)
    }

    async function saveUser(shop: Shop): Promise<void> {
        try {
            const save = await axios.post(`http://localhost:3000/shops`, { user, org: shop })
            console.log(save.data);
        } catch (error: any) {
            setSnackBar({ type: 'error', message: error.message })
            throw error
        }
    }

    const Input = ({ field, label, type, form }: any) => {
        const classes = classNames('border-b-2 w-full', { 'border-red-600': form.errors[field.name], 'border-secondary-color': !form.errors[field.name] })
        const required: boolean = view === 'seller' ? SellerSchema.fields[field.name]?.exclusiveTests?.required : ShopSchema.fields[field.name]?.exclusiveTests?.required

        if (type === "select") {

            return (
                <div className={classes + " relative"}>
                    <Listbox name={field.name} value={types} onChange={setShopType} >
                        <Listbox.Label className="block font-semibold text-base text-primary-color">{label}<span className="text-red-600">{required ? " *" : ""}</span></Listbox.Label>
                        <Listbox.Button className="mt-5 w-full bg-transparent text-left">{shopType.name}</Listbox.Button>
                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >

                            <Listbox.Options className="absolute w-full bg-main-white shadow-lg rounded-b-lg border-t-2 border-primary-color overflow-hidden">
                                {types.map((type) => (
                                    <Listbox.Option
                                        className="py-3 px-2 hover:bg-blue-50"
                                        key={type.id}
                                        value={type}
                                    >
                                        <span className="ml-2">{type.name}</span>
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </Listbox>
                </div>
            )
        }
        return (
            <div className={classes}>
                <label className="block font-semibold text-base text-primary-color">{label}<span className="text-red-600">{required ? " *" : ""}</span> </label>
                <input className="mt-5 w-full bg-transparent"  {...field} type={type} />
            </div>
        )
    }

    const SellerForm = () => {
        return (
            <div className="absolute top-0 left-0  w-full">
                <Transition
                    appear={true}
                    show={view === "seller"}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Formik
                        initialValues={{
                            first_name: "",
                            last_name: "",
                            email: "",
                            password: "",
                            confirm: "",
                            adress_name: "",
                            adress_city: "",
                            adress_number: "",
                            adress_zip: ""
                        }}
                        enableReinitialize={false}
                        validationSchema={SellerSchema}
                        onSubmit={(values, actions) => handleSellerSubmit(values, actions)}
                    >
                        <Form>
                            <div className=" grid grid-cols-1 gap-y-6">
                                <div className="flex gap-6">
                                    <Field name="first_name" component={Input} label="Prénom" />
                                    <Field name="last_name" component={Input} label="Nom" />
                                </div>
                                <Field name="email" type="email" component={Input} label="Adresse email" />
                                <div className="flex gap-6">
                                    <Field name="password" type="password" component={Input} label="Mot de passe" />
                                    <Field name="confirm" type="password" component={Input} label="Confirmation" />
                                </div>
                                <div className="flex gap-6">
                                    <Field name="adress_number" component={Input} label="N° rue" />
                                    <Field name="adress_name" component={Input} label="Libellé de rue" />
                                </div>
                                <div className="grid grid-cols-2 gap-6" >
                                    <Field name="adress_city" component={Input} label="Ville" />
                                    <Field name="adress_zip" component={Input} label="Code postal" />
                                </div>
                            </div>
                            <button className="w-full rounded-lg py-4 font-semibold text-sm mt-12 border-2 text-primary-color border-primary-color shadow-custom hover:shadow-custom-effect transition-all ease-in-out duration-150" type="submit">Continuer</button>
                        </Form>
                    </Formik>
                </Transition>
            </div>
        )
    }

    const ShopForm = () => {
        return (
            <div className="absolute top-0 left-0 w-full">
                <Transition
                    appear={true}
                    show={view !== "seller"}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform translate-x-full opacity-0"
                    enterTo="transform translate-x-0 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Formik
                        initialValues={{
                            name: "",
                            type: shopType,
                            email: "",
                            phone: "",
                            siret: "",
                            logo: "",
                            adress_name: "",
                            adress_city: "",
                            adress_number: "",
                            adress_zip: ""
                        }}
                        enableReinitialize={false}
                        validationSchema={ShopSchema}
                        onSubmit={values => handleShopSubmit(values)}
                    >
                        <Form>
                            <div className=" grid grid-cols-1 gap-y-6">
                                <div className="flex gap-6">
                                    <Field name="name" component={Input} label="Nom" />
                                    <Field name="type" type="select" component={Input} label="Coeur de métier" />
                                </div>
                                <div className="flex gap-6">
                                    <Field name="email" type="email" component={Input} label="Adresse email" />
                                    <Field name="phone" type="phone" component={Input} label="N° de telephone" />
                                </div>
                                <div className="flex gap-6">
                                    <Field name="siret" component={Input} label="N° de SIRET" />
                                    <Field name="logo" component={Input} label="Logo Url" />
                                </div>
                                <div className="flex gap-6">
                                    <Field name="adress_number" component={Input} label="N° rue" />
                                    <Field name="adress_name" component={Input} label="Libellé de rue" />
                                </div>
                                <div className="grid grid-cols-2 gap-6" >
                                    <Field name="adress_city" component={Input} label="Ville" />
                                    <Field name="adress_zip" component={Input} label="Code postal" />
                                </div>
                            </div>
                            <button type="submit" className="w-full rounded-lg py-4 font-semibold text-sm mt-12 border-2 text-primary-color border-primary-color shadow-custom hover:shadow-custom-effect transition-all ease-in-out duration-150" >Continuer</button>
                        </Form>
                    </Formik>
                </Transition>
            </div>
        )
    }

    return (
        <div className="flex h-screen">
            <div className="w-[44%] overflow-hidden">
                <div className="pt-16 pl-16 pr-32">
                    <h3 className="text-4xl font-bold text-primary-color">Heureux de vous connaître !</h3>
                    <h4 className="text-sm font-semibold mt-2 text-secondary-color">Creation d'une enseigne</h4>
                    <h5 className=" text-2xl font-semibold text-third-color mt-4 mb-6">{view === 'seller' ? "Informations gérant" : "Informations de l'enseigne"}</h5>
                    <div className="relative">
                        <SellerForm />
                        <ShopForm />
                    </div>
                </div>
            </div>
            <div className="w-[66%] h-screen">
                <img src="https://source.unsplash.com/random" className="h-full w-full object-cover" />
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const shoptypes = await axios.get(`${process.env.BFF_BASE}/admin/shops-types`)
    const { types } = shoptypes.data

    return {
        props: {
            types
        }
    }
}