import { FormEvent, useState } from 'react';
import cn from 'classnames';
import { FieldWrapper } from '~components/FieldWrapper/FieldWrapper';
import { Button } from '~components/Button';
import styles from './style.module.scss';
import { Checkbox } from '~components/Checkbox/Checkbox';
import { IProps } from './types';
import { Loader } from '~src/components/Loader';

const SigninForm = ({
  rootClassName,
  passwordValue,
  emailValue,
  agreeValue,
  isLoading,
  emailError,
  passwordError,
  agreeError,
  cbChangeEmail,
  cbChangePassword,
  cbChangeAgree,
  cbSubmit,
  cbChangeTouchedEmail,
  cbChangeTouchedPassword,
  cbChangeTouchedAgree,
}: IProps) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const cbChangeVisiblePassword = () => setIsVisiblePassword((value) => !value);
  const typePasswordField = isVisiblePassword ? 'text' : 'password';

  const submitHandler = (ev: FormEvent<HTMLFormElement>) => cbSubmit(ev);

  return (
    <form className={cn(styles['form'], rootClassName)} onSubmit={submitHandler}>
      <h2 className={cn(styles['form__title'])}>Войдите в свой аккаунт</h2>

      {isLoading && (
        <div className={styles['form__loader-wrapper']}>
          <Loader rootClassName={styles['form__loader']} text="Проверяем данные..." />
        </div>
      )}

      <FieldWrapper rootClassName={cn(styles['form__email-field-wrapper'])} error={emailError}>
        <input
          className="input"
          type="text"
          value={emailValue}
          onChange={(ev) => cbChangeEmail(ev.target.value)}
          placeholder="Email"
          autoComplete="email"
          onBlur={() => cbChangeTouchedEmail()}
        />
      </FieldWrapper>

      <FieldWrapper
        rootClassName={cn(styles['form__password-field-wrapper'])}
        isPassword
        isVisiblePassword={isVisiblePassword}
        cbChangeVisiblePassword={cbChangeVisiblePassword}
        error={passwordError}
      >
        <input
          className="input input--password"
          type={typePasswordField}
          value={passwordValue}
          onChange={(ev) => cbChangePassword(ev.target.value)}
          placeholder="Пароль"
          autoComplete="current-password"
          onBlur={() => cbChangeTouchedPassword()}
        />
      </FieldWrapper>

      <Checkbox
        isChecked={agreeValue}
        cbChangeChecked={(isChacked) => cbChangeAgree(isChacked)}
        rootClassName={cn(styles['form__checkbox-wrapper'])}
        inputId="checkbox-agree-1"
        cbChangeBlur={cbChangeTouchedAgree}
        error={agreeError}
      >
        <>Я соглашаюсь с Положением о персональных данных и конфиденциальности.</>
      </Checkbox>

      <Button
        rootClassName={cn(styles['form__submit-btn'])}
        textClassName={cn(styles['form__submit-btn-text'])}
        text="Войти"
        type="submit"
      />
    </form>
  );
};

export { SigninForm };
