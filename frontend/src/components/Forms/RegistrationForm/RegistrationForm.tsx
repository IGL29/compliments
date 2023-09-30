import cn from 'classnames';
import styles from './style.module.scss';
import { FieldWrapper } from '~components/FieldWrapper/FieldWrapper';
import { Button } from '~components/Button';
import { Checkbox } from '~components/Checkbox/Checkbox';
import { useState } from 'react';
import { IProps } from './types';
import { Loader } from '~src/components/Loader';
import { TransformDataService } from '~src/services/TransformDataService';

const RegistrationForm = ({
  isLoading,
  rootClassName,
  cbSubmitForm,
  nameValue,
  phoneValue,
  emailValue,
  passwordValue,
  nameError,
  passwordError,
  emailError,
  phoneError,
  agreeNewsError,
  agreeDataError,
  isAgreeToNewsChecked,
  isAgreeToDataChecked,
  cbChangeTouchedName,
  cbChangeTouchedEmail,
  cbChangeTouchedPassword,
  cbChangeTouchedPhone,
  cbChangeTouchedAgreeNews,
  cbChangeTouchedAgreeData,
  cbChangeAgreeToDataHandler,
  cbChangeAgreeToNewsHandler,
  cbChangeEmailHandler,
  cbChangeNameHandler,
  cbChangePasswordHandler,
  cbChangePhoneHandler,
}: IProps) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const cbChangeVisiblePassword = () => setIsVisiblePassword((value) => !value);
  const typePasswordField = isVisiblePassword ? 'text' : 'password';
  const phoneView = TransformDataService.toViewPhone(phoneValue);

  return (
    <form className={cn(styles['from'], rootClassName)} onSubmit={cbSubmitForm}>
      <h2 className={cn(styles['form__title'])}>Зарегистрируйтесь</h2>

      {isLoading && (
        <div className={styles['form__loader-wrapper']}>
          <Loader rootClassName={styles['form__loader']} text="Радуемся новому пользователю..." />
        </div>
      )}

      <FieldWrapper rootClassName={cn(styles['form__field-wrapper'])} error={nameError}>
        <input
          className="input"
          type="text"
          placeholder="Введите ваше имя"
          value={nameValue}
          onChange={(ev) => cbChangeNameHandler(ev.target.value)}
          autoComplete="username"
          onBlur={() => cbChangeTouchedName()}
        />
      </FieldWrapper>

      <FieldWrapper rootClassName={cn(styles['form__field-wrapper'])} error={phoneError}>
        <input
          className="input"
          type="text"
          placeholder="Введите номер телефона"
          value={phoneView}
          onChange={(ev) => cbChangePhoneHandler(TransformDataService.toDataPhone(ev.target.value))}
          autoComplete="tel"
          onBlur={() => cbChangeTouchedPhone()}
        />
      </FieldWrapper>

      <FieldWrapper rootClassName={cn(styles['form__field-wrapper'])} error={emailError}>
        <input
          className="input"
          type="text"
          placeholder="Введите ваш email"
          value={emailValue}
          onChange={(ev) => cbChangeEmailHandler(ev.target.value)}
          autoComplete="email"
          onBlur={cbChangeTouchedEmail}
        />
      </FieldWrapper>

      <FieldWrapper
        rootClassName={cn(styles['form__field-wrapper'])}
        isPassword
        isVisiblePassword={isVisiblePassword}
        cbChangeVisiblePassword={cbChangeVisiblePassword}
        error={passwordError}
      >
        <input
          className="input input--password"
          type={typePasswordField}
          value={passwordValue}
          placeholder="Придумайте пароль"
          onChange={(ev) => cbChangePasswordHandler(ev.target.value)}
          autoComplete="new-password"
          onBlur={cbChangeTouchedPassword}
        />
      </FieldWrapper>

      <Checkbox
        rootClassName={cn(styles['form__checkbox'])}
        inputId="checkbox-agree-1"
        isChecked={isAgreeToNewsChecked}
        cbChangeChecked={cbChangeAgreeToNewsHandler}
        error={agreeNewsError}
        cbChangeBlur={cbChangeTouchedAgreeNews}
      >
        <>Согласен(-на) на получение новостной рассылки (дает постоянную скидку 5%)</>
      </Checkbox>

      <Checkbox
        rootClassName={cn(styles['form__checkbox'])}
        inputId="checkbox-agree-2"
        isChecked={isAgreeToDataChecked}
        cbChangeChecked={cbChangeAgreeToDataHandler}
        error={agreeDataError}
        cbChangeBlur={cbChangeTouchedAgreeData}
      >
        <>Я соглашаюсь с Положением о персональных данных и конфиденциальности.</>
      </Checkbox>

      <Button
        rootClassName={cn(styles['form__registration-btn'])}
        textClassName={cn(styles['form__registration-text-btn'])}
        text="Зарегистрироваться"
        type="submit"
      />
    </form>
  );
};

export { RegistrationForm };
