import { ValidationErrors } from '../Validators/types';

export type FieldValue = string | number | null | boolean;

export interface Validation<T extends FieldValue> {
  value: T;
  isError: boolean;
  errors: ValidationErrors;
}
