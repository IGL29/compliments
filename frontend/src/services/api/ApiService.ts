import { ApiAuthService } from './entities/api-auth';
import { ApiCartService } from './entities/api-cart';
import { ApiContactsService } from './entities/api-contacts/ApiContactsService';
import { ApiFeedbackService } from './entities/api-feedback';
import { ApiOrdersService } from './entities/api-orders';
import { ApiProductsService } from './entities/api-products/ApiProductsService';
import { ApiProfileService } from './entities/api-profile';
import { ApiPromoService } from './entities/api-promo';
import { ApiRegisterService } from './entities/api-register';
import { ApiSubscribtionService } from './entities/api-subscribtion/ApiSubscribtionService';

class ApiService {
  static instance: ApiService;
  private url = import.meta.env.VITE_API;

  constructor() {
    if (ApiService.instance) {
      return ApiService.instance;
    }
    ApiService.instance = this;
  }

  public auth = new ApiAuthService(this.url);
  public cart = new ApiCartService(this.url);
  public shopContacts = new ApiContactsService(this.url);
  public feedback = new ApiFeedbackService(this.url);
  public orders = new ApiOrdersService(this.url);
  public products = new ApiProductsService(this.url);
  public profile = new ApiProfileService(this.url);
  public promo = new ApiPromoService(this.url);
  public register = new ApiRegisterService(this.url);
  public subscribtion = new ApiSubscribtionService(this.url);
}

export { ApiService };
