import cn from 'classnames';
import styles from './style.module.scss';
import { Icon } from '~components/icons/Icon';
import type { IProps } from './types';
import { EDAYS_OF_WEEK_DESCR } from '~src/data/daysOfWeek';
import { TransformDataService } from '~src/services/TransformDataService';

const Address = ({ rootClassName, workTime, phone }: IProps) => {
  const phoneView = TransformDataService.toViewPhone(phone);
  const workDayFromView = TransformDataService.toViewDayOfWeek(workTime.day.from);
  const workDayToView = TransformDataService.toViewDayOfWeek(workTime.day.to);
  const workDayFromTitle = EDAYS_OF_WEEK_DESCR[workDayFromView];
  const workDayToTitle = EDAYS_OF_WEEK_DESCR[workDayToView];

  return (
    <address className={cn(styles['contacts'], rootClassName)} data-testid="address">
      <div className={cn(styles['contacts__social-wrapper'])}>
        <a href="/" aria-label="Телеграм">
          <Icon icon="telegram" className={cn(styles['icon'])} viewBox="2 0 32 32" />
        </a>

        <a href="/" aria-label="Вотсап">
          <Icon icon="whatsapp" className={cn(styles['icon'])} viewBox="2 0 30 30" />
        </a>
      </div>

      <div className={cn(styles['contacts__additionally-info-wrapper'], styles['additionally-info-wrapper'])}>
        <a className={cn(styles['additionally-info-wrapper__phone'], styles.phone)} href={`tel:${phoneView}`}>
          {phoneView}
        </a>

        <p className={cn(styles['additionally-info-wrapper__wrapper-worktime'], styles['wrapper-worktime'])}>
          с {workTime.time.from} до {workTime.time.to} (<abbr title={workDayFromTitle}>{workDayFromView}</abbr>-
          <abbr title={workDayToTitle}>{workDayToView}</abbr>)
        </p>
      </div>
    </address>
  );
};

export { Address };
