import { ChangeEvent, FormEvent } from 'react';
import { Button } from '~components/Button';
import { FieldWrapper } from '~src/components/FieldWrapper/FieldWrapper';
import { IProps } from './types';
import styles from './style.module.scss';
import { Loader } from '~src/components/Loader';

const SubscribtionForm = ({
  cbDoSubscribe,
  isLoading,
  cbChangeEmailValue,
  emailValue,
  emailError,
  cbChangeTouchedEmail,
}: IProps) => {
  const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => cbChangeEmailValue(ev.target.value);

  const submitFormHandler = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    cbDoSubscribe();
  };

  return (
    <form className={styles['form']} onSubmit={submitFormHandler}>
      {isLoading && (
        <div className={styles['form__loader-wrapper']}>
          <Loader rootClassName={styles['form__loader']} text="Восхищаемся адресом вашей почты..." />
        </div>
      )}

      <FieldWrapper rootClassName={styles['form__wrapper-input']} error={emailError}>
        <input
          className="input"
          type="email"
          placeholder="Введите ваш email"
          value={emailValue}
          onChange={changeHandler}
          onBlur={() => cbChangeTouchedEmail()}
        />
      </FieldWrapper>

      <Button text="Подписаться" type="submit" />
    </form>
  );
};

export { SubscribtionForm };
