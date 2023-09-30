export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: number;
}

export interface ISavedUser extends IUser {
  address: IUserAddress;
  purchaseAmount: number;
  isSubscribe: boolean;
}

export interface IUserAddress {
  city: string;
  street: string;
  house: string;
  entrance?: string;
  apartment?: string;
}
