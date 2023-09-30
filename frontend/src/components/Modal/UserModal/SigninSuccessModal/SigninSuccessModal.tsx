import cn from 'classnames';
import styles from './style.module.scss';
import { SuccessModal } from '~components/Modal/SuccessModal/SuccessModal';
import { Button } from '~components/Button';
import { ROUTES_DATA } from '~src/data/routes';
import { IProps } from './types';

const SigninSuccessModal = ({ cbCloseModal }: IProps) => {
  return (
    <SuccessModal cbCloseModal={cbCloseModal} title="Вы успешно вошли в аккаунт" text="Приятных покупок">
      <>
        <Button
          rootClassName={cn(styles['btn-to-catalog'])}
          textClassName={cn(styles['btn-to-catalog-text'])}
          isLink
          href={ROUTES_DATA.CATALOG.url}
          text="В каталог"
          onClick={cbCloseModal}
        />

        <Button
          rootClassName={cn(styles['btn-to-profile'])}
          textClassName={cn(styles['btn-to-profile-text'])}
          isLink
          href={ROUTES_DATA.PROFILE.url}
          text="В личный кабинет"
          variant={2}
          onClick={cbCloseModal}
        />
      </>
    </SuccessModal>
  );
};

export { SigninSuccessModal };
