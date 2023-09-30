import cn from 'classnames';
import styles from './style.module.scss';
import { Accordion } from '~components/Accordion/Accordion';
import { Checkbox } from '~components/Checkbox/Checkbox';
import { IProps } from './types';
import { Options } from '~src/containers/FiltersContainer/types';

const Filters = ({
  rootClassName,
  filterValues,
  cbResetFilters,
  cbChangeCategory,
  cbChangeSubCategory,
  cbChangeComposition,
  cbChangePackaging,
  cbChangePurpose,
}: IProps) => {
  const activeHolidayClassName = (holiday: Options['subcategory']) =>
    filterValues.subcategory.some((item: Options['subcategory']) => item === holiday)
      ? styles['filter-accordion__btn--active']
      : '';
  const activeCategoryClassName = (category: Options['category']) =>
    filterValues.category.some((item: Options['category']) => item === category)
      ? styles['filter-accordion__btn--active']
      : '';

  const activeComposition = (composition: Options['composition']) =>
    filterValues.composition.some((item: Options['composition']) => item === composition);
  const activePackaging = (packaging: Options['packaging']) =>
    filterValues.packaging.some((item: Options['packaging']) => item === packaging);
  const activePurpose = (purpose: Options['purpose']) =>
    filterValues.purpose.some((item: Options['purpose']) => item === purpose);

  const resetFiltersHandler = () => cbResetFilters();
  const changeSubCategoryHandler = (holiday: Options['subcategory']) => cbChangeSubCategory(holiday);
  const changeCategoryHandler = (category: Options['category']) => cbChangeCategory(category);
  const changeCompositionHandler = (composition: Options['composition']) => {
    cbChangeComposition(composition);
  };
  const changePackagingHandler = (packaging: Options['packaging']) => {
    cbChangePackaging(packaging);
  };
  const changePurposeHandler = (purpose: Options['purpose']) => {
    cbChangePurpose(purpose);
  };

  return (
    <div className={cn(styles['filters'], rootClassName)}>
      <h2 className={cn(styles['filters__title'])}>Фильтр</h2>

      <button className={cn(styles['filters__btn-filter'])} onClick={resetFiltersHandler}>
        Очистить фильтр
      </button>

      <div className={cn(styles['filters__section-property-filter'], styles['section-property-filter'])}>
        <h3 className={cn(styles['section-property-filter__title'])}>Категория</h3>

        <button
          className={cn(styles['section-property-filter__btn'], activeCategoryClassName('he'))}
          onClick={() => changeCategoryHandler('he')}
        >
          Для него
        </button>
        <button
          className={cn(styles['section-property-filter__btn'], activeCategoryClassName('she'))}
          onClick={() => changeCategoryHandler('she')}
        >
          Для нее
        </button>
        <button
          className={cn(styles['section-property-filter__btn'], activeCategoryClassName('children'))}
          onClick={() => changeCategoryHandler('children')}
        >
          Для детей
        </button>

        <Accordion rootClassName={cn(styles['section-property-filter__filter-accordion'], styles['filter-accordion'])}>
          <button className={cn(styles['filter-accordion__btn'])}>Все подарки</button>

          <ul className={cn(styles['filter-accordion__list'])}>
            <li className={cn(styles['filter-accordion__item'])}>
              <button
                className={cn(styles['filter-accordion__btn'], activeHolidayClassName('new-year'))}
                onClick={() => changeSubCategoryHandler('new-year')}
              >
                Новый год
              </button>
            </li>
            <li className={cn(styles['filter-accordion__item'])}>
              <button
                className={cn(styles['filter-accordion__btn'], activeHolidayClassName('march8th'))}
                onClick={() => changeSubCategoryHandler('march8th')}
              >
                8 марта
              </button>
            </li>
            <li className={cn(styles['filter-accordion__item'])}>
              <button
                className={cn(styles['filter-accordion__btn'], activeHolidayClassName('february23'))}
                onClick={() => changeSubCategoryHandler('february23')}
              >
                23 февраля
              </button>
            </li>
            <li className={cn(styles['filter-accordion__item'])}>
              <button
                className={cn(styles['filter-accordion__btn'], activeHolidayClassName('september1st'))}
                onClick={() => changeSubCategoryHandler('september1st')}
              >
                1 сентября
              </button>
            </li>
            <li className={cn(styles['filter-accordion__item'])}>
              <button
                className={cn(styles['filter-accordion__btn'], activeHolidayClassName('birthday'))}
                onClick={() => changeSubCategoryHandler('birthday')}
              >
                День рождения
              </button>
            </li>
            <li className={cn(styles['filter-accordion__item'])}>
              <button
                className={cn(styles['filter-accordion__btn'], activeHolidayClassName('easter'))}
                onClick={() => changeSubCategoryHandler('easter')}
              >
                Пасха
              </button>
            </li>
            <li className={cn(styles['filter-accordion__item'])}>
              <button
                className={cn(styles['filter-accordion__btn'], activeHolidayClassName('mother-day'))}
                onClick={() => changeSubCategoryHandler('mother-day')}
              >
                День матери
              </button>
            </li>
          </ul>
        </Accordion>
      </div>

      <div className={cn(styles['filters__section-property-filter'], styles['section-property-filter'])}>
        <h3 className={cn(styles['section-property-filter__title'])}>Состав подарков</h3>

        <Checkbox
          rootClassName={cn(styles['section-property-filter__checkbox'])}
          isChecked={activeComposition('edible')}
          cbChangeChecked={() => changeCompositionHandler('edible')}
          inputId="input-editable"
        >
          <>съедобные</>
        </Checkbox>

        <Checkbox
          rootClassName={cn(styles['section-property-filter__checkbox'])}
          isChecked={activeComposition('inedible')}
          cbChangeChecked={() => changeCompositionHandler('inedible')}
          inputId="input-inedible"
        >
          <>несъедобные</>
        </Checkbox>
      </div>

      <div className={cn(styles['filters__section-property-filter'], styles['section-property-filter'])}>
        <h3 className={cn(styles['section-property-filter__title'])}>Назначение</h3>

        <Checkbox
          rootClassName={cn(styles['section-property-filter__checkbox'])}
          isChecked={activePurpose('kitchen')}
          cbChangeChecked={() => changePurposeHandler('kitchen')}
          inputId="checkbox-kitchen"
        >
          <>Для кухни</>
        </Checkbox>

        <Checkbox
          rootClassName={cn(styles['section-property-filter__checkbox'])}
          isChecked={activePurpose('bathhouse')}
          cbChangeChecked={() => changePurposeHandler('bathhouse')}
          inputId="checkbox-bathhouse"
        >
          <>Для бани</>
        </Checkbox>

        <Checkbox
          rootClassName={cn(styles['section-property-filter__checkbox'])}
          isChecked={activePurpose('guests')}
          cbChangeChecked={() => changePurposeHandler('guests')}
          inputId="checkbox-guests"
        >
          <>В гости</>
        </Checkbox>

        <Checkbox
          rootClassName={cn(styles['section-property-filter__checkbox'])}
          isChecked={activePurpose('cosmetic')}
          cbChangeChecked={() => changePurposeHandler('cosmetic')}
          inputId="checkbox-cosmetic"
        >
          <>Косметические</>
        </Checkbox>
      </div>

      <div className={cn(styles['filters__section-property-filter'], styles['section-property-filter'])}>
        <h3 className={cn(styles['section-property-filter__title'])}>Упаковка</h3>

        <Checkbox
          rootClassName={cn(styles['section-property-filter__checkbox'])}
          isChecked={activePackaging('basket')}
          cbChangeChecked={() => changePackagingHandler('basket')}
          inputId="checkbox-basket"
        >
          <>корзина</>
        </Checkbox>

        <Checkbox
          rootClassName={cn(styles['section-property-filter__checkbox'])}
          isChecked={activePackaging('box')}
          cbChangeChecked={() => changePackagingHandler('box')}
          inputId="checkbox-box"
        >
          <>коробка</>
        </Checkbox>

        <Checkbox
          rootClassName={cn(styles['section-property-filter__checkbox'])}
          isChecked={activePackaging('packet')}
          cbChangeChecked={() => changePackagingHandler('packet')}
          inputId="checkbox-packet"
        >
          <>пакет</>
        </Checkbox>
      </div>
    </div>
  );
};

export { Filters };
