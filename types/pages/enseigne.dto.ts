export type Seller = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  adress_name: string;
  adress_city: string;
  adress_number: string;
  adress_zip: string;
};

export type Shop = {
  name: string;
  type: ShopType;
  email: string;
  phone: string;
  siret: string;
  logo: string;
  adress_name: string;
  adress_city: string;
  adress_number: string;
  adress_zip: string;
};

export type ShopType = {
  id: string | number;
  name: string;
};
