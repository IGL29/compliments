import { FilterValues, Options } from '~src/containers/FiltersContainer';

export interface IProps {
  rootClassName?: string;
  filterValues: FilterValues;
  cbResetFilters: () => void;
  cbChangeCategory: (category: Options['category']) => void;
  cbChangeSubCategory: (holiday: Options['subcategory']) => void;
  cbChangeComposition: (composition: Options['composition']) => void;
  cbChangePackaging: (packaging: Options['packaging']) => void;
  cbChangePurpose: (purpose: Options['purpose']) => void;
}
