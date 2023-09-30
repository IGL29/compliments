import { nanoid } from 'nanoid';
import { createContext, useState } from 'react';
import { INotify } from '~src/components/Notify/types';

interface INotificationsContext {
  notifications: INotify[];
  showNotify: (payload: Omit<INotify, 'id'>) => void;
  deleteNotify: (payload: Pick<INotify, 'id'>) => void;
  deleteAllNotify: () => void;
}

export const NotificationsContext = createContext<INotificationsContext>({
  notifications: [],
  showNotify: () => ({}),
  deleteNotify: () => ({}),
  deleteAllNotify: () => ({}),
});

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<INotify[]>([]);

  const showNotify = (payload: Omit<INotify, 'id'>) => {
    setNotifications((currentState) => [{ id: nanoid(), ...payload }, ...currentState]);
  };

  const deleteNotify = (payload: Pick<INotify, 'id'>) => {
    setNotifications((currentState) => currentState.filter((notify) => notify.id !== payload.id));
  };

  const deleteAllNotify = () => setNotifications([]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        showNotify,
        deleteNotify,
        deleteAllNotify,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
