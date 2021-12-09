import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import IconEdit from "./icons/IconEdit";
import IconPlus from "./icons/IconPlus";
import IconTrash from "./icons/IconTrash";

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
  const handleEditUser = (userId) => {
    const allusers = [...users];
    const userIndex = allusers.findIndex((user) => user.id === userId);
    const thisUser = allusers[userIndex];
    setFullname(thisUser.fullname);
    setPhoneNumber(thisUser.phoneNumber);
    setAge(thisUser.age);
    setEmail(thisUser.email);
    setUserIndex(userIndex);
  };
  const handleDeleteUser = (userId) => {
    const allUsers = [...users];
    const filteredUsers = allUsers.filter((user) => user.id !== userId);
    setUsers(filteredUsers);
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

            <div className="c-app__col">
              <div className="c-users">
                <div className="c-users__col--head">
                  <h1 className="c-users__title">داده ها</h1>
                  <div className="c-user__buttons">
                    <button className="c-btn c-btn__primry--outline">
                      دریافت اطلاعات از سرور
                    </button>
                    <button className="c-btn c-btn__primry has-icon" onClick={()=>clearInputs()}>
                      <IconPlus />
                      ساخت اکانت جدید
                    </button>
                  </div>
                </div>
                {users.length > 0 ? (
                  <table className="c-users__table">
                    <thead>
                      <tr>
                        <th>نام و نام خانوادگی</th>
                        <th>شماره موبایل</th>
                        <th>سن</th>
                        <th>ایمیل</th>
                        <th>تاریخ ایجاد</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.fullname}</td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.age}</td>
                          <td>{user.email}</td>
                          <td>1400,07,23</td>
                          <td>
                            <button
                              className="c-icon-btn c-users__edit-user"
                              onClick={() => handleEditUser(user.id)}
                            >
                              <IconEdit />
                            </button>
                            <button
                              className="c-icon-btn c-users__delete-user"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <IconTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <h1>هیچ کاربری برای نمایش وجود ندارد</h1>
                )}
              </div>
            </div>
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
