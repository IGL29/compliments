export interface IProps {
  isOpenAuthModal: boolean;
  isOpenRegisterModal: boolean;
  isOpenAuthSuccessModal: boolean;
  isOpenRegisterSuccessModal: boolean;
  isOpenSubscribtionModal: boolean;
  isOpenFiltersModal: boolean;
  cbCloseFiltersModal: () => void;
  cbOpenAuthHandler: () => void;
  cbOpenRegisterHandler: () => void;
  cbCloseUserModal: () => void;
  cbOpenAuthSuccessModal: () => void;
  cbCloseAuthSuccessModal: () => void;
  cbCloseRegisterSuccessModal: () => void;
  cbCloseSubscribtionModal: () => void;
}
