import { SubscribtionFormContainer } from '~src/containers/SubscribtionFormContainer/SubscribtionFormContainer';
import { Modal } from '..';
import { IProps } from './types';
import styles from './style.module.scss';

const SubscribtionModal = ({ cbCloseModal }: IProps) => {
  return (
    <Modal cbCloseModal={cbCloseModal}>
      <div className={styles['modal-content']}>
        <h2 className={styles['modal-content__title']}>Подпишитесь на наши новости</h2>
        <SubscribtionFormContainer />
      </div>
    </Modal>
  );
};

export { SubscribtionModal };
