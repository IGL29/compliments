import { UserModal } from '~components/Modal/UserModal';
import { IProps } from './types';
import { SigninSuccessModal } from '../Modal/UserModal/SigninSuccessModal/SigninSuccessModal';
import { RegistrationSuccessModal } from '../Modal/UserModal/RegistrationSuccessModal/RegistrationSuccessModal';
import { SubscribtionModal } from '../Modal/SubscribtionModal';
import { FiltersModal } from '../Modal/FiltersModal';

const Modals = ({
  isOpenAuthModal,
  isOpenRegisterModal,
  isOpenAuthSuccessModal,
  isOpenRegisterSuccessModal,
  isOpenSubscribtionModal,
  isOpenFiltersModal,
  cbCloseFiltersModal,
  cbOpenRegisterHandler,
  cbOpenAuthHandler,
  cbCloseUserModal,
  cbCloseAuthSuccessModal,
  cbCloseRegisterSuccessModal,
  cbCloseSubscribtionModal,
}: IProps) => {
  return (
    <>
      {(isOpenAuthModal || isOpenRegisterModal) && (
        <UserModal
          isOpenAuthModal={isOpenAuthModal}
          isOpenRegisterModal={isOpenRegisterModal}
          cbOpenAuthHandler={cbOpenAuthHandler}
          cbOpenRegisterHandler={cbOpenRegisterHandler}
          cbCloseModal={cbCloseUserModal}
        />
      )}
      {isOpenAuthSuccessModal && <SigninSuccessModal cbCloseModal={cbCloseAuthSuccessModal} />}
      {isOpenRegisterSuccessModal && (
        <RegistrationSuccessModal cbCloseModal={cbCloseRegisterSuccessModal} cbOpenAuthModal={cbOpenAuthHandler} />
      )}
      {isOpenSubscribtionModal && <SubscribtionModal cbCloseModal={cbCloseSubscribtionModal} />}
      {isOpenFiltersModal && <FiltersModal cbCloseModal={cbCloseFiltersModal} />}
    </>
  );
};

export { Modals };
