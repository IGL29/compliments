import cn from 'classnames';
import styles from './style.module.scss';
import { Footer } from '../Footer';
import { ModalsContainer } from '~src/containers/ModalsContainer';
import { HeaderContainer } from '~src/containers/HeaderContainer';
import { SidebarsContainer } from '~src/containers/SidebarsContainer/SidebarsContainer';
import { NotificationsContainer } from '~src/containers/NotificationsContainer';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn(styles.layout)}>
      <HeaderContainer rootClassName={cn(styles['layout__header'])}></HeaderContainer>

      <div className={cn(styles['layout__content'])}>{children}</div>

      <Footer></Footer>

      <SidebarsContainer />
      <ModalsContainer />
      <NotificationsContainer />
    </div>
  );
}

export { Layout };
