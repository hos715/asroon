import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { toast } from "react-toastify";

import {
  deleteUser,
  getSingleUser,
  getUsers,
  registerUser,
  updateUser,
} from "./services/userServices";

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

  const initialStates = async () => {
    try {
      const { status, data } = await getUsers();
      if (status === 200) {
        setUsers(data);
        toast.success('اطلاعت از روی سرور بارگذاری شد')
      }
    } catch (er) {
      console.log(er);
    }
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
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    if (phoneNumber > 999999999999) {
      toast.warn(
        "لطفا شماره موبایل خود را بررسی نمایید، نباید بیشتر از 14 کاراکتر باشد"
      );
    } else if (age > 200 && age < 1) {
      toast.warn("لطفا سن کاربر را دوباره بررسی نمایید");
    } else if (userId !== -1) {
      const user = {
        fullname,
        phoneNumber,
        age,
        email,
      };

      try {
        const { status } = await updateUser(userId, user);
        if (status === 200) {
          clearInputs();
          navigate("/form");
          toast.success("ویرایش با موفقیت انجام شد.");
          initialStates();
        }
      } catch (ex) {
        console.log(ex);
        toast.error("مشکلی به وجود آمده.");
      }
    } else {
      const newUser = {
        fullname,
        phoneNumber,
        age,
        email,
      };

      try {
        const { status, data } = await registerUser(newUser);
        if (status === 201) {
          toast.success(`کاربر جدید (${data.fullname}) با موفقیت اضافه شد`);
          clearInputs();
          navigate("/form");
          initialStates();
        }
      } catch (ex) {
        console.log(ex);
        toast.error("برای افزودن کاربر جدید، مشکلی پیش آمده.");
      }
    }
  };
  const getUserId = (selectedId) => {
    console.log(selectedId);
    setUserId(selectedId);
    setOpenModal(true);
  };
  const handleEditUser = async (selectedId) => {
    try {
      const { status, data } = await getSingleUser(selectedId);
      if (status === 200) {
        setFullname(data.fullname);
        setPhoneNumber(data.phoneNumber);
        setAge(data.age);
        setEmail(data.email);
        setUserId(data.id);
        navigate("/");
        toast.success("اطالاعات کاربر انتخاب شده جهت ویرایش بارگیری شد.");
      }
    } catch (ex) {
      toast.error(
        `در بارگیری سطر اتخاب شده مشکلی به وجود آمده دوباره تلاش کنید`
      );
      console.log(ex);
      navigate("/form");
    }
  };
  const cancelDeleteUser = () => {
    setOpenModal(false);
    clearInputs();
    toast.success("حذف سطر مورد نظر لغو شد.");
  };
  const handleDeleteUser = async () => {
    try {
      const { status } = await deleteUser(userId);
      if (status === 200) {
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
      }
    } catch (ex) {
      console.log(ex);
      toast.error("حذف سطر مورد نظر با مشکل مواجه شد، لطفا دوباره تلاش کنید.");
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
