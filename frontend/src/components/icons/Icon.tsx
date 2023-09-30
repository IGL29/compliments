import { Advertisement } from './Advertisement';
import { AnonymousDelivery } from './AnonymousDelivery';
import { Arrow } from './Arrow';
import { Bar } from './Bar';
import { Bow } from './Bow';
import { BurgerMenu } from './BurgerMenu';
import { Calendar } from './Calendar';
import { Car } from './Car';
import { Cart } from './Cart';
import { CountryEnvelop } from './CountryEnvelop';
import { Discount } from './Discount';
import { Eye } from './Eye';
import { Filter } from './Filter';
import { Gifts } from './Gifts';
import { Heart } from './Heart';
import { SignIn } from './SignIn';
import { Stopwatch } from './Stopwatch';
import { Telegram } from './Telegram';
import { Time } from './Time';
import { Trash } from './Trash';
import { User } from './User';
import { Vk } from './Vk';
import { Wallet } from './Wallet';
import { Whatsapp } from './Whatsapp';

export type TIcon =
  | 'advertisement'
  | 'arrow'
  | 'bow'
  | 'calendar'
  | 'car'
  | 'cart'
  | 'countryEnvelop'
  | 'discount'
  | 'eye'
  | 'gifts'
  | 'heart'
  | 'logoColor'
  | 'logoLight'
  | 'signin'
  | 'stopwatch'
  | 'telegram'
  | 'time'
  | 'user'
  | 'vk'
  | 'wallet'
  | 'whatsapp'
  | 'anonymousDelivery'
  | 'bar'
  | 'filter'
  | 'trash'
  | 'burgerMenu'
  | 'progressLoader';

const Icon = ({ icon, viewBox, className }: { icon: TIcon; viewBox?: string; className?: string }) => {
  const iconJSX =
    icon === 'advertisement' ? (
      <Advertisement />
    ) : icon === 'arrow' ? (
      <Arrow />
    ) : icon === 'bow' ? (
      <Bow />
    ) : icon === 'calendar' ? (
      <Calendar />
    ) : icon === 'car' ? (
      <Car />
    ) : icon === 'cart' ? (
      <Cart />
    ) : icon === 'countryEnvelop' ? (
      <CountryEnvelop />
    ) : icon === 'discount' ? (
      <Discount />
    ) : icon === 'eye' ? (
      <Eye />
    ) : icon === 'gifts' ? (
      <Gifts />
    ) : icon === 'heart' ? (
      <Heart />
    ) : icon === 'signin' ? (
      <SignIn />
    ) : icon === 'stopwatch' ? (
      <Stopwatch />
    ) : icon === 'telegram' ? (
      <Telegram />
    ) : icon === 'time' ? (
      <Time />
    ) : icon === 'user' ? (
      <User />
    ) : icon === 'vk' ? (
      <Vk />
    ) : icon === 'wallet' ? (
      <Wallet />
    ) : icon === 'whatsapp' ? (
      <Whatsapp />
    ) : icon === 'anonymousDelivery' ? (
      <AnonymousDelivery />
    ) : icon === 'burgerMenu' ? (
      <BurgerMenu />
    ) : icon === 'filter' ? (
      <Filter />
    ) : icon === 'bar' ? (
      <Bar />
    ) : icon === 'trash' ? (
      <Trash />
    ) : (
      <p>No content</p>
    );

  return (
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox={viewBox || '0 0 30 30'}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {iconJSX}
    </svg>
  );
};

export { Icon };
