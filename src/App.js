import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import ModalDialog from "./component/ModalDialog";
import UserForm from "./component/userForm";
import Users from "./component/Users";

import IconClose from "./icons/IconClose";

const App = () => {
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [userIndex, setUserIndex] = useState(-1);
  const [openModal, setOpenModal] = useState(false);

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
  const getUserIndex = (userId) => {
    const allusers = [...users];
    const userIndex = allusers.findIndex((user) => user.id === userId);
    setUserIndex(userIndex);
    setOpenModal(true);
  };
  const handleEditUser = (userId) => {
    const allusers = [...users];
    const userIndex = allusers.findIndex((user) => user.id === userId);
    setUserIndex(userIndex);
    const thisUser = allusers[userIndex];
    setFullname(thisUser.fullname);
    setPhoneNumber(thisUser.phoneNumber);
    setAge(thisUser.age);
    setEmail(thisUser.email);
  };
  const cancelDeleteUser = () => {
    setOpenModal(false);
    setUserIndex(-1);
  };
  const handleDeleteUser = () => {
    const allUsers = [...users];
    console.log("allUsers: ", allUsers);
    allUsers.splice(userIndex, 1);
    console.log("allUsers: ", allUsers);
    setUsers(allUsers);
    setOpenModal(false);
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
            />

            <Users
              clearInputs={clearInputs}
              users={users}
              getUserIndex={getUserIndex}
              handleEditUser={handleEditUser}
            />
          </div>
        </div>
      </div>
      <ModalDialog
        openModal={openModal}
        cancelDeleteUser={cancelDeleteUser}
        IconClose={IconClose}
        handleDeleteUser={handleDeleteUser}
      />
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
