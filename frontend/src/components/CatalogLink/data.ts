import { CategoryEnum, HolidaySubCategoryEnum, ProductPurposeEnum } from '~data/categories';

import sheImg from '/public/img/she.jpg';
import heImg from '/public/img/he.jpg';
import childrenImg from '/public/img/children.jpg';
import holidayImg from '/public/img/holiday.jpg';
import birthChildImg from '/public/img/birthday.jpg';
import corporateImg from '/public/img/corporate.jpg';

import easterImg from '/public/img/easter.jpg';
import motherDayImg from '/public/img/mother-day.jpg';
import birthdayImg from '/public/img/birth-child.jpg';
import septemberImg from '/public/img/september1st.jpg';
import february23Img from '/public/img/february23.jpg';
import march8Img from '/public/img/march8th.jpg';
import newYearImg from '/public/img/new-year.jpg';
import teacherImg from '/public/img/teacher.jpg';

import kitchenImg from '/public/img/kitchen.jpg';
import guestsImg from '/public/img/guests.jpg';
import bathhouseImg from '/public/img/bathhouse.jpg';
import cosmeticImg from '/public/img/cosmetic.jpg';

const categoryImages = {
  [CategoryEnum.She]: sheImg,
  [CategoryEnum.He]: heImg,
  [CategoryEnum.Children]: childrenImg,
  [CategoryEnum.Holiday]: holidayImg,
  [CategoryEnum.BirthChild]: birthChildImg,
  [CategoryEnum.Corporate]: corporateImg,
};
const subCategoryHolidayImages = {
  [HolidaySubCategoryEnum.Easter]: easterImg,
  [HolidaySubCategoryEnum.MotherDay]: motherDayImg,
  [HolidaySubCategoryEnum.Birthday]: birthdayImg,
  [HolidaySubCategoryEnum.September1st]: septemberImg,
  [HolidaySubCategoryEnum.February23]: february23Img,
  [HolidaySubCategoryEnum.March8th]: march8Img,
  [HolidaySubCategoryEnum.NewYear]: newYearImg,
  [HolidaySubCategoryEnum.Teacher]: teacherImg,
};
const purposeImages = {
  [ProductPurposeEnum.Kitchen]: kitchenImg,
  [ProductPurposeEnum.Guests]: guestsImg,
  [ProductPurposeEnum.Bathhouse]: bathhouseImg,
  [ProductPurposeEnum.Cosmetic]: cosmeticImg,
};

export { categoryImages, purposeImages, subCategoryHolidayImages };
