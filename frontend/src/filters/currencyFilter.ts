const CURRENCY_SYMBOL = {
  ['ru-RU']: '₽',
};

type Local = keyof typeof CURRENCY_SYMBOL;

const currencyFilter = (value: number | string, local: Local = 'ru-RU') => {
  const formatedValue = value.toLocaleString(local);
  return formatedValue + `\u00A0` + CURRENCY_SYMBOL[local];
};

export { currencyFilter };
