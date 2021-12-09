import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [userIndex, setUserIndex] = useState(-1);

  const [users, setUsers] = useState(initialState);

  const clearInputs = () => {
    setFullname("");
    setPhoneNumber(0);
    setAge(0);
    setEmail("");
    setUserIndex(-1);
  };
  const handleSubmitForm = (event) => {
    console.log(phoneNumber);
    event.preventDefault();
    if (phoneNumber > 999999999999) {
      toast.warn(
        "لطفا شماره موبایل خود را بررسی نمایید، نباید بیشتر از 14 کاراکتر باشد"
      );
    } else if (age > 200 && age < 1) {
      toast.warn("لطفا سن کاربر را دوباره بررسی نمایید");
    } else if (userIndex >= 0) {
      const allUsers = [...users];
      const filterUser = allUsers[userIndex];
      filterUser.fullname = fullname;
      filterUser.phoneNumber = phoneNumber;
      filterUser.age = age;
      filterUser.email = email;
      allUsers[userIndex] = filterUser;
      setUsers(allUsers);
      clearInputs();
    } else {
      const allUsers = [...users];
      const newUser = {
        id: uuidv4(),
        fullname,
        phoneNumber,
        age,
        email,
      };
      allUsers.push(newUser);
      setUsers(allUsers);
      clearInputs();
    }
  };
  return (
    <>
      <div className="c-app">
        <div className="c-app__wrapper">
          <div className="c-app__col">
            
            <img
              className="c-app--image"
              src="logo.png"
              width="125"
              height="132"
              alt="logo"
            />

            <form className="c-form" onSubmit={(e) => handleSubmitForm(e)}>
              <h1 className="c-form__title">{userIndex === -1 ? ("فرم زیر را پرکنید"):("ویرایش")}</h1>

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
                  type="number"
                  placeholder="شماره موبایل"
                  maxLength="14"
                  value={phoneNumber > 0 ? phoneNumber : ""}
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
                value={userIndex === -1 ? ("ساخت اکانت"):("ثبت اطلاعات")}
              />
            </form>

          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;

var initialState = [
  {
    id: uuidv4(),
    fullname: "حسین خلیلی",
    phoneNumber: "09039228802",
    age: "29",
    email: "hossein@hos.com",
  },
];
