import cn from 'classnames';

import { Button } from '~components/Button';
import { Modal } from '../Modal';
import styles from './style.module.scss';
import { IProps } from './types';
import { SignInContainer } from '~src/containers/SignInContainer';
import { RegisterContainer } from '~src/containers/RegisterContainer';

const BUTTON_STATE = {
  active: 3,
  unactive: 2,
} as const;
const getButtonVariant = (condition: boolean) => (condition ? BUTTON_STATE.active : BUTTON_STATE.unactive);

const UserModal = ({
  isOpenAuthModal,
  isOpenRegisterModal,
  cbOpenAuthHandler,
  cbOpenRegisterHandler,
  cbCloseModal,
}: IProps) => {
  return (
    <Modal cbCloseModal={cbCloseModal}>
      <div className={cn(styles['auth'])}>
        <div className={cn(styles['auth__tabs-wrapper'])}>
          <Button
            text="Войти"
            rootClassName={cn(styles['auth__signin-btn'], styles['auth__tab'])}
            textClassName={cn(styles['auth__tab-text'])}
            variant={getButtonVariant(isOpenAuthModal)}
            onClick={cbOpenAuthHandler}
          />

          <Button
            text="Зарегистрироваться"
            variant={getButtonVariant(isOpenRegisterModal)}
            rootClassName={cn(styles['auth__registration-btn'], styles['auth__tab'])}
            textClassName={cn(styles['auth__tab-text'])}
            onClick={cbOpenRegisterHandler}
          />
        </div>

        {isOpenAuthModal && <SignInContainer rootClassName={cn(styles['auth__signin-form'])} />}

        {isOpenRegisterModal && <RegisterContainer rootClassName={cn(styles['auth__registration-form'])} />}
      </div>
    </Modal>
  );
};

export { UserModal };
