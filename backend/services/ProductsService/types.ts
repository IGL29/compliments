export interface IPaginationProducts<T> {
  data: T[];
  page: number;
  pages: number;
  count: number;
}
