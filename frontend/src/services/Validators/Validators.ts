import { ResultValidator, Value } from './types';

class Validators {
  public static minLenght(minLength: number) {
    return function <T extends Value>([value, errors = []]: ResultValidator<T>): ResultValidator<T> {
      if (String(value).length < minLength) {
        errors.push('minLenght');
      }
      return [value, errors];
    };
  }
  public static maxLenght(maxLength: number) {
    return function <T extends Value>([value, errors = []]: ResultValidator<T>): ResultValidator<T> {
      if (String(value).length > maxLength) {
        errors.push('minLenght');
      }
      return [value, errors];
    };
  }
  public static empty() {
    return function <T extends Value>([value, errors = []]: ResultValidator<T>): ResultValidator<T> {
      if (!value.replace(/\s/g, '').length) {
        errors.push('empty');
      }
      return [value, errors];
    };
  }
  public static email() {
    return function <T extends Value>([value, errors = []]: ResultValidator<T>): ResultValidator<T> {
      if (!value.match(/\w+@\w+/)) {
        errors.push('email');
      }
      return [value, errors];
    };
  }
  public static phone() {
    return function <T extends Value>([value, errors = []]: ResultValidator<T>): ResultValidator<T> {
      if (value.replace(/\s/g, '').length !== 10) {
        errors.push('phone');
      }
      return [value, errors];
    };
  }
  public static truthy() {
    return function <T extends Value>([value, errors = []]: ResultValidator<T>): ResultValidator<T> {
      if (!value) {
        errors.push('truthy');
      }
      return [value, errors];
    };
  }
}

export { Validators };
