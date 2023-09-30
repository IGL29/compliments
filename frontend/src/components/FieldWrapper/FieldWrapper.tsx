import cn from 'classnames';
import { Icon } from '~components/icons/Icon';
import styles from './style.module.scss';

const FieldWrapper = ({
  children,
  rootClassName = '',
  isPassword,
  cbChangeVisiblePassword,
  isVisiblePassword,
  error,
}: {
  children: JSX.Element;
  rootClassName?: string;
  isPassword?: boolean;
  isVisiblePassword?: boolean;
  error?: string;
  cbChangeVisiblePassword?: () => void;
}) => {
  const wrapperErrorClassName = error ? styles['field-wrapper--error'] : '';
  const visiblePasswordClassName = isVisiblePassword ? styles['field-wrapper__hide-password-btn--visible'] : '';
  const contentJSX = isPassword ? (
    <>
      {children}
      <button
        className={cn(styles['field-wrapper__hide-password-btn'], visiblePasswordClassName)}
        type="button"
        onClick={cbChangeVisiblePassword}
      >
        <Icon className={cn(styles['field-wrapper__hide-password-icon'])} icon="eye" viewBox="0 0 25 25" />
      </button>
    </>
  ) : (
    children
  );

  return <div className={cn(styles['field-wrapper'], rootClassName, wrapperErrorClassName)}>{contentJSX}</div>;
};

export { FieldWrapper };
