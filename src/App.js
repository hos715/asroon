import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import UserForm from "./component/userForm";
import UsersTable from "./component/UsersTable";

import IconPlus from "./icons/IconPlus";

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

            <UserForm
              handleSubmitForm={handleSubmitForm}
              userIndex={userIndex}
              fullname={fullname}
              setFullname={setFullname}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              age={age}
              setAge={setAge}
              email={email}
              setEmail={setEmail}
              userIndex={userIndex}
            />

            <div className="c-app__col">
              <div className="c-users">
                <div className="c-users__col--head">
                  <h1 className="c-users__title">داده ها</h1>
                  <div className="c-user__buttons">
                    <button className="c-btn c-btn__primry--outline">
                      دریافت اطلاعات از سرور
                    </button>
                    <button
                      className="c-btn c-btn__primry has-icon"
                      onClick={() => clearInputs()}
                    >
                      <IconPlus />
                      ساخت اکانت جدید
                    </button>
                  </div>
                </div>
                {users.length > 0 ? (
                  <UsersTable
                    handleDeleteUser={handleDeleteUser}
                    handleEditUser={handleEditUser}
                    users={users}
                  />
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
