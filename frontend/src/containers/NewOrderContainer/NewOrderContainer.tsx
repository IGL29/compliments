import { OrderForm } from '~src/components/Forms/OrderForm/OrderForm';
import { Props } from './types';
import { useEffect, useState, useContext } from 'react';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { requestPostNewOrderAsync } from '~src/store/features/orders/sideEffects';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { getInitValidation } from '~src/utils/getInitValidation';
import { INewOrderData } from '~src/services/api/entities/api-orders/types';
import { ValidatorService } from '~src/services/ValidatorService';
import { Validators } from '~src/services/Validators';
import { navigate } from 'vite-plugin-ssr/client/router';
import { ROUTES_DATA } from '~src/data/routes';
import { NotificationsContext } from '~src/contexts/NotificationsContext';
import { ErrorNotify } from '~src/components/Notify/ErrorNotify';

const INIT_NAME_VALUE = '' as string;
const INIT_PHONE_VALUE = null;
const INIT_CITY_VALUE = '' as string;
const INIT_STREET_VALUE = '' as string;
const INIT_HOUSE_VALUE = '' as string;
const INIT_APARTMENT_VALUE = '' as string;
const INIT_ENTRANCE_VALUE = '' as string;
const INIT_DELIVERY_METHOD_VALUE = null;
const INIT_COMMENT_VALUE = '' as string;
const INIT_AGREE_POLICY_VALUE = false as boolean;

const initialCommentValidation = getInitValidation(INIT_COMMENT_VALUE);
const initialDeliveryMethodValidation = getInitValidation<INewOrderData['deliveryMethod'] | null>(
  INIT_DELIVERY_METHOD_VALUE,
);
const initialAgreePolicyValidation = getInitValidation(INIT_AGREE_POLICY_VALUE);

const INIT_TOUCHED_FIELDS = {
  name: false,
  phone: false,
  city: false,
  street: false,
  house: false,
  apartment: false,
  entrance: false,
  deliveryMethod: false,
  comment: false,
  agreePolicy: false,
};

const NAME_VALIDATORS = [Validators.empty()];
const PHONE_VALIDATORS = [Validators.empty(), Validators.phone()];
const CITY_VALIDATORS = [Validators.empty()];
const STREET_VALIDATORS = [Validators.empty()];
const HOUSE_VALIDATORS = [Validators.empty()];
const APARTMENT_VALIDATORS = [] as [];
const ENTRANCE_VALIDATORS = [] as [];
const DELIVERY_METHOD_VALIDATORS = [Validators.empty()];
const COMMENT_VALIDATORS = [] as [];
const AGREE_POLICY_VALIDATORS = [Validators.truthy()];

