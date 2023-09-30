import { useEffect, useState } from 'react';
import { ObservableViewportSize } from '~src/services/ObservableViewportSize/ObservableViewportSize';
import { IViewportSize } from '~src/services/ObservableViewportSize';

const useViewportSize = () => {
  const [viewportSize, setViewportSize] = useState<IViewportSize>({
    width: new ObservableViewportSize().viewportSizes.width,
  });

  useEffect(() => {
    const subscription = new ObservableViewportSize().subscribe({ next: setViewportSize });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const breakpoints = <const>{
    equalAndBelow: {
      xl: viewportSize.width <= 1440,
      lg: viewportSize.width <= 1200,
      md: viewportSize.width <= 992,
      sm: viewportSize.width <= 768,
      xs: viewportSize.width <= 576,
    },
  };
  return <const>[viewportSize, breakpoints];
};

export { useViewportSize };
