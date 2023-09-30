import { DOMElementsService } from '../DOMElementsService/DOMElementsService';

class DOMSideEffectsService {
  private domElementsService: DOMElementsService;

  constructor() {
    this.domElementsService = new DOMElementsService();
  }

  public setOverflowBody() {
    const bodyElement = this.domElementsService.getBody();
    if (!bodyElement) {
      return;
    }
    bodyElement.style.overflow = 'hidden';
  }

  public resetOverflowBody() {
    const bodyElement = this.domElementsService.getBody();
    if (!bodyElement) {
      return;
    }
    bodyElement.style.overflow = '';
  }

  public isOverflowBody(): boolean {
    const bodyElement = this.domElementsService.getBody();
    if (!bodyElement) {
      return false;
    }
    return !!bodyElement.style.overflow;
  }
}

export { DOMSideEffectsService };
