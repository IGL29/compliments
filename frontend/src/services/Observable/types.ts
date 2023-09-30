export interface IObserver<T> {
  next(value: T): void;
}

export interface ISubscriptionFunction<T> {
  (observer: IObserver<T>): void;
}

export type TSubscribeValue = { unsubscribe: () => void };
