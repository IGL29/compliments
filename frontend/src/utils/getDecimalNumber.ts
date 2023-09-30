const ALL_EXCEPT_DECIMAL_REG_EXP = /\D|^[0]+/g;

export const getDecimalNumber = (value: string): number => {
  return Number(value.replace(ALL_EXCEPT_DECIMAL_REG_EXP, ''));
};
