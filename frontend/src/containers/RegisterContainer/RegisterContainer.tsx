import { useState, FormEvent, useEffect, useContext } from 'react';
import { RegistrationForm } from '~src/components/Forms/RegistrationForm/RegistrationForm';
import { IProps } from './types';
import { requestRegisterAsync } from '~src/store/features/register';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { getInitValidation } from '~src/utils/getInitValidation';
import { Validators } from '~src/services/Validators';
import { ValidatorService } from '~src/services/ValidatorService';
import { IRegisterData } from '~src/services/api/entities/api-register/types';
import { NotificationsContext } from '~src/contexts/NotificationsContext';
import { ErrorNotify } from '~src/components/Notify/ErrorNotify';

const INIT_NAME_VALUE = '' as string;
const INIT_PHONE_VALUE = null;
const INIT_EMAIL_VALUE = '' as string;
const INIT_PASSWORD_VALUE = '' as string;
const INIT_AGREE_NEWS_VALUE = false as boolean;
const INIT_AGREE_DATA_VALUE = false as boolean;

const initialNameValidation = getInitValidation(INIT_NAME_VALUE);
const initialPhoneValidation = getInitValidation(INIT_PHONE_VALUE as null | IRegisterData['phone']);
const initialEmailValidation = getInitValidation(INIT_EMAIL_VALUE);
const initialPasswordValidation = getInitValidation(INIT_PASSWORD_VALUE);
const initialAgreeNewsValidation = getInitValidation(INIT_AGREE_NEWS_VALUE);
const initialAgreeDataValidation = getInitValidation(INIT_AGREE_DATA_VALUE);

const NAME_VALIDATORS = [Validators.empty()];
const PHONE_VALIDATORS = [Validators.empty(), Validators.phone()];
const EMAIL_VALIDATORS = [Validators.empty(), Validators.email()];
const PASSWORD_VALIDATORS = [Validators.empty(), Validators.minLenght(6)];
const AGREE_NEWS_VALIDATORS = [Validators.truthy()];
const AGREE_DATA_VALIDATORS = [Validators.truthy()];

const INIT_TOUCHED_FIELDS = {
  name: false,
  phone: false,
  email: false,
  password: false,
  agreeNews: false,
  agreeData: false,
};

