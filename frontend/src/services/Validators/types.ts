export type ValidationErrors = string[];
export type Value = string;

export type ResultValidator<T = Value> = [T, ValidationErrors];
export type Validator = (args: ResultValidator) => ResultValidator;
