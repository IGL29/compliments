export interface IUser {
  email: string;
  name: string;
  password: string;
  id: string;
  address: IAddress;
}

export interface IAddress {
  city: string;
  street: string;
  house: string;
  entrance: string;
  apartment: string;
}
