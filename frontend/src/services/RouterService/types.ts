export type Params<U extends string = string, V extends string = string> = {
  [P in U]: V[];
};
