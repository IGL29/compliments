import { useEffect, useState } from 'react';
import { Pagination } from '~src/components/Pagination/Pagination';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { usePageContext } from '~src/renderer/usePageContext';
import { RouterService } from '~src/services/RouterService';
import { compareValues } from '~src/utils/compareValues';
import { getUpdatedValues } from '~src/utils/getUpdatedValues';

const ProductsPaginationContainer = () => {
  const pageContext = usePageContext();
  const [page, setPage] = useState(1);
  const productsCurrentPage = useAppSelector((state) => state.products.page);
  const productsCountPages = useAppSelector((state) => state.products.pages);

  useEffect(() => {
    if (!pageContext.urlParsed?.searchAll) {
      return;
    }
    const pageValueFromParams = getUpdatedValues(pageContext.urlParsed?.searchAll, getParamPage(page));
    if (!pageValueFromParams.page?.[0] || (Number(pageValueFromParams.page[0]) <= 1 && page === 1)) {
      return;
    }
    rootSetPageHandler(Number(pageValueFromParams.page[0]));
  }, [pageContext.urlParsed?.searchAll]);

  const getParamPage = (page: number | string = 1) => {
    const pageValue = typeof page === 'string' ? page : String(page);
    return { page: [pageValue] };
  };

  const rootSetPageHandler = (updatedPage: number) => {
    setPage(() => {
      middlewareSetPage(updatedPage);
      return updatedPage;
    });
  };

  const middlewareSetPage = (updatedPage: number) => {
    if (!pageContext.urlParsed?.searchAll) {
      return;
    }
    const pageValueFromParams = getUpdatedValues(pageContext.urlParsed?.searchAll, getParamPage());

    if (!compareValues(pageValueFromParams, getParamPage(updatedPage))) {
      return;
    }
    new RouterService().mergeParams(getParamPage(updatedPage), pageContext.urlParsed?.searchAll, false);
  };

  const changePageHandler = (page: number) => {
    rootSetPageHandler(page);
  };

  return <Pagination value={productsCurrentPage} count={productsCountPages} cbChangeValue={changePageHandler} />;
};

export { ProductsPaginationContainer };
