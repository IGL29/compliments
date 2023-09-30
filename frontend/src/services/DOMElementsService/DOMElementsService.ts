class DOMElementsService {
  private static instance: DOMElementsService;
  private document: Document | null = null;
  private body: HTMLBodyElement | null = null;

  constructor() {
    if (DOMElementsService.instance) {
      return DOMElementsService.instance;
    }
    DOMElementsService.instance = this;
    try {
      this.document = document;
      this.body = document.querySelector('body');
    } catch {
      console.error('Document is not defined');
    }
  }

  public getDocument() {
    return this.document;
  }

  public getBody() {
    return this.body;
  }
}

export { DOMElementsService };
