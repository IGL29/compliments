import { FormEvent } from 'react';

export interface IProps {
  isLoading?: boolean;
  rootClassName?: string;
  nameValue: string;
  phoneValue: number | null;
  emailValue: string;
  passwordValue: string;
  nameError?: string;
  passwordError?: string;
  emailError?: string;
  phoneError?: string;
  agreeNewsError?: string;
  agreeDataError?: string;
  isAgreeToNewsChecked: boolean;
  isAgreeToDataChecked: boolean;
  cbChangeTouchedName: () => void;
  cbChangeTouchedEmail: () => void;
  cbChangeTouchedPassword: () => void;
  cbChangeTouchedPhone: () => void;
  cbChangeTouchedAgreeNews: () => void;
  cbChangeTouchedAgreeData: () => void;
  cbSubmitForm?: (ev: FormEvent<HTMLFormElement>) => void;
  cbChangeNameHandler: (value: string) => void;
  cbChangePhoneHandler: (value: number | null) => void;
  cbChangeEmailHandler: (value: string) => void;
  cbChangePasswordHandler: (value: string) => void;
  cbChangeAgreeToNewsHandler: (value: boolean) => void;
  cbChangeAgreeToDataHandler: (value: boolean) => void;
}
