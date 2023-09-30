interface IDebounce {
  (callback: () => void): void;
  prevTimer: TimerId;
}

type TimerId = null | ReturnType<typeof setTimeout>;

const getDebounce = function (delay: number): IDebounce {
  let timerId: TimerId = null;

  const debounce: IDebounce = function debounce(callback: () => void) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      callback();
    }, delay);

    debounce.prevTimer = timerId;
  };
  debounce.prevTimer = null;

  return debounce;
};

export { getDebounce };
