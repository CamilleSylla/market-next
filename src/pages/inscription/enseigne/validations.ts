import * as Yup from "yup";

export const SellerSchema = Yup.object({
  first_name: Yup.string().required(
    "Ce champ est requis"
  ),
  last_name: Yup.string().required(
    "Ce champ est requis"
  ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Ce champ est requis"),
  password: Yup.string()
    .min(
      6,
      "Le mot de passe doit contenir un minimum de 6 caractères"
    )
    .required("Ce champ est requis"),
  confirm: Yup.string()
    .min(
      6,
      "Le mot de passe doit contenir un minimum de 6 caractères"
    )
    .required("Ce champ est requis"),
  adress_name: Yup.string().required(
    "Ce champ est requis"
  ),
  adress_city: Yup.string().required(
    "Ce champ est requis"
  ),
  adress_number: Yup.string().required(
    "Ce champ est requis"
  ),
  adress_zip: Yup.string().required(
    "Ce champ est requis"
  ),
});

export const ShopSchema = Yup.object({
  name: Yup.string().required(
    "Ce champ est requis"
  ),
  phone: Yup.string().required(
    "Ce champ est requis"
  ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Ce champ est requis"),
  type: Yup.object({
    id: Yup.string().required(
      "Ce champ est requis"
    ),
    name: Yup.string().required(
      "Ce champ est requis"
    ),
  }).required("Ce champ est requis"),
  logo: Yup.string().url(),
  siret: Yup.string().required(),
  adress_name: Yup.string().required(
    "Ce champ est requis"
  ),
  adress_city: Yup.string().required(
    "Ce champ est requis"
  ),
  adress_number: Yup.string().required(
    "Ce champ est requis"
  ),
  adress_zip: Yup.string().required(
    "Ce champ est requis"
  ),
});
