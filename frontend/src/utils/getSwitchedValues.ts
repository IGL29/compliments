import { Params } from '~src/services/RouterService/types';

const getSwitchedValues = function <K extends string, V extends string, T extends Params<K, V>>(
  key: K,
  value: V,
  options: T,
): V[] {
  const existsValue = options[key].findIndex((option) => option === value);

  const updatedOptions =
    existsValue === -1 ? [...options[key], value] : options[key].filter((_, index: number) => index !== existsValue);
  return updatedOptions;
};

export { getSwitchedValues };
