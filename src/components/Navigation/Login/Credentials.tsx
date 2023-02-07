import { LoginContext } from "@/context/LoginContext";
import { Formik, Form, Field } from "formik";
import { useContext, useEffect } from "react";
import { CredentialSchema } from "./validation";
import classNames from "classnames";
import axios from 'axios'
import { UserContext } from "@/context/UserContext";
import { SnackBarContext } from "@/context/SnackBarContext";
import { useRouter } from "next/router";



export default function Credentials() {
    const [login, setLogin] = useContext(LoginContext)
    const [user, setUser] = useContext(UserContext)
    const [, setSnackBar] = useContext(SnackBarContext)
    const router = useRouter()

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

    const handleSubmit = async (values: { email: string, password: string }) => {
        try {
            const res = await axios.post(`${process.env.BFF_BASE || "http://localhost:3000"}/auth/${login?.type}/login`, { ...values })
            const { user, access_token } = res.data
            setUser({ ...user, ...res.data })
            const { totp_enable } = user
            if (!totp_enable) {
                const qrCode = await fetch(`${process.env.BFF_BASE || "http://localhost:3000"}/totp/generate`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                if (qrCode.ok) {
                    const blob = new Blob([await qrCode.arrayBuffer()], { type: 'image/png' })
                    const objectURL = URL.createObjectURL(blob);
                    setLogin({ ...login, qrCodeURL: objectURL })
                    router.push('/connexion/2fa/init')
                }
            }
            router.push('/connexion/2fa/verify')
        } catch (error: any) {
            setSnackBar({ type: 'error', message: error.response.data.message })
        }
    }

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