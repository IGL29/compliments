import cn from 'classnames';
import styles from './style.module.scss';
import { Notify } from '../Notify';
import { IProps } from './types';
import { Button } from '../Button';

const Notifications = ({ data, cbDeleteNotify, cbDeleteAllNotify }: IProps) => {
  const notificationsJSX = data.map((notifyData) => {
    return (
      <Notify
        rootClassName={styles['notifications__notify']}
        data={notifyData}
        cbDelete={cbDeleteNotify}
        key={notifyData.id}
      />
    );
  });

  const deleteAllHandler = () => cbDeleteAllNotify();

  const renderNotifications = data.length > 0;
  const renderBtnDeleteAll = data.length > 1;

  return (
    <>
      {renderNotifications && (
        <div className={cn(styles['notifications'])} onMouseLeave={deleteAllHandler}>
          <div className={styles['notifications__notify-list-wrapper']}>
            <div className={cn(styles['notifications__notify-list'])}>{notificationsJSX}</div>
          </div>

          {renderBtnDeleteAll && (
            <Button
              rootClassName={styles['notifications__btn-close']}
              wrapperContentClassName={styles['notifications__wrapper-content-btn']}
              text="скрыть все"
              onClick={deleteAllHandler}
              variant={3}
            />
          )}
        </div>
      )}
    </>
  );
};

export { Notifications };
