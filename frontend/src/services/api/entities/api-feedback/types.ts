export type PostFeedbackRequestPayload = IFeedbackData;

export interface IFeedbackData {
  phone: number;
  comment: string;
  name: string;
}
