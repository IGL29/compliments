export interface IProps {
  isOpenAuthModal: boolean;
  isOpenRegisterModal: boolean;
  cbOpenRegisterHandler: () => void;
  cbOpenAuthHandler: () => void;
  cbCloseModal: () => void;
}
