import cn from 'classnames';
import { ChangeEvent, FormEvent } from 'react';
import { FieldWrapper } from '~components/FieldWrapper/FieldWrapper';
import styles from './style.module.scss';
import { Button } from '~components/Button';
import { Checkbox } from '~components/Checkbox/Checkbox';
import { IProps } from './types';
import { TransformDataService } from '~src/services/TransformDataService';
import { Loader } from '~src/components/Loader';

const FeedbackForm = ({
  commentValue,
  nameValue,
  phoneValue,
  nameError,
  commentError,
  phoneError,
  isAgreeValue,
  isLoading,
  isAgreeError,
  cbChangeAgree,
  cbChangeComment,
  cbChangeName,
  cbChangePhone,
  cbSubmit,
  cbChangeTouchedName,
  cbChangeTouchedPhone,
  cbChangeTouchedComment,
  cbChangeTouchedAgree,
}: IProps) => {
  const changeNameHandler = (ev: ChangeEvent<HTMLInputElement>) => cbChangeName(ev.target.value);
  const changePhoneHandler = (ev: ChangeEvent<HTMLInputElement>) =>
    cbChangePhone(TransformDataService.toDataPhone(ev.target.value));
  const changeCommentHandler = (ev: ChangeEvent<HTMLTextAreaElement>) => cbChangeComment(ev.target.value);
  const submitHandler = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    cbSubmit();
  };

  const phoneView = TransformDataService.toViewPhone(phoneValue);

  return (
    <form className={cn(styles.form)} onSubmit={submitHandler}>
      {isLoading && <Loader rootClassName={cn(styles['form__loader'])} text="Ждем пока высохнут чернила" />}

      <FieldWrapper rootClassName={cn(styles['form__field'])} error={nameError}>
        <input
          className={cn('input')}
          type="text"
          value={nameValue}
          onChange={changeNameHandler}
          autoComplete="name"
          placeholder="Введите ваше имя"
          onBlur={() => cbChangeTouchedName()}
          required
        />
      </FieldWrapper>

      <FieldWrapper rootClassName={cn(styles['form__field'])} error={phoneError}>
        <input
          className={cn('input')}
          type="text"
          value={phoneView}
          onChange={changePhoneHandler}
          autoComplete="tel"
          placeholder="Ваш номер телефона"
          onBlur={() => cbChangeTouchedPhone()}
          required
        />
      </FieldWrapper>

      <FieldWrapper rootClassName={cn(styles['form__field'], styles['form__field--textarea'])} error={commentError}>
        <textarea
          className={cn('textarea')}
          value={commentValue}
          onChange={changeCommentHandler}
          placeholder="Ваш комментарий"
          onBlur={() => cbChangeTouchedComment()}
          required
        />
      </FieldWrapper>

      <Checkbox
        rootClassName={cn(styles['form__checkbox'], styles['checkbox'])}
        isChecked={isAgreeValue}
        cbChangeChecked={cbChangeAgree}
        inputId="agree"
        error={isAgreeError}
        cbChangeBlur={cbChangeTouchedAgree}
        isRequired
      >
        <div className={cn(styles['checkbox__label'])}>
          Я соглашаюсь с Положением о персональных данных и конфиденциальности.
        </div>
      </Checkbox>

      <Button
        rootClassName={cn(styles['form__btn'])}
        textClassName={cn(styles['form__btn-text'])}
        type="submit"
        text="Отправить"
      />
    </form>
  );
};

export { FeedbackForm };
