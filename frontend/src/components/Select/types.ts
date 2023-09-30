export interface IProps {
  rootClassName?: string;
  options: Readonly<Option[]>;
  activeOptionIndex: number;
  cbChangeOptionIndex: (index: number) => void;
  isChangeButton?: boolean;
}

interface IOption {
  text: string;
}

export type Option = IOption & { [key: string]: string };
