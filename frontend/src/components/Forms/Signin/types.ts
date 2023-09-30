import { FormEvent } from 'react';

export interface IProps {
  rootClassName?: string;
  passwordValue: string;
  emailValue: string;
  agreeValue: boolean;
  isLoading?: boolean;
  emailError?: string;
  passwordError?: string;
  agreeError?: string;
  cbChangeEmail: (value: string) => unknown;
  cbChangePassword: (value: string) => unknown;
  cbChangeAgree: (value: boolean) => unknown;
  cbSubmit: (event: FormEvent<HTMLFormElement>) => unknown;
  cbChangeTouchedEmail: () => void;
  cbChangeTouchedPassword: () => void;
  cbChangeTouchedAgree: () => void;
}
