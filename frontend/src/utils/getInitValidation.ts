import { FieldValue, Validation } from '~src/services/ValidatorService/types';

const getInitValidation = <T extends FieldValue>(value: T): Validation<T> => {
  return { value, isError: false, errors: [] };
};

export { getInitValidation };
