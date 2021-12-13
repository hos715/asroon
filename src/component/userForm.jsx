import React, { useContext } from "react";
import { Context } from './../stateManagement/context/Context';

const UserForm = () => {


  const formContext = useContext(Context);
  const {
    handleSubmitForm,
    userId,
    fullname,
    setFullname,
    phoneNumber,
    setPhoneNumber,
    age,
    setAge,
    email,
    setEmail,
  } = formContext;

  return (
    <form className="c-form" onSubmit={(e) => handleSubmitForm(e)}>
      <h1 className="c-form__title">
        {userId === -1 ? "فرم زیر را پرکنید" : "ویرایش"}
      </h1>

      <label className="c-form__label">
        نام و نام خانوادگی
        <input
          className="c-form__input"
          type="text"
          placeholder="نام و نام خانوادگی"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
      </label>

      <label className="c-form__label">
        شماره موبایل
        <input
          className="c-form__input"
          type="tel"
          placeholder="شماره موبایل"
          pattern="[0-9]{11}"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </label>

      <label className="c-form__label">
        سن
        <input
          className="c-form__input"
          type="number"
          placeholder="سن"
          min="1"
          max="200"
          value={age > 0 ? age : ""}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </label>

      <label className="c-form__label">
        ایمیل
        <input
          className="c-form__input"
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <input
        type="submit"
        className="c-form__btn--submit"
        value={userId === -1 ? "ساخت اکانت" : "ثبت اطلاعات"}
      />
    </form>
  );
};

export default UserForm;
