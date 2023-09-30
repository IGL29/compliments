import { Select } from '~src/components/Select';
import { Props, Sorting } from '.';
import { useEffect, useState } from 'react';
import { RouterService } from '~src/services/RouterService';
import { usePageContext } from '~src/renderer/usePageContext';
import { getUpdatedValues } from '~src/utils/getUpdatedValues';
import { compareValues } from '~src/utils/compareValues';

const OPTIONS_DATA = [
  {
    text: 'Сортировать',
  },
  {
    text: 'Сначала дороже',
    sort: 'desc',
  },
  {
    text: 'Сначала дешевле',
    sort: 'asc',
  },
] as const;

const getSortingParam = (optionIndex = 0) => {
  const option = getOptionByIndex(optionIndex);
  return 'sort' in option ? { sort: [option.sort] } : { sort: [] };
};

const getOptionByIndex = (index: number) => {
  const option = OPTIONS_DATA[index];
  return option !== undefined ? option : OPTIONS_DATA[0];
};

const getIndexBySortParam = (option: Partial<{ sort: Sorting[] }>) => {
  const index = OPTIONS_DATA.findIndex((item) => {
    if ('sort' in item && 'sort' in option && option.sort) {
      return item.sort === option.sort[0];
    }
  });
  return index !== -1 ? index : 0;
};

const SortingSelectContainer = (props: Props) => {
  const pageContext = usePageContext();
  const [activeOptionIndex, setActiveOptionIndex] = useState<number>(0);

  useEffect(() => {
    if (!pageContext.urlParsed?.searchAll) {
      return;
    }
    const sotingValuesFromParams = getUpdatedValues(pageContext.urlParsed?.searchAll, getSortingParam());
    const sortingParam = getSortingParam(activeOptionIndex);
    if (!compareValues(sortingParam, sotingValuesFromParams)) {
      return;
    }
    const activeSortIndex = getIndexBySortParam(sotingValuesFromParams);
    rootSetActiveOptionIndex(activeSortIndex);
  }, [pageContext.urlParsed?.searchAll]);

  const middlewareSetActiveOptionIndex = (activeOptionIndexCurrent = activeOptionIndex) => {
    if (!pageContext.urlParsed?.searchAll) {
      return;
    }
    const sortingParam = getSortingParam(activeOptionIndexCurrent);
    const sortingValuesFromParams = getUpdatedValues(pageContext.urlParsed?.searchAll, getSortingParam());

    if (!compareValues(sortingValuesFromParams, sortingParam)) {
      return;
    }
    new RouterService().mergeParams(sortingParam, pageContext.urlParsed?.searchAll);
  };

  const rootSetActiveOptionIndex = (activeOptionIndexCurrent: number) => {
    setActiveOptionIndex(() => {
      middlewareSetActiveOptionIndex(activeOptionIndexCurrent);
      return activeOptionIndexCurrent;
    });
  };

  const changeActiveOption = (optionIndex: number) => {
    if (optionIndex === activeOptionIndex) {
      rootSetActiveOptionIndex(0);
    } else {
      rootSetActiveOptionIndex(optionIndex);
    }
  };

  return (
    <Select
      {...props}
      activeOptionIndex={activeOptionIndex}
      cbChangeOptionIndex={changeActiveOption}
      isChangeButton={false}
      options={OPTIONS_DATA}
    />
  );
};

export { SortingSelectContainer };
