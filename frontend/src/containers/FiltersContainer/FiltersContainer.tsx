import { useEffect, useState } from 'react';
import { Filters } from '~src/components/Filters';
import { usePageContext } from '~src/renderer/usePageContext';
import { Options, IProps, FilterValues } from './types';
import { RouterService } from '~src/services/RouterService';
import { getSwitchedValues } from '~src/utils/getSwitchedValues';
import { compareValues } from '~src/utils/compareValues';
import { getUpdatedValues } from '~src/utils/getUpdatedValues';
import { useDebounce } from '~src/hooks/useDebouce';

const FILTER_VALUES: FilterValues = {
  category: [],
  composition: [],
  subcategory: [],
  packaging: [],
  purpose: [],
};

const FiltersContainer = ({ rootClassName }: IProps) => {
  const pageContext = usePageContext();
  const [filters, setFilters] = useState<FilterValues>(FILTER_VALUES);
  const debounceRequest = useDebounce(2500);

  useEffect(() => {
    if (!pageContext.urlParsed?.searchAll) {
      return;
    }
    const filterValuesFromParams = getUpdatedValues(pageContext.urlParsed?.searchAll, FILTER_VALUES);
    if (!compareValues(filters, filterValuesFromParams)) {
      return;
    }
    rootChangeFiltersHandler(filterValuesFromParams as FilterValues);
  }, [pageContext.urlParsed?.searchAll]);

  const rootChangeFiltersHandler = (currentFilters: FilterValues, isReset = false) => {
    setFilters(() => {
      middlewareSetFilters(currentFilters, isReset);
      return currentFilters;
    });
  };

  const middlewareSetFilters = (currentFilters: FilterValues, isReset = false) => {
    if (!pageContext.urlParsed?.searchAll) {
      return;
    }
    const filterValuesFromParams = getUpdatedValues(pageContext.urlParsed?.searchAll, FILTER_VALUES);
    if (!compareValues(filterValuesFromParams, currentFilters)) {
      if (isReset && debounceRequest.prevTimer) {
        clearTimeout(debounceRequest.prevTimer);
      }
      return;
    }

    if (isReset) {
      if (debounceRequest.prevTimer) {
        clearTimeout(debounceRequest.prevTimer);
      }
      new RouterService().mergeParams(currentFilters, pageContext.urlParsed?.searchAll);
      return;
    }
    debounceRequest(() => {
      new RouterService().mergeParams({...currentFilters, page: ['1']}, pageContext.urlParsed?.searchAll);
    });
  };

  const changeSubCategoryHandler = (subCategory: Options['subcategory']) => {
    rootChangeFiltersHandler({
      ...filters,
      subcategory: getSwitchedValues('subcategory', subCategory, filters),
    });
  };
  const changeCategoryHandler = (category: Options['category']) => {
    rootChangeFiltersHandler({
      ...filters,
      category: getSwitchedValues('category', category, filters),
    });
  };
  const changeCompositionHandler = (composition: Options['composition']) => {
    rootChangeFiltersHandler({
      ...filters,
      composition: getSwitchedValues('composition', composition, filters),
    });
  };
  const changePackagingHandler = (packaging: Options['packaging']) => {
    rootChangeFiltersHandler({
      ...filters,
      packaging: getSwitchedValues('packaging', packaging, filters),
    });
  };
  const changePurposeHandler = (purpose: Options['purpose']) => {
    rootChangeFiltersHandler({
      ...filters,
      purpose: getSwitchedValues('purpose', purpose, filters),
    });
  };

  const resetFiltersHandler = () => {
    rootChangeFiltersHandler(FILTER_VALUES, true);
  };

  return (
    <Filters
      rootClassName={rootClassName}
      filterValues={filters}
      cbChangeComposition={changeCompositionHandler}
      cbChangeSubCategory={changeSubCategoryHandler}
      cbChangePackaging={changePackagingHandler}
      cbChangePurpose={changePurposeHandler}
      cbChangeCategory={changeCategoryHandler}
      cbResetFilters={resetFiltersHandler}
    />
  );
};

export { FiltersContainer };
