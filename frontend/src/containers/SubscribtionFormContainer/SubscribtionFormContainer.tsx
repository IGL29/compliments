import { useContext, useEffect, useState } from 'react';
import { SubscribtionForm } from '~src/components/Forms/SubscribtionForm';
import { NotificationsContext } from '~src/contexts/NotificationsContext';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { ValidatorService } from '~src/services/ValidatorService';
import { Validators } from '~src/services/Validators';
import { closeSubscribtionModal } from '~src/store/features/modals/modalsSlice';
import { requestPostSubscribeAsync } from '~src/store/features/profile';
import { getInitValidation } from '~src/utils/getInitValidation';

const INIT_EMAIL_VALUE = '' as string;

const initialEmailValidation = getInitValidation(INIT_EMAIL_VALUE);

const EMAIL_VALIDATORS = [Validators.empty(), Validators.email()];

const INIT_TOUCHED_FIELDS = {
  email: false,
};

const SubscribtionFormContainer = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.profile.isSubscribtionLoading);
  const { showNotify } = useContext(NotificationsContext);

  const [email, setEmail] = useState(initialEmailValidation);

  const [isTouchedFields, setIsTouchedFields] = useState(INIT_TOUCHED_FIELDS);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isAwaitAllChecking, setIsAwaitAllChecking] = useState(false);

  useEffect(() => {
    if (isSubmit) {
      checkAll();
    }
  }, [isSubmit]);

  useEffect(() => {
    if (isTouchedFields.email) {
      changeEmailHandler();
    }
  }, [isTouchedFields]);

  const checkAll = () => {
    changeEmailHandler(email.value);
  };

  const checkEmail = (updatedValue: string) => ValidatorService.validate(updatedValue, EMAIL_VALIDATORS);

  const changeEmailHandler = (value: string = email.value) => setEmail(checkEmail(value));

  const changeTouchedEmailHandler = (value = true) =>
    setIsTouchedFields((currentValue) => ({ ...currentValue, email: value }));

  const submitData = () => {
    if (!email.isError) {
      dispatch(
        requestPostSubscribeAsync({
          email: email.value,
        }),
      )
        .unwrap()
        .then(() => {
          dispatch(closeSubscribtionModal());
          showNotify({
            content: <>Вы успешно подписались</>,
            status: 'success',
          });
        })
        .catch((error) => {
          showNotify({
            content: <>{error}</>,
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
    if (!isTouchedFields.email) {
      return checkAll();
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
    <SubscribtionForm
      emailValue={email.value}
      emailError={email.errors[0]}
      isLoading={isLoading}
      cbChangeTouchedEmail={changeTouchedEmailHandler}
      cbChangeEmailValue={changeEmailHandler}
      cbDoSubscribe={submitHandler}
    />
  );
};

export { SubscribtionFormContainer };
