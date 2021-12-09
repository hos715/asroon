import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import ModalDialog from "./component/ModalDialog";
import UserForm from "./component/userForm";
import Users from "./component/Users";

import IconClose from "./icons/IconClose";
import MainLayout from "./layout/MainLayout";

const App = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [userIndex, setUserIndex] = useState(-1);
  const [openModal, setOpenModal] = useState(false);

  const [users, setUsers] = useState(initialState);

  useEffect(() => {
    const checkUsers = () => {
      if (users.length > 0) {
        navigate("/form");
      }
    };
    checkUsers();
  }, []);

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
      navigate("/form");
      toast.success("ویرایش با موفقیت انجام شد.");
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
      toast.success("کاربر جدید با موفقیت اضافه شد..");
      navigate("/form");
    }
  };
  const getUserIndex = (userId) => {
    const allusers = [...users];
    const userIndex = allusers.findIndex((user) => user.id === userId);
    setUserIndex(userIndex);
    setOpenModal(true);
  };
  const handleEditUser = (userId) => {
    navigate("/");
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
    clearInputs();
    toast.success("حذف سطر مورد نظر لغو شد.");
  };
  const handleDeleteUser = () => {
    const allUsers = [...users];
    allUsers.splice(userIndex, 1);
    setUsers(allUsers);
    setOpenModal(false);
    clearInputs();
    toast.success("سطر مورد نظر با موفقیت حذف شد.");
    if (allUsers.length === 0) {
      toast.warn(
        "هیج سطری جهت نمایش وجود ندارد، به صفحه ثبت کاربر جدید منتقل میشوید."
      );
      navigate("/");
    }
  };
  return (
    <>
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={
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
            }
          />
          <Route
            path="/form"
            element={
              <Users
                clearInputs={clearInputs}
                users={users}
                getUserIndex={getUserIndex}
                handleEditUser={handleEditUser}
              />
            }
          />
        </Routes>
      </MainLayout>

      <ModalDialog
        openModal={openModal}
        cancelDeleteUser={cancelDeleteUser}
        IconClose={IconClose}
        handleDeleteUser={handleDeleteUser}
      />
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
