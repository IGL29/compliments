export interface IProps {
  value?: string | null;
  stub: string;
}

const getStubString = ({ value, stub }: IProps): string => {
  return value || stub;
};

export { getStubString };
