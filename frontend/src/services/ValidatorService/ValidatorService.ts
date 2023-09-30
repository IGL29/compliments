import { Validator } from '../Validators/types';
import { FieldValue, Validation } from './types';

class ValidatorService {
  public static validate<T extends FieldValue>(value: T, validators: Validator[] | []): Validation<T> {
    const stringValue = this.getStringFromValue(value);

    const valueString = String(stringValue);
    const result: [string, string[]] = [valueString, []];

    validators.forEach((validator) => {
      validator(result);
    });
    const isErrorsExists = !!result[1].length;
    return { value: value, isError: isErrorsExists, errors: result[1] };
  }

  private static getStringFromValue<T extends FieldValue>(value: T) {
    if (value === null) {
      return '';
    }
    if (typeof value === 'boolean' && value === true) {
      return ' ';
    }
    if (typeof value === 'boolean' && value === false) {
      return '';
    }
    return String(value);
  }
}

export { ValidatorService };
