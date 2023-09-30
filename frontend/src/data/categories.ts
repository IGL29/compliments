export enum CategoryEnum {
  She,
  He,
  Children,
  Holiday,
  BirthChild,
  Corporate,
}

export enum HolidaySubCategoryEnum {
  Easter,
  MotherDay,
  Birthday,
  September1st,
  February23,
  March8th,
  NewYear,
  Teacher,
}

export enum ProductPurposeEnum {
  Kitchen,
  Guests,
  Bathhouse,
  Cosmetic,
}

export enum ProductPackagingEnum {
  Basket,
  Packet,
  Box,
}

export const holidaySubCategory = <const>{
  [HolidaySubCategoryEnum.Easter]: {
    urlParam: 'easter',
    title: 'Пасха',
    parentCategory: CategoryEnum.Holiday,
  },
  [HolidaySubCategoryEnum.MotherDay]: {
    urlParam: 'mother-day',
    title: 'День матери',
    parentCategory: CategoryEnum.Holiday,
  },
  [HolidaySubCategoryEnum.Birthday]: {
    urlParam: 'birthday',
    title: 'День рождения',
    parentCategory: CategoryEnum.Holiday,
  },
  [HolidaySubCategoryEnum.September1st]: {
    urlParam: 'september1st',
    title: '1 сентября',
    parentCategory: CategoryEnum.Holiday,
  },
  [HolidaySubCategoryEnum.February23]: {
    urlParam: 'february23',
    title: '23 февраля',
    parentCategory: CategoryEnum.Holiday,
  },
  [HolidaySubCategoryEnum.March8th]: {
    urlParam: 'march8th',
    title: '8 марта',
    parentCategory: CategoryEnum.Holiday,
  },
  [HolidaySubCategoryEnum.NewYear]: {
    urlParam: 'new-year',
    title: 'Новый год',
    parentCategory: CategoryEnum.Holiday,
  },
  [HolidaySubCategoryEnum.Teacher]: {
    urlParam: 'teacher',
    title: 'День учителя',
    parentCategory: CategoryEnum.Holiday,
  },
};

export const category = <const>{
  [CategoryEnum.She]: {
    urlParam: 'she',
    title: 'Для нее',
    subcategory: null,
  },
  [CategoryEnum.He]: {
    urlParam: 'he',
    title: 'Для него',
    subcategory: null,
  },
  [CategoryEnum.Children]: {
    urlParam: 'children',
    title: 'Детям',
    subcategory: null,
  },
  [CategoryEnum.Holiday]: {
    urlParam: 'holiday',
    title: 'К праздникам',
    subcategory: holidaySubCategory,
  },
  [CategoryEnum.BirthChild]: {
    urlParam: 'birth-child',
    title: 'Рождение ребенка',
    subcategory: null,
  },
  [CategoryEnum.Corporate]: {
    urlParam: 'corporate',
    title: 'Корпоративные',
    subcategory: null,
  },
};

export const productPurpose = <const>{
  [ProductPurposeEnum.Kitchen]: {
    urlParam: 'kitchen',
    title: 'Для кухни',
  },
  [ProductPurposeEnum.Guests]: {
    urlParam: 'guests',
    title: 'В гости',
  },
  [ProductPurposeEnum.Bathhouse]: {
    urlParam: 'bathhouse',
    title: 'Для бани',
  },
  [ProductPurposeEnum.Cosmetic]: {
    urlParam: 'cosmetic',
    title: 'Косметические наборы',
  },
};

export const productPackaging = <const>{
  [ProductPackagingEnum.Box]: {
    urlParam: 'box',
    title: 'В коробке',
  },
};
