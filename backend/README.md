# Backend (Интернет-магазин Complements).

(Express, TS, TS-Node...)

## Развертывание проекта

(Версии npm, node [a relative link](./package.json) - секция `engines`).

1. Выполните `npm i` для установки.

## Запуск сервера

1. Выполнить `npm start` для запуска сервера.

- По умолчанию сервер слушает <http://localhost:5000>.

## Запуск сервера в режиме разработки

и `npm dev` для запуска сервера.

## Тестирование API (POSTMAN):

Для тестирования/проверки API в корне проекта присуствует коллекция `Complements.postman_collection.json` для импорта в POSTMAN.

## Логин и пароль

Можно зарегистрировать новый аккаунт или использовать один из тестовых:

email: `anna@email.test`,
password: `pwd123zxc`

email: `nick@email.test`,
password": `pwd123zxc1`

email: `alice@email.test`,
password: `pwd123zxc2`

email: `dmitry@email.test`,
password: `pwd123zxc3`,

email: `maxim@email.test`,
password: `pwd123zxc4`,

## Токен

Методы требующие токен ожидают header: `Authorization: Bearer {token}`

## API

### POST `/register` - Регистрация нового пользователя.

Ожидает:

- в body запроса { email, password, username, birthday? }

### POST `/auth` - Авторизация пользователя.

Ожидает:

- В body запроса { email, password }

### POST `/subscribe` - Подписка на email рассылку.

Ожидает:

- Либо token авторизованного пользователя
- Либо в body { email: 'example@email.com' }

### POST `/unsubscribe` - Отписаться от рассылки на email.

Ожидает:

- Либо token авторизованного пользователя
- Либо в body { email: 'example@email.com' }

### GET `/cart` - Получить корзину с товарами.

Ожидает:

- token авторизованного пользователя

### POST `/cart` - Добавить товар в корзину (если товар уже существует - добавит переданное количество товара к уже существующему в корзине).

Ожидает:

- token авторизованного пользователя
- В body [{count, product}]

### PATCH `/cart` - Изменить кол-во товара в корзине (заменит количество товара на переданное).

Ожидает:

- token авторизованного пользователя
- в body: {count, id} (id - Идентификатор товара)

### DELETE `/cart` - Удалить товар из корзины.

Ожидает:

- token авторизованного пользователя
- в body: {id} (id - Идентификатор товара)

### GET `/products` - Получить список товаров.

Ожидает:

- token авторизованного пользователя

Опционально могут могут быть переданы ?params:

- category;
- composition;
- purpose;
- packaging;
- page;
- count;
- sort;

### GET `/products/{productId}` - Получить подробную информацию о товаре.

### GET `/products/additionally` - Получить список дополнительных товары

### GET `/promo` - Получить список акций

### GET `/orders` - Получить список заказов пользователя

Ожидает:

- токен авторизованного пользователя;

### POST `/orders` - Оформление заказа:

#### Для авторизованного пользователя:

Ожидает:

- токен авторизованного пользователя;

- в body:
  {
  name,
  phone,
  address,
  deliveryMethod
  }

#### Для неавторизованного пользователя:

- в body:
  {
  name,
  phone,
  address,
  deliveryMethod,
  cart
  }

#### GET `/orders/:orderId` - Возвращает информацио о заказе.

#### POST `/feedback` - Отправить предложение/вопрос.

Ожидает:

- в body:

{
phone,
comment,
name
}

#### GET `/contacts` - Получить информацию об актуальных контактах магазина.

#### GET `/profile` - Получить информацию о профиле пользователя.

Ожидает:

- Токен авторизованного пользователя.

#### PATCH `/profile` - Изменить данные в профиле.

Ожидает:

- Токен авторизованного пользователя.
- в body:
  {
  name,
  email,
  address: {
  city,
  street,
  house,
  entrance,
  apartment
  }
  }
