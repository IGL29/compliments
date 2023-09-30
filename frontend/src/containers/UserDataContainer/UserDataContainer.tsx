import { UserData } from '~src/components/UserData';
import { IProps } from './types';
import { useContext, useEffect, useState } from 'react';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { resetErrorPatchProfile } from '~src/store/features/profile/profileSlice';
import { logoutAsync, requestPatchProfileAsync } from '~src/store/features/profile/sideEffects';
import { getInitValidation } from '~src/utils/getInitValidation';
import { IUser } from '~src/services/api/entities/api-profile/types';
import { Validators } from '~src/services/Validators';
import { ValidatorService } from '~src/services/ValidatorService';
import { NotificationsContext } from '~src/contexts/NotificationsContext';
import { ErrorNotify } from '~src/components/Notify/ErrorNotify';
import { ROUTES_DATA } from '~src/data/routes';
import { navigate } from 'vite-plugin-ssr/client/router';

const INIT_NAME_VALUE = '' as string;
const INIT_PHONE_VALUE = null;
const INIT_EMAIL_VALUE = '' as string;
const INIT_CITY_VALUE = '' as string;
const INIT_ENTRANCE_VALUE = '' as string;
const INIT_HOUSE_VALUE = '' as string;
const INIT_STREET_VALUE = '' as string;
const INIT_APARTMENT_VALUE = '' as string;
const INIT_IS_SUBSCRIBE_VALUE = false as boolean;

const NAME_VALIDATORS = [Validators.empty()];
const PHONE_VALIDATORS = [Validators.empty(), Validators.phone()];
const EMAIL_VALIDATORS = [Validators.empty(), Validators.email()];
const CITY_VALIDATORS = [] as [];
const ENTRANCE_VALIDATORS = [] as [];
const HOUSE_VALIDATORS = [] as [];
const STREET_VALIDATORS = [] as [];
const APARTMENT_VALIDATORS = [] as [];
const IS_SUBSCRIBE_VALIDATORS = [] as [];

const INIT_TOUCHED_FIELDS = {
  name: false,
  phone: false,
  email: false,
  city: false,
  entrance: false,
  house: false,
  street: false,
  apartment: false,
  isSubscribe: false,
};

