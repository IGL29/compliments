export type GetPromoResponsePayload = IPromo[];

export interface IPromo {
  date: { from: Date; to: Date };
  title: string;
  descr: string;
  image: string;
}