const NewOrderContainer = (props: Props) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.order.isLoadingPostOrder);
  const { showNotify } = useContext(NotificationsContext);

  const userNameFromProfile = useAppSelector((state) => state.profile.userData?.name);
  const userPhoneFromProfile = useAppSelector((state) => state.profile.userData?.phone);
  const userCityFromProfile = useAppSelector((state) => state.profile.userData?.address.city);
  const userStreetFromProfile = useAppSelector((state) => state.profile.userData?.address.street);
  const userHouseFromProfile = useAppSelector((state) => state.profile.userData?.address.house);
  const userApartmentFromProfile = useAppSelector((state) => state.profile.userData?.address.apartment);
  const userEntranceFromProfile = useAppSelector((state) => state.profile.userData?.address.entrance);

  const initialNameValidation = getInitValidation(userNameFromProfile || INIT_NAME_VALUE);
  const initialPhoneValidation = getInitValidation(userPhoneFromProfile || INIT_PHONE_VALUE);
  const initialCityValidation = getInitValidation(userCityFromProfile || INIT_CITY_VALUE);
  const initialStreetValidation = getInitValidation(userStreetFromProfile || INIT_STREET_VALUE);
  const initialHouseValidation = getInitValidation(userHouseFromProfile || INIT_HOUSE_VALUE);
  const initialApartmentValidation = getInitValidation(userApartmentFromProfile || INIT_APARTMENT_VALUE);
  const initialEntranceValidation = getInitValidation(userEntranceFromProfile || INIT_ENTRANCE_VALUE);

  const [name, setName] = useState(initialNameValidation);
  const [phone, setPhone] = useState(initialPhoneValidation);
  const [city, setCity] = useState(initialCityValidation);
  const [street, setStreet] = useState(initialStreetValidation);
  const [house, setHouse] = useState(initialHouseValidation);
  const [apartment, setApartment] = useState(initialApartmentValidation);
  const [entrance, setEntrance] = useState(initialEntranceValidation);
  const [comment, setComment] = useState(initialCommentValidation);
  const [deliveryMethod, setDeliveryMethod] = useState(initialDeliveryMethodValidation);
  const [agreePolicy, setAgreePolicy] = useState(initialAgreePolicyValidation);

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
    if (isTouchedFields.city) {
      changeCityHandler();
    }
    if (isTouchedFields.agreePolicy) {
      changeAgreePolicyHandler();
    }
    if (isTouchedFields.apartment) {
      changeApartmentHandler();
    }
    if (isTouchedFields.comment) {
      changeCommentHandler();
    }
    if (isTouchedFields.deliveryMethod) {
      changeDeliveryMethodHandler();
    }
    if (isTouchedFields.entrance) {
      changeEntranceHandler();
    }
    if (isTouchedFields.house) {
      changeHouseHandler();
    }
    if (isTouchedFields.street) {
      changeStreetHandler();
    }
  }, [isTouchedFields]);

  const checkAll = () => {
    changeNameHandler(name.value);
    changePhoneHandler(phone.value);
    changeCityHandler(city.value);
    changeApartmentHandler(apartment.value);
    changeStreetHandler(street.value);
    changeHouseHandler(house.value);
    changeEntranceHandler(entrance.value);
    changeCommentHandler(comment.value);
    changeDeliveryMethodHandler(deliveryMethod.value);
    changeAgreePolicyHandler(agreePolicy.value);
  };

  const checkName = (updatedValue: INewOrderData['name']) => ValidatorService.validate(updatedValue, NAME_VALIDATORS);
  const checkPhone = (updatedValue: INewOrderData['phone'] | null) =>
    ValidatorService.validate(updatedValue, PHONE_VALIDATORS);
  const checkCity = (updatedValue: INewOrderData['address']['city']) =>
    ValidatorService.validate(updatedValue, CITY_VALIDATORS);
  const checkApartment = (updatedValue: string) => ValidatorService.validate(updatedValue, APARTMENT_VALIDATORS);
  const checkStreet = (updatedValue: INewOrderData['address']['street']) =>
    ValidatorService.validate(updatedValue, STREET_VALIDATORS);
  const checkHouse = (updatedValue: INewOrderData['address']['house']) =>
    ValidatorService.validate(updatedValue, HOUSE_VALIDATORS);
  const checkEntrance = (updatedValue: string) => ValidatorService.validate(updatedValue, ENTRANCE_VALIDATORS);
  const checkComment = (updatedValue: INewOrderData['comment']) =>
    ValidatorService.validate(updatedValue, COMMENT_VALIDATORS);
  const checkDeliveryMethod = (updatedValue: INewOrderData['deliveryMethod'] | null) =>
    ValidatorService.validate(updatedValue, DELIVERY_METHOD_VALIDATORS);
  const checkAgreePolicy = (updatedValue: boolean) => ValidatorService.validate(updatedValue, AGREE_POLICY_VALIDATORS);

  const changeNameHandler = (value: INewOrderData['name'] = name.value) => setName(checkName(value));
  const changePhoneHandler = (value: INewOrderData['phone'] | null = phone.value) => setPhone(checkPhone(value));
  const changeCityHandler = (value: INewOrderData['address']['city'] = city.value) => setCity(checkCity(value));
  const changeApartmentHandler = (value: INewOrderData['address']['apartment'] = apartment.value) =>
    setApartment(checkApartment(value));
  const changeStreetHandler = (value: INewOrderData['address']['street'] = street.value) =>
    setStreet(checkStreet(value));
  const changeHouseHandler = (value: INewOrderData['address']['house'] = house.value) => setHouse(checkHouse(value));
  const changeEntranceHandler = (value: INewOrderData['address']['entrance'] = entrance.value) =>
    setEntrance(checkEntrance(value));
  const changeCommentHandler = (value: INewOrderData['comment'] = comment.value) => setComment(checkComment(value));
  const changeDeliveryMethodHandler = (value: INewOrderData['deliveryMethod'] | null = deliveryMethod.value) =>
    setDeliveryMethod(checkDeliveryMethod(value));
  const changeAgreePolicyHandler = (value: boolean = agreePolicy.value) => setAgreePolicy(checkAgreePolicy(value));

  const changeTouchedNameHandler = (value = true) => {
    setIsTouchedFields((currentValue) => ({ ...currentValue, name: value }));
  };
  const changeTouchedPhoneHandler = (value = true) => {
    setIsTouchedFields((currentValue) => ({ ...currentValue, phone: value }));
  };
  const changeTouchedCityHandler = (value = true) => {
    setIsTouchedFields((currentValue) => ({ ...currentValue, city: value }));
  };
  const changeTouchedApartmentHandler = (value = true) => {
    setIsTouchedFields((currentValue) => ({ ...currentValue, apartment: value }));
  };
  const changeTouchedStreetHandler = (value = true) => {
    setIsTouchedFields((currentValue) => ({ ...currentValue, street: value }));
  };
  const changeTouchedHouseHandler = (value = true) => {
    setIsTouchedFields((currentValue) => ({ ...currentValue, house: value }));
  };
  const changeTouchedEntranceHandler = (value = true) => {
    setIsTouchedFields((currentValue) => ({ ...currentValue, entrance: value }));
  };
  const changeTouchedCommentHandler = (value = true) => {
    setIsTouchedFields((currentValue) => ({ ...currentValue, comment: value }));
  };
  const changeTouchedDeliveryMethodHandler = (value = true) => {
    setIsTouchedFields((currentValue) => ({ ...currentValue, deliveryMethod: value }));
  };
  const changeTouchedAgreePolicyHandler = (value = true) => {
    setIsTouchedFields((currentValue) => ({ ...currentValue, agreePolicy: value }));
  };

  const submitData = () => {
    if (
      !deliveryMethod.isError &&
      !apartment.isError &&
      !entrance.isError &&
      !comment.isError &&
      !name.isError &&
      !phone.isError &&
      !city.isError &&
      !street.isError &&
      !house.isError &&
      deliveryMethod.value &&
      phone.value
    ) {
      dispatch(
        requestPostNewOrderAsync({
          address: {
            city: city.value,
            house: house.value,
            street: street.value,
            apartment: apartment.value,
            entrance: entrance.value,
          },
          comment: comment.value,
          deliveryMethod: deliveryMethod.value,
          name: name.value,
          phone: phone.value,
        }),
      )
        .unwrap()
        .then((payload) => {
          navigate(`${ROUTES_DATA.ORDER.url}/${payload.id}`);
          showNotify({
            content: <>Заказ успешно оформлен</>,
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
    if (
      !isTouchedFields.phone &&
      !isTouchedFields.agreePolicy &&
      !isTouchedFields.apartment &&
      !isTouchedFields.name &&
      !isTouchedFields.comment &&
      !isTouchedFields.city &&
      !isTouchedFields.deliveryMethod &&
      !isTouchedFields.entrance &&
      !isTouchedFields.house &&
      !isTouchedFields.street
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
    <OrderForm
      {...props}
      apartment={apartment.value}
      city={city.value}
      comment={comment.value}
      deliveryMethod={deliveryMethod.value}
      entrance={entrance.value}
      house={house.value}
      name={name.value}
      phone={phone.value}
      street={street.value}
      isAgreePolicy={agreePolicy.value}
      isLoading={isLoading}
      apartmentError={apartment.errors[0]}
      cityError={city.errors[0]}
      commentError={comment.errors[0]}
      deliveryMethodError={deliveryMethod.errors[0]}
      entranceError={entrance.errors[0]}
      houseError={house.errors[0]}
      isAgreePolicyError={agreePolicy.errors[0]}
      nameError={name.errors[0]}
      phoneError={phone.errors[0]}
      streetError={street.errors[0]}
      cbChangeIsAgreePolicy={changeAgreePolicyHandler}
      cbChangeApartment={changeApartmentHandler}
      cbChangeCity={changeCityHandler}
      cbChangeComment={changeCommentHandler}
      cbChangeDeliveryMethod={changeDeliveryMethodHandler}
      cbChangeEntrance={changeEntranceHandler}
      cbChangeHouse={changeHouseHandler}
      cbChangeName={changeNameHandler}
      cbChangePhone={changePhoneHandler}
      cbChangeStreet={changeStreetHandler}
      cbChangeTouchedAgreePolicy={changeTouchedAgreePolicyHandler}
      cbChangeTouchedApartment={changeTouchedApartmentHandler}
      cbChangeTouchedCity={changeTouchedCityHandler}
      cbChangeTouchedComment={changeTouchedCommentHandler}
      cbChangeTouchedDeliveryMethod={changeTouchedDeliveryMethodHandler}
      cbChangeTouchedEntrance={changeTouchedEntranceHandler}
      cbChangeTouchedHouse={changeTouchedHouseHandler}
      cbChangeTouchedName={changeTouchedNameHandler}
      cbChangeTouchedPhone={changeTouchedPhoneHandler}
      cbChangeTouchedStreet={changeTouchedStreetHandler}
      cbSubmit={submitHandler}
    />
  );
};

export { NewOrderContainer };
