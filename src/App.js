import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

import config from "./services/config.json";

import ModalDialog from "./component/ModalDialog";
import UserForm from "./component/userForm";
import Users from "./component/Users";

import IconClose from "./icons/IconClose";
import MainLayout from "./layout/MainLayout";

const App = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(-1);
  const [openModal, setOpenModal] = useState(false);

  const [users, setUsers] = useState({});

  useEffect(() => {
    checkUsers();
    initialStates();
  }, []);

  const initialStates = () => {
    axios
      .get(`${config.fakeapi}/users`)
      .then(({ data, status }) => {
        if (status === 200) {
          setUsers(data);
        }
        console.log("data: ", data);
        console.log("status: ", status);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const checkUsers = () => {
    if (users.length > 0) {
      navigate("/form");
    }
  };

  const clearInputs = () => {
    setFullname("");
    setPhoneNumber(0);
    setAge(0);
    setEmail("");
    setUserId(-1);
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();

    if (phoneNumber > 999999999999) {
      toast.warn(
        "لطفا شماره موبایل خود را بررسی نمایید، نباید بیشتر از 14 کاراکتر باشد"
      );
    } else if (age > 200 && age < 1) {
      toast.warn("لطفا سن کاربر را دوباره بررسی نمایید");
    } else if (userId !== -1) {
      const updateUser = {
        fullname,
        phoneNumber,
        age,
        email,
      };
      axios
        .put(`${config.fakeapi}/users/${userId}`, JSON.stringify(updateUser), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          clearInputs();
          navigate("/form");
          toast.success("ویرایش با موفقیت انجام شد.");
          initialStates();
        })
        .catch((ex) => {
          console.log(ex);
        });
    } else {
      const newUser = {
        fullname,
        phoneNumber,
        age,
        email,
      };
      axios
        .post(`${config.fakeapi}/users`, JSON.stringify(newUser), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(({ status, data }) => {
          console.log(status);
          if (status === 201) {
            toast.success(`کاربری جدید (${data.fullname}) با موفقیت اضافه شد`);
            clearInputs();
            navigate("/form");
            initialStates();
          }
        })
        .catch((ex) => {
          console.log(ex);
          toast.error("برای افزودن کاربر جدید، مشکلی پیش آمده.");
        });
    }
  };
  const getUserId = (selectedId) => {
    console.log(selectedId);
    setUserId(selectedId);
    setOpenModal(true);
  };
  const handleEditUser = (selectedId) => {
    axios
      .get(`${config.fakeapi}/users/${selectedId}`)
      .then(({ status, data }) => {
        if (status === 200) {
          setFullname(data.fullname);
          setPhoneNumber(data.phoneNumber);
          setAge(data.age);
          setEmail(data.email);
          setUserId(data.id);
          navigate("/");
          toast.success("اطالاعات کاربر انتخاب شده جهت ویرایش بارگیری شد.");
        }
      })
      .catch((ex) => console.log(ex));
  };
  const cancelDeleteUser = () => {
    setOpenModal(false);
    clearInputs();
    toast.success("حذف سطر مورد نظر لغو شد.");
  };
  const handleDeleteUser = () => {
    console.log(userId);
    axios
      .delete(`${config.fakeapi}/users/${userId}`)
      .then((response) => {
        console.log(response);
        toast.success("سطر مورد نظر با موفقیت حذف شد.");
        setOpenModal(false);
        clearInputs();
        initialStates();
        if (users.length <= 1) {
          toast.warn(
            "هیج سطری جهت نمایش وجود ندارد، به صفحه ثبت کاربر جدید منتقل میشوید."
          );
          navigate("/");
        }
      })
      .catch((ex) => console.log(ex));
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
                userId={userId}
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
                initialStates={initialStates}
                clearInputs={clearInputs}
                users={users}
                getUserId={getUserId}
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
