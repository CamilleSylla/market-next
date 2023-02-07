import * as Yup from "yup";

export const CredentialSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Ce champ est requis"),
  password: Yup.string()
    .min(
      6,
      "Le mot de passe doit contenir un minimum de 6 caractères"
    )
    .required("Ce champ est requis"),
});
