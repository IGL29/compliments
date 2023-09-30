import { IFeedbackData } from '~src/services/api/entities/api-feedback/types';

export interface IProps {
  nameValue: IFeedbackData['name'];
  phoneValue: IFeedbackData['phone'] | null;
  commentValue: IFeedbackData['comment'];
  isAgreeValue: boolean;
  nameError?: string;
  phoneError?: string;
  commentError?: string;
  isAgreeError?: string;
  isLoading: boolean;
  cbChangeName: (value: IFeedbackData['name']) => void;
  cbChangePhone: (value: IFeedbackData['phone'] | null) => void;
  cbChangeComment: (value: IFeedbackData['comment']) => void;
  cbChangeAgree: (value: boolean) => void;
  cbSubmit: () => void;
  cbChangeTouchedName: () => void;
  cbChangeTouchedPhone: () => void;
  cbChangeTouchedComment: () => void;
  cbChangeTouchedAgree: () => void;
}
