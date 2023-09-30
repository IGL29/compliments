import { OrdersList } from '../OrdersList';
import { IProps } from './types';
import { Loader } from '../Loader';
import { ErrorBlock } from '../ErrorBlock';

const UserOrders = ({ rootClassName, orders, isLoading, error, cbRepeatRequestOrders }: IProps) => {
  const renderLoader = isLoading;
  const renderError = !isLoading && Boolean(error);
  const renderOrders = !renderLoader && !renderError;

  return (
    <div className={ rootClassName}>
      <h2 className="visually-hidden">Мои покупки</h2>

      {renderLoader && <Loader text="Загружаем" />}

      {renderError && (
        <ErrorBlock
          text="Произошла ошибка"
          cbRepeatRequest={cbRepeatRequestOrders}
        />
      )}

      {renderOrders && <OrdersList orders={orders} />}
    </div>
  );
};

export { UserOrders };
