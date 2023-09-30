import cn from 'classnames';
import styles from './style.module.scss';
import { Button } from '~components/Button';
import { SuccessModal } from '~components/Modal/SuccessModal/SuccessModal';
import { IProps } from './types';
import { ROUTES_DATA } from '~src/data/routes';

const RegistrationSuccessModal = ({ cbCloseModal, cbOpenAuthModal }: IProps) => {
  return (
    <SuccessModal title="Спасибо за регистрацию" text="Приятных покупок" cbCloseModal={cbCloseModal}>
      <>
        <Button
          rootClassName={cn(styles['btn-to-catalog'])}
          textClassName={cn(styles['btn-to-catalog-text'])}
          isLink
          href={ROUTES_DATA.CATALOG.url}
          text="В каталог"
        />

        <Button
          rootClassName={cn(styles['btn-to-profile'])}
          textClassName={cn(styles['btn-to-profile-text'])}
          text="К авторизации"
          onClick={cbOpenAuthModal}
          variant={2}
        />
      </>
    </SuccessModal>
  );
};

export { RegistrationSuccessModal };
