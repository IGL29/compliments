import { useState, useRef, SyntheticEvent, useEffect } from 'react';
import styles from './style.module.scss';

const DEFAULT_LOADING_CLASSNAME = styles['image-loading'];
const PREFIX_NON_ELEMENT_ATTRIBUTE = 'custom';
const regExp = new RegExp(`^${PREFIX_NON_ELEMENT_ATTRIBUTE}`);

interface IRequiredAttrs {
  alt: string;
  src: string;
}

type ReservedAttrNames = 'onLoad';

interface IAttrs extends React.HTMLAttributes<HTMLImageElement>, IRequiredAttrs {}
type IAttrsWithoutReserved = Omit<IAttrs, ReservedAttrNames>;

interface ICustomProps {
  customLoadingClassName?: string;
  customOnLoad?: (ev: SyntheticEvent<HTMLImageElement, Event>) => void;
}

interface IProps extends IAttrsWithoutReserved, ICustomProps {}

const Image = (props: IProps) => {
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imageRef.current?.complete) {
      setIsLoadingImage(true);
    }
  }, []);

  const getAttrsFromProps = (props: IProps) => {
    const elementAttrs: IAttrsWithoutReserved = {} as IAttrsWithoutReserved;
    const entries = Object.entries(props) as [key: keyof IProps, val: IProps[keyof IProps]][];

    entries.forEach(([key, val]) => {
      if (key.match(regExp)) {
        return;
      }
      elementAttrs[key as keyof IAttrsWithoutReserved] = val;
    });
    return elementAttrs;
  };

  const attrs = getAttrsFromProps(props);

  const switchLoadingClassName = (img: HTMLImageElement) => {
    if (isLoadingImage) {
      img.classList.add(DEFAULT_LOADING_CLASSNAME);
    }
    if (!isLoadingImage && img.classList.contains(DEFAULT_LOADING_CLASSNAME)) {
      img.classList.remove(DEFAULT_LOADING_CLASSNAME);
    }
  };

  if (imageRef.current) {
    switchLoadingClassName(imageRef.current);
  }

  const imageOnLoadHandler = (ev: SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoadingImage(false);
    if (props.customOnLoad) {
      props.customOnLoad(ev);
    }
  };

  const imageOnErrorHandler = () => {
    setIsLoadingImage(false);
  };

  const getAttrsWithReserved = (attrs: IAttrsWithoutReserved): IAttrs => {
    return { ...attrs, onLoad: imageOnLoadHandler, onError: imageOnErrorHandler };
  };

  return <img {...getAttrsWithReserved(attrs)} />;
};

export { Image };
