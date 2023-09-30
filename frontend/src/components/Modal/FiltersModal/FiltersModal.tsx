import { Modal } from '..';
import { IProps } from './types';
import styles from './style.module.scss';
import { FiltersContainer } from '~src/containers/FiltersContainer';

const FiltersModal = ({ cbCloseModal }: IProps) => {
  return (
    <Modal cbCloseModal={cbCloseModal}>
      <div className={styles['modal-content']}>
        <FiltersContainer rootClassName={styles['content-wrapper__filters']} />
      </div>
    </Modal>
  );
};

export { FiltersModal };
