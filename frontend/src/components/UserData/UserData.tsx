import cn from 'classnames';

import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';
import styles from './style.module.scss';
import { IProps } from './types';
import { Loader } from '../Loader';
import { TransformDataService } from '~src/services/TransformDataService';
import { FormEvent } from 'react';

const UserData = ({
  rootClassName,
  nameValue,
  phoneValue,
  cityValue,
  streetValue,
  houseValue,
  entranceValue,
  apartmentValue,
  isSubscribeValue,
  apartmentError,
  cityError,
  emailError,
  entranceError,
  houseError,
  isSubscribeError,
  nameError,
  phoneError,
  streetError,
  isLoadingPatchProfile,
  isLoadingProfile,
  emailValue,
  isChanging,
  isAuth,
  cbChangeTouchedApartment,
  cbChangeTouchedCity,
  cbChangeTouchedEmail,
  cbChangeTouchedEntrance,
  cbChangeTouchedHouse,
  cbChangeTouchedName,
  cbChangeTouchedPhone,
  cbChangeTouchedStreet,
  cbChangeTouchedIsSubscribe,
  cbChangeApartmentValue,
  cbChangeCityValue,
  cbChangeEmailValue,
  cbChangeEntranceValue,
  cbChangeHouseValue,
  cbChangeIsSubscribeValue,
  cbChangeNameValue,
  cbChangePhoneValue,
  cbChangeStreetValue,
  cbOnChange,
  cbOnChangeCancel,
  cbOnChangeSave,
  cbLogout,
}: IProps) => {
  const phoneValueView = TransformDataService.toViewPhone(phoneValue);

  const submitFormHandler = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    cbOnChangeSave();
  };

  const renderLogoutButton = isAuth;

  return (
    <div className={cn(rootClassName, styles['content'])}>
      {(isLoadingPatchProfile || isLoadingProfile) && (
        <Loader rootClassName={styles['content__loader']} text="Загрузка" />
      )}

      <div className={cn(styles['page__profile'])}>
        <form className={cn(styles['page__sections-wrapper'])} onSubmit={submitFormHandler}>
          <fieldset className={cn(styles['profile__section'], styles['section'])}>
            <legend className={styles['section__title']}>Контактные данные</legend>

            <FieldWrapper rootClassName={styles['section__input-wrapper']} error={nameError}>
              <input
                className="input"
                type="text"
                placeholder="Имя"
                disabled={!isChanging}
                value={nameValue}
                onChange={(ev) => cbChangeNameValue(ev.target.value)}
                onBlur={() => cbChangeTouchedName()}
              />
            </FieldWrapper>

            <FieldWrapper rootClassName={styles['section__input-wrapper']} error={phoneError}>
              <input
                className="input"
                type="text"
                placeholder="Номер телефона"
                disabled={!isChanging}
                value={phoneValueView}
                onChange={(ev) => cbChangePhoneValue(TransformDataService.toDataPhone(ev.target.value))}
                onBlur={() => cbChangeTouchedPhone()}
              />
            </FieldWrapper>
          </fieldset>

          <fieldset className={cn(styles['profile__section'], styles['section'])}>
            <legend className={styles['section__title']}>Адрес доставки</legend>

            <FieldWrapper rootClassName={styles['section__input-wrapper']} error={cityError}>
              <input
                className="input"
                type="text"
                placeholder="Город"
                disabled={!isChanging}
                value={cityValue}
                onChange={(ev) => cbChangeCityValue(ev.target.value)}
                onBlur={() => cbChangeTouchedCity()}
              />
            </FieldWrapper>

            <FieldWrapper rootClassName={styles['section__input-wrapper']} error={streetError}>
              <input
                className="input"
                type="text"
                placeholder="Улица"
                disabled={!isChanging}
                value={streetValue}
                onChange={(ev) => cbChangeStreetValue(ev.target.value)}
                onBlur={() => cbChangeTouchedStreet()}
              />
            </FieldWrapper>

            <FieldWrapper rootClassName={styles['section__input-wrapper']} error={houseError}>
              <input
                className="input"
                type="text"
                placeholder="Дом"
                disabled={!isChanging}
                value={houseValue}
                onChange={(ev) => cbChangeHouseValue(ev.target.value)}
                onBlur={() => cbChangeTouchedHouse()}
              />
            </FieldWrapper>

            <FieldWrapper rootClassName={styles['section__input-wrapper']} error={entranceError}>
              <input
                className="input"
                type="text"
                placeholder="Подъезд"
                disabled={!isChanging}
                value={entranceValue}
                onChange={(ev) => cbChangeEntranceValue(ev.target.value)}
                onBlur={() => cbChangeTouchedEntrance()}
              />
            </FieldWrapper>

            <FieldWrapper rootClassName={styles['section__input-wrapper']} error={apartmentError}>
              <input
                className="input"
                type="text"
                placeholder="Квартира"
                disabled={!isChanging}
                value={apartmentValue}
                onChange={(ev) => cbChangeApartmentValue(ev.target.value)}
                onBlur={() => cbChangeTouchedApartment()}
              />
            </FieldWrapper>
          </fieldset>

          <fieldset className={cn(styles['profile__section'], styles['section'])}>
            <legend className={styles['section__title']}>Участие в рассылке</legend>

            <Checkbox
              rootClassName={styles['section__checkbox']}
              inputId="agree"
              isChecked={isSubscribeValue}
              isDisabled={!isChanging}
              cbChangeChecked={(isChecked) => cbChangeIsSubscribeValue(isChecked)}
              error={isSubscribeError}
              cbChangeBlur={cbChangeTouchedIsSubscribe}
            >
              <>Даю согласие на получение новостной рассылки (для получения постоянной скидки 5%)</>
            </Checkbox>

            <FieldWrapper rootClassName={styles['section__input-wrapper']} error={emailError}>
              <input
                className="input"
                type="email"
                placeholder="E-mail"
                value={emailValue}
                disabled={!isChanging}
                onChange={(ev) => cbChangeEmailValue(ev.target.value)}
                onBlur={() => cbChangeTouchedEmail()}
              />
            </FieldWrapper>
          </fieldset>

          {!isChanging && !isLoadingPatchProfile && (
            <div>
              <Button text="Изменить" onClick={cbOnChange} />
            </div>
          )}

          {(isChanging || isLoadingPatchProfile) && (
            <div className={cn(styles['action-changing-wrapper'])}>
              <Button
                rootClassName={cn(styles['action-changing-wrapper__btn-cancel'])}
                text="Отменить"
                variant={2}
                onClick={cbOnChangeCancel}
              />
              <Button text="Сохранить" type="submit" />
            </div>
          )}
        </form>

        {renderLogoutButton && (
          <div className={cn(styles['profile__action-btn-wrapper'])}>
            <Button text="Выйти из аккаунта" onClick={cbLogout} />
          </div>
        )}
      </div>
    </div>
  );
};

export { UserData };
