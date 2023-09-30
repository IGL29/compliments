import { Params } from '~src/services/RouterService/types';

const getUpdatedValues = function <T extends Params, U extends Params>(withDifferentKeys: T, initial: U) {
  const updatedOptions: Params = {};

  Object.keys(initial).forEach((key) => {
    if (key in withDifferentKeys) {
      updatedOptions[key] = withDifferentKeys[key];
      return;
    }
    updatedOptions[key] = initial[key];
  });
  return updatedOptions as Partial<U>;
};

export { getUpdatedValues };
