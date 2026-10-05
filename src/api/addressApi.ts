import API from "./client";

export interface Address {
  id?: string | number;
  name: string;
  contactNumber: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  label: string;
}

export const getAddresses = async () => {
  const response = await API.get<Address[]>("/addresses");
  return response.data;
};

export const createAddress = async (address: Omit<Address, "id">) => {
  const response = await API.post<Address>("/addresses", address);
  return response.data;
};
