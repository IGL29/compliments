import { ISubscriptionFunction, IObserver, TSubscribeValue } from './types';
import { nanoid } from 'nanoid';

export class Observable<T> {
  private subscriptionFunction: ISubscriptionFunction<T>;
  protected observers: { [key: string]: IObserver<T> } = {};

  constructor(subscriptionFunction: ISubscriptionFunction<T>) {
    this.subscriptionFunction = subscriptionFunction;
  }

  public subscribe(observer: IObserver<T>): TSubscribeValue {
    const key = nanoid();
    this.observers[key] = observer;

    const safeSubscriptionFunction = new SafeSubscriptionFunction(observer, this.observers);

    this.subscriptionFunction(safeSubscriptionFunction);
    return { unsubscribe: this.unsubscribe.bind(null, key) };
  }

  private unsubscribe = (key: string): void => {
    if (this.observers[key]) {
      delete this.observers[key];
    }
  };
}

class SafeSubscriptionFunction<T> {
  private observer: IObserver<T>;
  private observers: { [key: string]: IObserver<T> };

  constructor(observer: IObserver<T>, observers: { [key: string]: IObserver<T> }) {
    this.observer = observer;
    this.observers = observers;
  }

  next(val: T) {
    if (!Object.keys(this.observers).length) {
      return;
    }
    this.observer.next(val);
  }
}