const RegisterContainer = ({ rootClassName }: IProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.register.isLoading);
  const { showNotify } = useContext(NotificationsContext);

  const [name, setName] = useState(initialNameValidation);
  const [phone, setPhone] = useState(initialPhoneValidation);
  const [email, setEmail] = useState(initialEmailValidation);
  const [password, setPassword] = useState(initialPasswordValidation);
  const [isAgreeNews, setIsAgreeNews] = useState(initialAgreeNewsValidation);
  const [isAgreeData, setIsAgreeData] = useState(initialAgreeDataValidation);

  const [isTouchedFields, setIsTouchedFields] = useState(INIT_TOUCHED_FIELDS);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isAwaitAllChecking, setIsAwaitAllChecking] = useState(false);

  useEffect(() => {
    if (isSubmit) {
      checkAll();
    }
  }, [isSubmit]);

  useEffect(() => {
    if (isTouchedFields.name) {
      changeNameHandler();
    }
    if (isTouchedFields.password) {
      changePasswordHandler();
    }
    if (isTouchedFields.email) {
      changeEmailHandler();
    }
    if (isTouchedFields.phone) {
      changePhoneHandler();
    }
    if (isTouchedFields.agreeNews) {
      changeAgreeNewsHandler();
    }
    if (isTouchedFields.agreeData) {
      changeAgreeDataHandler();
    }
  }, [isTouchedFields]);

  const checkName = (updatedValue: IRegisterData['username']) =>
    ValidatorService.validate(updatedValue, NAME_VALIDATORS);
  const checkPhone = (updatedValue: IRegisterData['phone'] | null) =>
    ValidatorService.validate(updatedValue, PHONE_VALIDATORS);
  const checkEmail = (updatedValue: IRegisterData['email']) =>
    ValidatorService.validate(updatedValue, EMAIL_VALIDATORS);
  const checkPassword = (updatedValue: IRegisterData['password']) =>
    ValidatorService.validate(updatedValue, PASSWORD_VALIDATORS);
  const checkAgreeNews = (updatedValue: boolean) => ValidatorService.validate(updatedValue, AGREE_NEWS_VALIDATORS);
  const checkAgreeData = (updatedValue: boolean) => ValidatorService.validate(updatedValue, AGREE_DATA_VALIDATORS);

  const checkAll = () => {
    changeNameHandler(name.value);
    changePhoneHandler(phone.value);
    changeEmailHandler(email.value);
    changePasswordHandler(password.value);
    changeAgreeNewsHandler(isAgreeNews.value);
    changeAgreeDataHandler(isAgreeData.value);
  };

  const resetFieldsState = () => {
    setName(initialNameValidation);
    setPhone(initialPhoneValidation);
    setEmail(initialEmailValidation);
    setPassword(initialPasswordValidation);
    setIsAgreeNews(initialAgreeNewsValidation);
    setIsAgreeData(initialAgreeDataValidation);
    changeTouchedNameHandler(false);
    changeTouchedPhoneHandler(false);
    changeTouchedEmailHandler(false);
    changeTouchedPasswordHandler(false);
    changeTouchedAgreeNewsHandler(false);
    changeTouchedAgreeDataHandler(false);
  };

  const changeNameHandler = (value: IRegisterData['username'] = name.value) => setName(checkName(value));
  const changePhoneHandler = (value: IRegisterData['phone'] | null = phone.value) => setPhone(checkPhone(value));
  const changeEmailHandler = (value: IRegisterData['email'] = email.value) => setEmail(checkEmail(value));
  const changePasswordHandler = (value: IRegisterData['password'] = password.value) =>
    setPassword(checkPassword(value));
  const changeAgreeNewsHandler = (value: boolean = isAgreeNews.value) => setIsAgreeNews(checkAgreeNews(value));
  const changeAgreeDataHandler = (value: boolean = isAgreeData.value) => setIsAgreeData(checkAgreeData(value));

  const changeTouchedNameHandler = (value = true) => {
    setIsTouchedFields((currentValue) => ({ ...currentValue, name: value }));
  };
  const changeTouchedPhoneHandler = (value = true) =>
    setIsTouchedFields((currentValue) => ({ ...currentValue, phone: value }));
  const changeTouchedEmailHandler = (value = true) =>
    setIsTouchedFields((currentValue) => ({ ...currentValue, email: value }));
  const changeTouchedPasswordHandler = (value = true) => {
    setIsTouchedFields((currentValue) => ({ ...currentValue, password: value }));
  };
  const changeTouchedAgreeNewsHandler = (value = true) => {
    setIsTouchedFields((currentValue) => ({ ...currentValue, agreeNews: value }));
  };
  const changeTouchedAgreeDataHandler = (value = true) => {
    setIsTouchedFields((currentValue) => ({ ...currentValue, agreeData: value }));
  };

  const submitData = () => {
    if (
      !name.isError &&
      !phone.isError &&
      !email.isError &&
      !password.isError &&
      !isAgreeNews.isError &&
      !isAgreeData.isError &&
      phone.value
    ) {
      dispatch(
        requestRegisterAsync({
          username: name.value,
          email: email.value,
          phone: phone.value,
          password: password.value,
        }),
      )
        .unwrap()
        .then(() => {
          resetFieldsState();
          setIsSubmit(false);
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
    if (
      !isTouchedFields.phone &&
      !isTouchedFields.email &&
      !isTouchedFields.password &&
      !isTouchedFields.name &&
      !isTouchedFields.agreeNews &&
      !isTouchedFields.agreeData
    ) {
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
    <RegistrationForm
      isLoading={isLoading}
      rootClassName={rootClassName}
      nameValue={name.value}
      emailValue={email.value}
      passwordValue={password.value}
      phoneValue={phone.value}
      isAgreeToNewsChecked={isAgreeNews.value}
      isAgreeToDataChecked={isAgreeData.value}
      nameError={name.errors[0]}
      emailError={email.errors[0]}
      phoneError={phone.errors[0]}
      passwordError={password.errors[0]}
      agreeNewsError={isAgreeNews.errors[0]}
      agreeDataError={isAgreeData.errors[0]}
      cbSubmitForm={submitHandler}
      cbChangeTouchedName={changeTouchedNameHandler}
      cbChangeTouchedEmail={changeTouchedEmailHandler}
      cbChangeTouchedPassword={changeTouchedPasswordHandler}
      cbChangeTouchedPhone={changeTouchedPhoneHandler}
      cbChangeTouchedAgreeNews={changeTouchedAgreeNewsHandler}
      cbChangeTouchedAgreeData={changeTouchedAgreeDataHandler}
      cbChangeNameHandler={changeNameHandler}
      cbChangePhoneHandler={changePhoneHandler}
      cbChangeEmailHandler={changeEmailHandler}
      cbChangePasswordHandler={changePasswordHandler}
      cbChangeAgreeToNewsHandler={changeAgreeNewsHandler}
      cbChangeAgreeToDataHandler={changeAgreeDataHandler}
    />
  );
};

export { RegisterContainer };
