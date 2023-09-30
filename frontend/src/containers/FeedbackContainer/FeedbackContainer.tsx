import { useEffect, useState, useContext } from 'react';
import { FeedbackForm } from '~src/components/Forms/Feedback';
import { ErrorNotify } from '~src/components/Notify/ErrorNotify';
import { NotificationsContext } from '~src/contexts/NotificationsContext';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { ValidatorService } from '~src/services/ValidatorService';
import { Validators } from '~src/services/Validators';
import { IFeedbackData } from '~src/services/api/entities/api-feedback/types';
import { requestPostFeedbackAsync } from '~src/store/features/feedback';
import { getInitValidation } from '~src/utils/getInitValidation';

const INIT_NAME_VALUE = '' as string;
const INIT_PHONE_VALUE = null;
const INIT_COMMENT_VALUE = '' as string;
const INIT_IS_AGREE_VALUE = false as boolean;

const initialCommentValidation = getInitValidation(INIT_COMMENT_VALUE);
const initialisAgreeValidation = getInitValidation(INIT_IS_AGREE_VALUE);

const NAME_VALIDATORS = [Validators.empty()];
const PHONE_VALIDATORS = [Validators.empty(), Validators.phone()];
const COMMENT_VALIDATORS = [Validators.empty()];
const AGREE_VALIDATORS = [Validators.truthy()];

const INIT_TOUCHED_FIELDS = {
  name: false,
  phone: false,
  comment: false,
  agree: false,
};

const FeedbackContainer = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.profile.userData);
  const isLoading = useAppSelector((state) => state.feedback.isLoading);
  const { showNotify } = useContext(NotificationsContext);

  const userNameFromProfile = userData?.name;
  const userPhoneFromProfile = userData?.phone;

  const initialNameValidation = getInitValidation(userNameFromProfile || INIT_NAME_VALUE);
  const initialPhoneValidation = getInitValidation(userPhoneFromProfile || INIT_PHONE_VALUE);

  const [isAgree, setIsAgree] = useState(initialisAgreeValidation);
  const [name, setName] = useState(initialNameValidation);
  const [phone, setPhone] = useState(initialPhoneValidation);
  const [comment, setComment] = useState(initialCommentValidation);

  const [isTouchedFields, setIsTouchedFields] = useState(INIT_TOUCHED_FIELDS);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isAwaitAllChecking, setIsAwaitAllChecking] = useState(false);

  useEffect(() => {
    if (isSubmit) {
      checkAll();
    }
  }, [isSubmit]);

  useEffect(() => {
    if (isTouchedFields.agree) {
      changeAgreeHandler();
    }
    if (isTouchedFields.phone) {
      changePhoneHandler();
    }
    if (isTouchedFields.name) {
      changeNameHandler();
    }
    if (isTouchedFields.comment) {
      changeCommentHandler();
    }
  }, [isTouchedFields]);

  const checkName = (updatedValue: IFeedbackData['name']) => ValidatorService.validate(updatedValue, NAME_VALIDATORS);
  const checkPhone = (updatedValue: IFeedbackData['phone'] | null) =>
    ValidatorService.validate(updatedValue, PHONE_VALIDATORS);
  const checkComment = (updatedValue: IFeedbackData['comment']) =>
    ValidatorService.validate(updatedValue, COMMENT_VALIDATORS);
  const checkAgree = (updatedValue: boolean) => ValidatorService.validate(updatedValue, AGREE_VALIDATORS);

  const checkAll = () => {
    changeNameHandler(name.value);
    changePhoneHandler(phone.value);
    changeCommentHandler(comment.value);
    changeAgreeHandler(isAgree.value);
  };

  const resetFieldsState = () => {
    setName(initialNameValidation);
    setPhone(initialPhoneValidation);
    setComment(initialCommentValidation);
    setIsAgree(initialisAgreeValidation);
    changeTouchedNameHandler(false);
    changeTouchedPhoneHandler(false);
    changeTouchedCommentHandler(false);
    changeTouchedAgreeHandler(false);
  };

  const changeNameHandler = (value: IFeedbackData['name'] = name.value) => setName(checkName(value));
  const changePhoneHandler = (value: IFeedbackData['phone'] | null = phone.value) => setPhone(checkPhone(value));
  const changeCommentHandler = (value: IFeedbackData['comment'] = comment.value) => setComment(checkComment(value));
  const changeAgreeHandler = (value: boolean = isAgree.value) => setIsAgree(checkAgree(value));

  const changeTouchedNameHandler = (value = true) => {
    setIsTouchedFields((currentValue) => ({ ...currentValue, name: value }));
  };
  const changeTouchedPhoneHandler = (value = true) =>
    setIsTouchedFields((currentValue) => ({ ...currentValue, phone: value }));
  const changeTouchedCommentHandler = (value = true) =>
    setIsTouchedFields((currentValue) => ({ ...currentValue, comment: value }));
  const changeTouchedAgreeHandler = (value = true) => {
    setIsTouchedFields((currentValue) => ({ ...currentValue, agree: value }));
  };

  const submitData = () => {
    if (!name.isError && !phone.isError && !comment.isError && !isAgree.isError && phone.value) {
      dispatch(
        requestPostFeedbackAsync({
          name: name.value,
          comment: comment.value,
          phone: phone.value,
        }),
      )
        .unwrap()
        .then(() => {
          resetFieldsState();
          setIsSubmit(false);
          showNotify({
            content: <>Данные успешно отправлены</>,
            status: 'success',
          });
        })
        .catch(() => {
          showNotify({
            content: <ErrorNotify />,
            status: 'error',
          });
        });
    }
  };

  const submitHandler = () => {
    if (!isSubmit) {
      setIsSubmit(true);
    }
    if (isLoading) {
      return;
    }
    if (!isTouchedFields.phone && !isTouchedFields.comment && !isTouchedFields.comment && !isTouchedFields.agree) {
      return;
    }
    submitData();
  };

  useEffect(() => {
    if (isAwaitAllChecking) {
      submitData();
      setIsAwaitAllChecking(false);
    }
  }, [isAwaitAllChecking]);

  return (
    <FeedbackForm
      nameValue={name.value}
      nameError={name.errors[0]}
      phoneValue={phone.value}
      phoneError={phone.errors[0]}
      commentValue={comment.value}
      commentError={comment.errors[0]}
      isAgreeValue={isAgree.value}
      isAgreeError={isAgree.errors[0]}
      isLoading={isLoading}
      cbChangeName={changeNameHandler}
      cbChangePhone={changePhoneHandler}
      cbChangeComment={changeCommentHandler}
      cbChangeAgree={changeAgreeHandler}
      cbSubmit={submitHandler}
      cbChangeTouchedAgree={changeTouchedAgreeHandler}
      cbChangeTouchedComment={changeTouchedCommentHandler}
      cbChangeTouchedName={changeTouchedNameHandler}
      cbChangeTouchedPhone={changeTouchedPhoneHandler}
    />
  );
};

export { FeedbackContainer };