const UserDataContainer = ({ rootClassName }: IProps) => {
  const dispatch = useAppDispatch();
  const { showNotify } = useContext(NotificationsContext);

  const userDataFromProfile = useAppSelector((state) => state.profile.userData);
  const userNameFromProfile = useAppSelector((state) => state.profile.userData?.name);
  const userPhoneFromProfile = useAppSelector((state) => state.profile.userData?.phone);
  const userEmailFromProfile = useAppSelector((state) => state.profile.userData?.email);
  const userCityFromProfile = useAppSelector((state) => state.profile.userData?.address.city);
  const userEntranceFromProfile = useAppSelector((state) => state.profile.userData?.address.entrance);
  const userHouseFromProfile = useAppSelector((state) => state.profile.userData?.address.house);
  const userStreetFromProfile = useAppSelector((state) => state.profile.userData?.address.street);
  const userApartmentFromProfile = useAppSelector((state) => state.profile.userData?.address.apartment);
  const userIsSubscribeFromProfile = useAppSelector((state) => state.profile.userData?.isSubscribe);

  const initialNameValidation = getInitValidation(userNameFromProfile || INIT_NAME_VALUE);
  const initialPhoneValidation = getInitValidation(userPhoneFromProfile || INIT_PHONE_VALUE);
  const initialEmailValidation = getInitValidation(userEmailFromProfile || INIT_EMAIL_VALUE);
  const initialCityValidation = getInitValidation(userCityFromProfile || INIT_CITY_VALUE);
  const initialEntranceValidation = getInitValidation(userEntranceFromProfile || INIT_ENTRANCE_VALUE);
  const initialHouseValidation = getInitValidation(userHouseFromProfile || INIT_HOUSE_VALUE);
  const initialStreetValidation = getInitValidation(userStreetFromProfile || INIT_STREET_VALUE);
  const initialApartmentValidation = getInitValidation(userApartmentFromProfile || INIT_APARTMENT_VALUE);
  const initialIsSubscribeValidation = getInitValidation(userIsSubscribeFromProfile || INIT_IS_SUBSCRIBE_VALUE);

  const isLoadingProfile = useAppSelector((state) => state.profile.isProfileLoading);
  const isLoadingPatchProfile = useAppSelector((state) => state.profile.isLoadingPatchProfile);
  const isErrorPatchProfile = useAppSelector((state) => state.profile.patchProfileError);
  const isAuth = useAppSelector((state) => state.profile.isAuth);

  const [name, setName] = useState(initialNameValidation);
  const [phone, setPhone] = useState(initialPhoneValidation);
  const [email, setEmail] = useState(initialEmailValidation);
  const [city, setCity] = useState(initialCityValidation);
  const [entrance, setEntrance] = useState(initialEntranceValidation);
  const [house, setHouse] = useState(initialHouseValidation);
  const [street, setStreet] = useState(initialStreetValidation);
  const [apartment, setApartment] = useState(initialApartmentValidation);
  const [isSubscribe, setIsSubscribe] = useState(initialIsSubscribeValidation);

  const [isChanging, setIsChanging] = useState(false);
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
    if (isTouchedFields.phone) {
      changePhoneHandler();
    }
    if (isTouchedFields.email) {
      changeEmailHandler();
    }
    if (isTouchedFields.city) {
      changeCityHandler();
    }
    if (isTouchedFields.house) {
      changeHouseHandler();
    }
    if (isTouchedFields.street) {
      changeStreetHandler();
    }
    if (isTouchedFields.apartment) {
      changeApartmentHandler();
    }
    if (isTouchedFields.isSubscribe) {
      changeIsSubscribeHandler();
    }
  }, [isTouchedFields]);

  useEffect(() => {
    setInitialValuesToForm();
  }, [userDataFromProfile]);

  useEffect(() => {
    if (isErrorPatchProfile && !isChanging) {
      setIsChanging(true);
    }
  }, [isErrorPatchProfile]);

  const checkName = (updatedValue: IUser['name']) => ValidatorService.validate(updatedValue, NAME_VALIDATORS);
  const checkPhone = (updatedValue: IUser['phone'] | null) => ValidatorService.validate(updatedValue, PHONE_VALIDATORS);
  const checkEmail = (updatedValue: IUser['email']) => ValidatorService.validate(updatedValue, EMAIL_VALIDATORS);
  const checkCity = (updatedValue: IUser['address']['city']) =>
    ValidatorService.validate(updatedValue, CITY_VALIDATORS);
  const checkEntrance = (updatedValue: string) => ValidatorService.validate(updatedValue, ENTRANCE_VALIDATORS);
  const checkHouse = (updatedValue: IUser['address']['house']) =>
    ValidatorService.validate(updatedValue, HOUSE_VALIDATORS);
  const checkStreet = (updatedValue: IUser['address']['street']) =>
    ValidatorService.validate(updatedValue, STREET_VALIDATORS);
  const checkApartment = (updatedValue: string) => ValidatorService.validate(updatedValue, APARTMENT_VALIDATORS);
  const checkIsSubscribe = (updatedValue: boolean) => ValidatorService.validate(updatedValue, IS_SUBSCRIBE_VALIDATORS);

  const checkAll = () => {
    changeNameHandler(name.value);
    changePhoneHandler(phone.value);
    changeEmailHandler(email.value);
    changeCityHandler(city.value);
    changeEntranceHandler(entrance.value);
    changeHouseHandler(house.value);
    changeStreetHandler(street.value);
    changeApartmentHandler(street.value);
    changeIsSubscribeHandler(isSubscribe.value);
    setIsAwaitAllChecking(true);
  };

  const setInitialValuesToForm = () => {
    setName(initialNameValidation);
    setPhone(initialPhoneValidation);
    setEmail(initialEmailValidation);
    setCity(initialCityValidation);
    setEntrance(initialEntranceValidation);
    setHouse(initialHouseValidation);
    setStreet(initialStreetValidation);
    setApartment(initialApartmentValidation);
    setIsSubscribe(initialIsSubscribeValidation);
  };

  const resetTouchedState = () => {
    changeTouchedNameHandler(false);
    changeTouchedPhoneHandler(false);
    changeTouchedEmailHandler(false);
    changeTouchedCityHandler(false);
    changeTouchedEntranceHandler(false);
    changeTouchedStreetHandler(false);
    changeTouchedHouseHandler(false);
    changeTouchedApartmentHandler(false);
    changeTouchedIsSubscribeHandler(false);
  };

  const changeNameHandler = (value: IUser['name'] = name.value) => setName(checkName(value));
  const changePhoneHandler = (value: IUser['phone'] | null = phone.value) => setPhone(checkPhone(value));
  const changeEmailHandler = (value: IUser['email'] = email.value) => setEmail(checkEmail(value));
  const changeCityHandler = (value: IUser['address']['city'] = city.value) => setCity(checkCity(value));
  const changeEntranceHandler = (value: IUser['address']['entrance'] = entrance.value) =>
    setEntrance(checkEntrance(value));
  const changeHouseHandler = (value: IUser['address']['house'] = house.value) => setHouse(checkHouse(value));
  const changeStreetHandler = (value: IUser['address']['street'] = street.value) => setStreet(checkStreet(value));
  const changeApartmentHandler = (value: IUser['address']['apartment'] = apartment.value) =>
    setApartment(checkApartment(value));
  const changeIsSubscribeHandler = (value: boolean = isSubscribe.value) => setIsSubscribe(checkIsSubscribe(value));

  const changeTouchedNameHandler = (value = true) => {
    setIsTouchedFields((currentValue) => ({ ...currentValue, name: value }));
  };
  const changeTouchedPhoneHandler = (value = true) =>
    setIsTouchedFields((currentValue) => ({ ...currentValue, phone: value }));
  const changeTouchedEmailHandler = (value = true) =>
    setIsTouchedFields((currentValue) => ({ ...currentValue, email: value }));
  const changeTouchedCityHandler = (value = true) =>
    setIsTouchedFields((currentValue) => ({ ...currentValue, city: value }));
  const changeTouchedEntranceHandler = (value = true) =>
    setIsTouchedFields((currentValue) => ({ ...currentValue, entrance: value }));
  const changeTouchedHouseHandler = (value = true) =>
    setIsTouchedFields((currentValue) => ({ ...currentValue, house: value }));
  const changeTouchedStreetHandler = (value = true) =>
    setIsTouchedFields((currentValue) => ({ ...currentValue, street: value }));
  const changeTouchedApartmentHandler = (value = true) =>
    setIsTouchedFields((currentValue) => ({ ...currentValue, apartment: value }));
  const changeTouchedIsSubscribeHandler = (value = true) =>
    setIsTouchedFields((currentValue) => ({ ...currentValue, isSubscribe: value }));

  function resolveChange<T>(cb: (args: T) => void, args: T) {
    if (!isChanging) {
      return;
    }
    cb(args);
  }

  const publicChangeApartmentValue = (value: string) => resolveChange(changeApartmentHandler, value);
  const publicChangeCityValue = (value: string) => resolveChange(changeCityHandler, value);
  const publicChangeEmailValue = (value: string) => resolveChange(changeEmailHandler, value);
  const publicChangeEntranceValue = (value: string) => resolveChange(changeEntranceHandler, value);
  const publicChangeHouseValue = (value: string) => resolveChange(changeHouseHandler, value);
  const publicChangeNameValue = (value: string) => resolveChange(changeNameHandler, value);
  const publicChangePhoneValue = (value: number | null) => resolveChange(changePhoneHandler, value);
  const publicChangeStreetValue = (value: string) => resolveChange(changeStreetHandler, value);
  const publicChangeIsSubscribeValue = (value: boolean) => resolveChange(changeIsSubscribeHandler, value);

  const logoutHandler = () => {
    dispatch(logoutAsync())
      .unwrap()
      .then(() => {
        navigate(ROUTES_DATA.MAIN.url);
      });
  };
  const onChangeHandler = () => setIsChanging(true);
  const onChangeCancelHandler = () => {
    setIsChanging(false);
    dispatch(resetErrorPatchProfile());
    setInitialValuesToForm();
  };

  const submitData = () => {
    if (
      !isLoadingPatchProfile &&
      !name.isError &&
      !phone.isError &&
      !email.isError &&
      !entrance.isError &&
      !house.isError &&
      !name.isError &&
      !apartment.isError &&
      !street.isError &&
      !isSubscribe.isError &&
      phone.value
    ) {
      setIsChanging(false);
      dispatch(
        requestPatchProfileAsync({
          email: email.value,
          name: name.value,
          phone: phone.value,
          isSubscribe: isSubscribe.value,
          address: {
            city: city.value,
            house: house.value,
            street: street.value,
            apartment: apartment.value,
            entrance: entrance.value,
          },
        }),
      )
        .unwrap()
        .then(() => {
          resetTouchedState();
          setIsSubmit(false);
          showNotify({
            content: <>Данные успешно обновлены</>,
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
    if (isLoadingProfile || isLoadingPatchProfile) {
      return;
    }
    if (
      !isTouchedFields.phone &&
      !isTouchedFields.email &&
      !isTouchedFields.name &&
      !isTouchedFields.street &&
      !isTouchedFields.apartment &&
      !isTouchedFields.city &&
      !isTouchedFields.entrance &&
      !isTouchedFields.house &&
      !isTouchedFields.isSubscribe
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
    <UserData
      rootClassName={rootClassName}
      apartmentValue={apartment.value}
      cityValue={city.value}
      emailValue={email.value}
      entranceValue={entrance.value}
      houseValue={house.value}
      nameValue={name.value}
      phoneValue={phone.value}
      streetValue={street.value}
      isSubscribeValue={isSubscribe.value}
      apartmentError={apartment.errors[0]}
      cityError={city.errors[0]}
      emailError={email.errors[0]}
      entranceError={entrance.errors[0]}
      houseError={house.errors[0]}
      nameError={name.errors[0]}
      phoneError={phone.errors[0]}
      streetError={street.errors[0]}
      isSubscribeError={isSubscribe.errors[0]}
      isChanging={isChanging}
      isAuth={isAuth}
      isLoadingPatchProfile={isLoadingPatchProfile}
      isLoadingProfile={isLoadingProfile}
      cbChangeApartmentValue={publicChangeApartmentValue}
      cbChangeCityValue={publicChangeCityValue}
      cbChangeEmailValue={publicChangeEmailValue}
      cbChangeEntranceValue={publicChangeEntranceValue}
      cbChangeHouseValue={publicChangeHouseValue}
      cbChangeNameValue={publicChangeNameValue}
      cbChangePhoneValue={publicChangePhoneValue}
      cbChangeStreetValue={publicChangeStreetValue}
      cbChangeIsSubscribeValue={publicChangeIsSubscribeValue}
      cbChangeTouchedApartment={changeTouchedApartmentHandler}
      cbChangeTouchedCity={changeTouchedCityHandler}
      cbChangeTouchedEmail={changeTouchedEmailHandler}
      cbChangeTouchedEntrance={changeTouchedEntranceHandler}
      cbChangeTouchedHouse={changeTouchedHouseHandler}
      cbChangeTouchedName={changeTouchedNameHandler}
      cbChangeTouchedPhone={changeTouchedPhoneHandler}
      cbChangeTouchedStreet={changeTouchedStreetHandler}
      cbChangeTouchedIsSubscribe={changeTouchedIsSubscribeHandler}
      cbOnChange={onChangeHandler}
      cbOnChangeCancel={onChangeCancelHandler}
      cbOnChangeSave={submitHandler}
      cbLogout={logoutHandler}
    />
  );
};

export { UserDataContainer };
