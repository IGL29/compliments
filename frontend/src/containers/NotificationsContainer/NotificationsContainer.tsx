import { useContext } from 'react';
import { Notifications } from '~src/components/Notifications';
import { NotificationsContext } from '~src/contexts/NotificationsContext';

const NotificationsContainer = () => {
  const notificationsValue = useContext(NotificationsContext);

  const deleteNotifyHandler = (id: string) => {
    notificationsValue.deleteNotify({ id });
  };
  const deleteAllNotifyHandler = () => {
    notificationsValue.deleteAllNotify();
  };

  return (
    <Notifications
      data={notificationsValue.notifications}
      cbDeleteNotify={deleteNotifyHandler}
      cbDeleteAllNotify={deleteAllNotifyHandler}
    />
  );
};

export { NotificationsContainer };
