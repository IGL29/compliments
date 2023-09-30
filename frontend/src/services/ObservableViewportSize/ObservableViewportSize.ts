import { IObserver } from '../Observable/types';
import { Observable } from '../Observable/Observable';
import { IViewportSize } from './types';
import { DOMElementsService } from '../DOMElementsService';

class ObservableViewportSize extends Observable<IViewportSize> {
  private static _instance: ObservableViewportSize;
  private defaultPopularSize = { width: 1366, height: 768 };
  private _vieportSizes: IViewportSize = this.defaultPopularSize;
  private isAddedResizeHandler: boolean;
  private DOMElementsService: DOMElementsService;

  constructor() {
    super(() => {
      if (!this.isAddedResizeHandler) {
        window.addEventListener('resize', () => {
          this.saveSize();
          for (const observer of Object.values(this.observers)) {
            observer.next(this._vieportSizes);
          }
        });
        this.isAddedResizeHandler = true;
      }
    });
    
    if (ObservableViewportSize._instance) {
      return ObservableViewportSize._instance;
    }
    ObservableViewportSize._instance = this;
    this.DOMElementsService = new DOMElementsService();
    this.saveSize();
  }

  public subscribe(observer: IObserver<IViewportSize>) {
    const subscription = super.subscribe(observer);
    observer.next(this._vieportSizes);
    return subscription;
  }

  private saveSize(): void {
    const document = this.DOMElementsService.getDocument();
    if (document) {
      this._vieportSizes = { width: document.documentElement.clientWidth };
    }
  }

  public setSize({width}: {width: number}) {
    this._vieportSizes = { width };
  }

  public get viewportSizes(): IViewportSize {
    return this._vieportSizes;
  }
}

export { ObservableViewportSize };
