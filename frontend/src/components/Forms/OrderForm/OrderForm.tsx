import cn from 'classnames';
import styles from './style.module.scss';
import { Button } from '~components/Button';
import { Checkbox } from '~components/Checkbox';
import { FieldWrapper } from '~components/FieldWrapper/FieldWrapper';
import { RadioButton } from '~components/RadioButton';
import { OrderInfoContainer } from '~src/containers/OrderInfoContainer';
import { IProps } from './types';
import { ChangeEvent, FormEvent } from 'react';
import { DeliveryMethod } from '~src/services/api/entities/api-orders/types';
import { Loader } from '~src/components/Loader';
import { TransformDataService } from '~src/services/TransformDataService';

const OrderForm = ({
  rootClassName,
  name,
  phone,
  deliveryMethod,
  city,
  street,
  house,
  entrance,
  apartment,
  comment,
  isAgreePolicy,
  nameError,
  phoneError,
  deliveryMethodError,
  cityError,
  streetError,
  houseError,
  entranceError,
  apartmentError,
  commentError,
  isAgreePolicyError,
  isLoading,
  cbChangeIsAgreePolicy,
  cbChangeName,
  cbChangePhone,
  cbChangeDeliveryMethod,
  cbChangeCity,
  cbChangeStreet,
  cbChangeHouse,
  cbChangeEntrance,
  cbChangeApartment,
  cbChangeComment,
  cbChangeTouchedAgreePolicy,
  cbChangeTouchedApartment,
  cbChangeTouchedCity,
  cbChangeTouchedComment,
  cbChangeTouchedDeliveryMethod,
  cbChangeTouchedEntrance,
  cbChangeTouchedHouse,
  cbChangeTouchedName,
  cbChangeTouchedPhone,
  cbChangeTouchedStreet,
  cbSubmit,
}: IProps) => {
  const submitHandler = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    cbSubmit();
  };
  const changeNameHandler = (ev: ChangeEvent<HTMLInputElement>): void => {
    cbChangeName(ev.target.value);
  };
  const changePhoneHandler = (ev: ChangeEvent<HTMLInputElement>): void => {
    cbChangePhone(TransformDataService.toDataPhone(ev.target.value));
  };
  const changeDeliveryMethod = (value: DeliveryMethod): void => {
    cbChangeDeliveryMethod(value);
  };
  const changeCityHandler = (ev: ChangeEvent<HTMLInputElement>): void => {
    cbChangeCity(ev.target.value);
  };
  const changeStreetHandler = (ev: ChangeEvent<HTMLInputElement>): void => {
    cbChangeStreet(ev.target.value);
  };
  const changeHouseHandler = (ev: ChangeEvent<HTMLInputElement>): void => {
    cbChangeHouse(ev.target.value);
  };
  const changeEntranceHandler = (ev: ChangeEvent<HTMLInputElement>): void => {
    cbChangeEntrance(ev.target.value);
  };
  const changeApartmentHandler = (ev: ChangeEvent<HTMLInputElement>): void => {
    cbChangeApartment(ev.target.value);
  };
  const changeCommentHandler = (ev: ChangeEvent<HTMLTextAreaElement>): void => {
    cbChangeComment(ev.target.value);
  };
  const changeAgreePolicyHandler = (value: boolean): void => {
    cbChangeIsAgreePolicy(value);
  };

  return (
    <form className={cn(rootClassName, styles['order-form'])} onSubmit={submitHandler}>
      {isLoading && <Loader />}

      <fieldset className={cn(styles['order-form__fieldset'])}>
        <legend className={cn(styles['order-form__legend'])}>Контактные данные</legend>

        <FieldWrapper rootClassName={cn(styles['order-form__field-wrapper'])} error={nameError}>
          <input
            className={cn(styles['order-form__input'], 'input')}
            type="text"
            placeholder="Имя"
            value={name}
            onChange={changeNameHandler}
            onBlur={() => cbChangeTouchedName()}
          />
        </FieldWrapper>

        <FieldWrapper rootClassName={cn(styles['order-page'])} error={phoneError}>
          <input
            className={cn(styles['order-form__input'], 'input')}
            type="text"
            placeholder="Номер телефона"
            value={TransformDataService.toViewPhone(phone)}
            onChange={changePhoneHandler}
            onBlur={() => cbChangeTouchedPhone()}
          />
        </FieldWrapper>
      </fieldset>

      <fieldset className={cn(styles['order-form__fieldset'])}>
        <legend className={cn(styles['order-form__legend'])}>Способ получения</legend>

        <RadioButton
          rootClassName={cn(styles['order-form__radio-button'])}
          inputId="delivery-courier"
          inputName="courier"
          activeInputName={TransformDataService.toViewDeliveryMethod(deliveryMethod)}
          cbChangeChecked={changeDeliveryMethod}
          cbChangeBlur={cbChangeTouchedDeliveryMethod}
          error={deliveryMethodError}
        >
          <>Доставка курьером по Москве</>
        </RadioButton>

        <RadioButton
          rootClassName={cn(styles['order-form__radio-button'])}
          inputId="delivery-sdec"
          inputName="sdec"
          activeInputName={TransformDataService.toViewDeliveryMethod(deliveryMethod)}
          cbChangeChecked={changeDeliveryMethod}
          cbChangeBlur={cbChangeTouchedDeliveryMethod}
          error={deliveryMethodError}
        >
          <>Доставка СДЭК</>
        </RadioButton>

        <RadioButton
          rootClassName={cn(styles['order-form__radio-button'])}
          inputId="delivery-pickup"
          inputName="pickup"
          activeInputName={TransformDataService.toViewDeliveryMethod(deliveryMethod)}
          cbChangeChecked={cbChangeDeliveryMethod}
          cbChangeBlur={cbChangeTouchedDeliveryMethod}
          error={deliveryMethodError}
        >
          <>Самовывоз</>
        </RadioButton>
      </fieldset>

      <fieldset className={cn(styles['order-form__fieldset'])}>
        <legend className={cn(styles['order-form__legend'])}>Адрес доставки</legend>

        <FieldWrapper rootClassName={cn(styles['order-form__field-wrapper'])} error={cityError}>
          <input
            className={cn(styles['order-form__input'], 'input')}
            type="text"
            placeholder="Город"
            value={city}
            onChange={changeCityHandler}
            onBlur={() => cbChangeTouchedCity()}
          />
        </FieldWrapper>

        <FieldWrapper rootClassName={cn(styles['order-form__field-wrapper'])} error={streetError}>
          <input
            className={cn(styles['order-form__input'], 'input')}
            type="text"
            placeholder="Улица"
            value={street}
            onChange={changeStreetHandler}
            onBlur={() => cbChangeTouchedStreet()}
          />
        </FieldWrapper>

        <FieldWrapper rootClassName={cn(styles['order-form__field-wrapper'])} error={houseError}>
          <input
            className={cn(styles['order-form__input'], 'input')}
            type="text"
            placeholder="Дом"
            value={house}
            onChange={changeHouseHandler}
            onBlur={() => cbChangeTouchedHouse()}
          />
        </FieldWrapper>

        <FieldWrapper rootClassName={cn(styles['order-form__field-wrapper'])} error={entranceError}>
          <input
            className={cn(styles['order-form__input'], 'input')}
            type="text"
            placeholder="Подъезд"
            value={entrance}
            onChange={changeEntranceHandler}
            onBlur={() => cbChangeTouchedEntrance()}
          />
        </FieldWrapper>

        <FieldWrapper rootClassName={cn(styles['order-form__field-wrapper'])} error={apartmentError}>
          <input
            className={cn(styles['order-form__input'], 'input')}
            type="text"
            placeholder="Квартира"
            value={apartment}
            onChange={changeApartmentHandler}
            onBlur={() => cbChangeTouchedApartment()}
          />
        </FieldWrapper>
      </fieldset>

      <FieldWrapper rootClassName={cn(styles['order-form__field-wrapper-textarea'])} error={commentError}>
        <textarea
          className={cn(styles['order-form__textarea'], 'textarea')}
          name=""
          id=""
          placeholder="Комментарий к заказу"
          value={comment}
          onChange={changeCommentHandler}
          onBlur={() => cbChangeTouchedComment()}
        ></textarea>
      </FieldWrapper>

      <OrderInfoContainer rootClassName={cn(styles['order-form__order-info'])} />

      <Checkbox
        rootClassName={cn(styles['order-form__checkbox'])}
        inputId="agree"
        isChecked={isAgreePolicy}
        cbChangeChecked={changeAgreePolicyHandler}
        cbChangeBlur={cbChangeTouchedAgreePolicy}
        error={isAgreePolicyError}
      >
        <>Я соглашаюсь с Положением о персональных данных и конфиденциальности.</>
      </Checkbox>

      <Button
        rootClassName={cn(styles['order-form__btn-submit'])}
        textClassName={cn(styles['order-form__btn-submit-text'])}
        text="Оформить заказ"
        type="submit"
      />
    </form>
  );
};

export { OrderForm };
