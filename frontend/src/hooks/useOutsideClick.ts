import { useEffect, useState } from 'react';

const useOutsideClick = () => {
  const [clickEvent, setClickEvent] = useState<MouseEvent>();

  const outerClickHandler = (ev: MouseEvent) => setClickEvent(ev);

  useEffect(() => {
    document.addEventListener('click', outerClickHandler);

    return () => {
      document.removeEventListener('click', outerClickHandler);
    };
  }, []);

  return clickEvent;
};

export { useOutsideClick };
