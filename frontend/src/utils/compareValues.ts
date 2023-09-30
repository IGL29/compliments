const compareValues = (prevValues: Record<string, string[]>, nextValues: Record<string, string[]>): boolean => {
  let isDiff = false;

  Object.entries(nextValues).some(([key, value]) => {
    if (value.length !== prevValues[key].length) {
      return (isDiff = true);
    }
    const isDiffValues = value.some((item) => !prevValues[key].some((itemFromPrev) => itemFromPrev === item));
    if (isDiffValues) {
      return (isDiff = true);
    }
  });
  return isDiff;
};

export { compareValues };
