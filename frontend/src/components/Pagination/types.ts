export interface IProps {
  value: number;
  count: number;
  maxVisibleCount?: number;
  cbChangeValue: (value: number) => void;
}
