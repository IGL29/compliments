import { Modals } from '~src/components/Modals';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { DOMSideEffectsService } from '~src/services/DOMSideEffectsService';
import {
  openUserRegisterModal,
  openUserAuthModal,
  closeUserModal,
  closeUserAuthSuccessModal,
  openUserAuthSuccessModal,
  closeUserRegisterSuccessModal,
  closeSubscribtionModal,
  closeFiltersModal,
} from '~src/store/features/modals/modalsSlice';

export const ModalsContainer = () => {
  const dispatch = useAppDispatch();
  const isOpenAuthModal = useAppSelector((state) => state.modals.isOpenUserAuthModal);
  const isOpenRegisterModal = useAppSelector((state) => state.modals.isOpenUserRegisterModal);
  const isOpenSubscribtionModal = useAppSelector((state) => state.modals.isOpenSubscribtionModal);
  const isOpenSuccessAuthModal = useAppSelector((state) => state.modals.isOpenUserAuthSuccessModal);
  const isOpenRegisterSuccessModal = useAppSelector((state) => state.modals.isOpenUserRegisterSuccessModal);
  const isOpenFiltersModal = useAppSelector((state) => state.modals.isOpenFiltersModal);
  const closeUserModalHandler = () => dispatch(closeUserModal());
  const closeFiltersModalHandler = () => dispatch(closeFiltersModal());
  const openAuthModalHandler = () => dispatch(openUserAuthModal());
  const closeSubscribtionModalHandler = () => dispatch(closeSubscribtionModal());
  const openRegisterModalHandler = () => dispatch(openUserRegisterModal());
  const openAuthSuccessModalHandler = () => dispatch(openUserAuthSuccessModal());
  const closeAuthSuccessModalHandler = () => dispatch(closeUserAuthSuccessModal());
  const closeRegisterSuccessModalHandler = () => dispatch(closeUserRegisterSuccessModal());

  if (
    isOpenAuthModal ||
    isOpenRegisterModal ||
    isOpenSuccessAuthModal ||
    isOpenRegisterSuccessModal ||
    isOpenFiltersModal
  ) {
    new DOMSideEffectsService().setOverflowBody();
  } else if (new DOMSideEffectsService().isOverflowBody()) {
    new DOMSideEffectsService().resetOverflowBody();
  }

  return (
    <Modals
      isOpenSubscribtionModal={isOpenSubscribtionModal}
      isOpenAuthModal={isOpenAuthModal}
      isOpenRegisterModal={isOpenRegisterModal}
      isOpenRegisterSuccessModal={isOpenRegisterSuccessModal}
      isOpenAuthSuccessModal={isOpenSuccessAuthModal}
      isOpenFiltersModal={isOpenFiltersModal}
      cbCloseFiltersModal={closeFiltersModalHandler}
      cbOpenAuthHandler={openAuthModalHandler}
      cbOpenRegisterHandler={openRegisterModalHandler}
      cbCloseUserModal={closeUserModalHandler}
      cbCloseSubscribtionModal={closeSubscribtionModalHandler}
      cbOpenAuthSuccessModal={openAuthSuccessModalHandler}
      cbCloseAuthSuccessModal={closeAuthSuccessModalHandler}
      cbCloseRegisterSuccessModal={closeRegisterSuccessModalHandler}
    />
  );
};
