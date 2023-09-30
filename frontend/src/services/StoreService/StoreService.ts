import { RootState, RootStore, createStore } from '~src/store';

class StoreService {
  private static instance: StoreService | null = null;
  private _store: RootStore;

  constructor(preloadedState?: RootState) {
    if (StoreService.instance) {
      return StoreService.instance;
    }
    StoreService.instance = this;
    this._store = createStore(preloadedState);
  }

  public get store(): RootStore {
    return this._store;
  }

  public static destroy(): void {
    StoreService.instance = null;
  }
}

export { StoreService };
