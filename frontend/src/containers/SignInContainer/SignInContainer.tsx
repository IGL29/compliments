import { SigninForm } from '~src/components/Forms/Signin/SigninForm';
import { IProps } from './types';
import { useState, FormEvent, useEffect, useContext } from 'react';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { openUserAuthSuccessModal } from '~src/store/features/modals/modalsSlice';
import { requestAuthAsync, requestProfileAsync } from '~src/store/features/profile/sideEffects';
import { CartService } from '~src/services/CartService';
import { requestCartAsync, requestPostCartAsync } from '~src/store/features/cart';
import { getInitValidation } from '~src/utils/getInitValidation';
import { Validators } from '~src/services/Validators';
import { IAuthData } from '~src/services/api/entities/api-auth/types';
import { ValidatorService } from '~src/services/ValidatorService';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { ErrorNotify } from '~src/components/Notify/ErrorNotify';
import { NotificationsContext } from '~src/contexts/NotificationsContext';

const INIT_EMAIL_VALUE = '' as string;
const INIT_PASSWORD_VALUE = '' as string;
const INIT_AGREE_VALUE = false as boolean;

const initialEmailValidation = getInitValidation(INIT_EMAIL_VALUE);
const initialPasswordValidation = getInitValidation(INIT_PASSWORD_VALUE);
const initialAgreeValidation = getInitValidation(INIT_AGREE_VALUE);

const EMAIL_VALIDATORS = [Validators.empty(), Validators.email()];
const PASSWORD_VALIDATORS = [Validators.empty()];
const AGREE_VALIDATORS = [Validators.truthy()];

const INIT_TOUCHED_FIELDS = {
  email: false,
  password: false,
  agree: false,
};

const SignInContainer = ({ rootClassName }: IProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.profile.isAuthLoading);
  const { showNotify } = useContext(NotificationsContext);

  const [email, setEmail] = useState(initialEmailValidation);
  const [password, setPassword] = useState(initialPasswordValidation);
  const [isAgree, setIsAgree] = useState(initialAgreeValidation);

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
    if (isTouchedFields.email) {
      changeEmailHandler();
    }
    if (isTouchedFields.password) {
      changePasswordHandler();
    }
  }, [isTouchedFields]);

  const checkEmail = (updatedValue: IAuthData['email']) => ValidatorService.validate(updatedValue, EMAIL_VALIDATORS);
  const checkPassword = (updatedValue: IAuthData['password']) =>
    ValidatorService.validate(updatedValue, PASSWORD_VALIDATORS);
  const checkIsAgree = (updatedValue: boolean) => ValidatorService.validate(updatedValue, AGREE_VALIDATORS);

  const changeEmailHandler = (value: IAuthData['email'] = email.value) => {
    setEmail(checkEmail(value));
  };
  const changePasswordHandler = (value: IAuthData['password'] = password.value) => {
    setPassword(checkPassword(value));
  };
  const changeAgreeHandler = (value: boolean = isAgree.value) => {
    setIsAgree(checkIsAgree(value));
  };

  const changeTouchedEmailHandler = (value = true) => {
    setIsTouchedFields((currentValue) => ({ ...currentValue, email: value }));
  };
  const changeTouchedPasswordHandler = (value = true) =>
    setIsTouchedFields((currentValue) => ({ ...currentValue, password: value }));
  const changeTouchedAgreeHandler = (value = true) =>
    setIsTouchedFields((currentValue) => ({ ...currentValue, agree: value }));

  const checkAll = () => {
    changeEmailHandler(email.value);
    changePasswordHandler(password.value);
    changeAgreeHandler(isAgree.value);
  };

  const resetFieldsState = () => {
    setEmail(initialEmailValidation);
    setPassword(initialPasswordValidation);
    setIsAgree(initialAgreeValidation);
    changeTouchedEmailHandler(false);
    changeTouchedPasswordHandler(false);
    changeTouchedAgreeHandler(false);
  };

  const submitData = () => {
    if (!email.isError && !password.isError && !isAgree.isError) {
      dispatch(
        requestAuthAsync({
          email: email.value,
          password: password.value,
        }),
      )
        .unwrap()
        .then(() => {
          resetFieldsState();
          setIsSubmit(false);
          dispatch(requestProfileAsync());
          const localCart = CartService.getFromLocalCart();
          if (localCart.length) {
            dispatch(requestPostCartAsync(localCart)).then(() => CartService.resetLocalCart());
          } else {
            dispatch(requestCartAsync());
          }
          dispatch(openUserAuthSuccessModal());
        })
        .catch(() => {
          showNotify({
            content: <ErrorNotify />,
            status: 'error',
          });
        });
    }
  };

  const submitHandler = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!isSubmit) {
      setIsSubmit(true);
    }

    if (isLoading) {
      return;
    }

    if (!isTouchedFields.email && !isTouchedFields.password && !isTouchedFields.agree) {
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
    <SigninForm
      rootClassName={rootClassName}
      emailValue={email.value}
      passwordValue={password.value}
      agreeValue={isAgree.value}
      agreeError={isAgree.errors[0]}
      emailError={email.errors[0]}
      passwordError={password.errors[0]}
      cbChangeTouchedAgree={changeTouchedAgreeHandler}
      cbChangeTouchedEmail={changeTouchedEmailHandler}
      cbChangeTouchedPassword={changeTouchedPasswordHandler}
      cbChangeAgree={changeAgreeHandler}
      cbChangeEmail={changeEmailHandler}
      cbChangePassword={changePasswordHandler}
      cbSubmit={submitHandler}
      isLoading={isLoading}
    />
  );
};

export { SignInContainer };
