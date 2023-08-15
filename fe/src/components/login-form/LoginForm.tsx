import { TextField } from '@/common-ui/text-field/TextField'
import { Button } from '@/common-ui/button'
import cn from 'classnames'
import { useLoginForm } from './useLoginForm'
import { InputType } from './utils'

import eye_close from '@/img/eye_close.png'
import eye_open from '@/img/eye_open.png'

import style from './LoginForm.module.scss'

export const LoginForm = () => {
  const {
    handleChange,
    handleShowPass,
    handleSubmit,
    isNewUser,
    isShowPass,
    handlerNewUser,
    values,
    setValues,
    errors,
  } = useLoginForm()

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <TextField
        type="email"
        placeholder={InputType.login}
        name={InputType.login}
        onChange={handleChange}
        showError={errors[InputType.login].isInvalid}
        errorMessage={errors[InputType.login].message}
        required={isNewUser}
      />
      <div className={style.pass__box}>
        <TextField
          type={isShowPass[InputType.passwordFirst] ? 'text' : 'password'}
          placeholder={InputType.passwordFirst}
          onChange={handleChange}
          name={InputType.passwordFirst}
          showError={errors[InputType.passwordFirst].isInvalid}
          errorMessage={errors[InputType.passwordFirst].message}
          required={isNewUser}
        />
        <img
          className={style.pass_btn}
          onClick={() => handleShowPass(InputType.passwordFirst)}
          src={isShowPass[InputType.passwordFirst] ? eye_close : eye_open}
          alt={isShowPass[InputType.passwordFirst] ? 'show' : 'hide'}
        />
      </div>

      <div
        className={cn(style.newUser__inputs, {
          [style.active]: isNewUser,
        })}
      >
        <div className={style.pass__box}>
          <TextField
            type={isShowPass[InputType.passwordSecond] ? 'text' : 'password'}
            placeholder={InputType.passwordSecond}
            onChange={handleChange}
            name={InputType.passwordSecond}
            showError={errors[InputType.passwordSecond].isInvalid}
            errorMessage={errors[InputType.passwordSecond].message}
            required={isNewUser}
          />
          <img
            className={style.pass_btn}
            onClick={() => handleShowPass(InputType.passwordSecond)}
            src={isShowPass[InputType.passwordSecond] ? eye_close : eye_open}
            alt={isShowPass[InputType.passwordSecond] ? 'show' : 'hide'}
          />
        </div>

        <TextField
          placeholder={InputType.firstName}
          name={InputType.firstName}
          onChange={handleChange}
          showError={errors[InputType.firstName].isInvalid}
          errorMessage={errors[InputType.firstName].message}
          required={isNewUser}
        />

        <TextField
          placeholder={InputType.lastName}
          name={InputType.lastName}
          onChange={handleChange}
          showError={errors[InputType.lastName].isInvalid}
          errorMessage={errors[InputType.lastName].message}
          required={isNewUser}
        />

        <TextField
          placeholder={InputType.phone}
          name={InputType.phone}
          onChange={handleChange}
          showError={errors[InputType.phone].isInvalid}
          errorMessage={errors[InputType.phone].message}
          required={isNewUser}
        />

        <label
          className={cn(style.newUser, {
            // [style.isInvalid]: true,
            [style.isInvalid]: errors[InputType.older18].isInvalid,
          })}
        >
          <input
            type="checkbox"
            name="new_user"
            checked={values[InputType.older18]}
            onChange={() =>
              setValues({ ...values, [InputType.older18]: !values[InputType.older18] })
            }
            required={isNewUser}
          />
          <span>Мені більше ніж 18 років *</span>
        </label>
      </div>

      <label className={style.newUser}>
        <input
          type="checkbox"
          name="new_user"
          checked={isNewUser}
          onChange={handlerNewUser}
        />
        <span>У мене немає акаунта</span>
      </label>

      <Button type="submit" onClick={handleSubmit}>
        {isNewUser ? 'Зареєструвати аккаунт' : 'Увійти'}
      </Button>
    </form>
  )
}
