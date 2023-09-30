export interface IProps {
  emailValue: string;
  emailError?: string;
  cbChangeTouchedEmail: () => void;
  cbChangeEmailValue: (value: string) => void;
  isLoading: boolean;
  cbDoSubscribe: () => void;
}
