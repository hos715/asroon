import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Context } from './Context';
import { updateUser, registerUser, deleteUser, getSingleUser } from './../../services/userService';
import { useNavigate } from 'react-router';



const UserContext = ({ children }) => {

   const navigate = useNavigate();

   const [fullname, setFullname] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [age, setAge] = useState(0);
   const [email, setEmail] = useState("");
   const [userId, setUserId] = useState(-1);
   const [openModal, setOpenModal] = useState(false);

   const clearStates = () => {
      setFullname("");
      setPhoneNumber(0);
      setAge(0);
      setEmail("");
      setUserId(-1);
   };

   const getUserId = (selectedId) => {
      console.log(selectedId);
      setUserId(selectedId);
      setOpenModal(true);
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
               clearStates();
               navigate("/form");
               toast.success("ویرایش با موفقیت انجام شد.");
               // initialStates();
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
               clearStates();
               navigate("/form");
               // initialStates();
            }
         } catch (ex) {
            console.log(ex);
            toast.error("برای افزودن کاربر جدید، مشکلی پیش آمده.");
         }
      }
   };

   const cancelDeleteUser = () => {
      setOpenModal(false);
      clearStates();
      toast.success("حذف سطر مورد نظر لغو شد.");
   };
   const handleDeleteUser = async () => {
      try {
         const { status } = await deleteUser(userId);
         if (status === 200) {
            toast.success("سطر مورد نظر با موفقیت حذف شد.");
            setOpenModal(false);
            clearStates();
            // initialStates();
            // if (users.length <= 1) {
            //   toast.warn(
            //     "هیج سطری جهت نمایش وجود ندارد، به صفحه ثبت کاربر جدید منتقل میشوید."
            //   );
            //   navigate("/");
            // }
         }
      } catch (ex) {
         console.log(ex);
         toast.error("حذف سطر مورد نظر با مشکل مواجه شد، لطفا دوباره تلاش کنید.");
      }
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


   return (
      <Context.Provider value={{
         fullname,
         setFullname,
         phoneNumber,
         setPhoneNumber,
         age,
         setAge,
         email,
         setEmail,
         userId,
         setUserId,
         openModal,
         setOpenModal,
         handleSubmitForm,
         getUserId,
         handleEditUser,
         handleDeleteUser,
         cancelDeleteUser
      }}>
         {children}
      </Context.Provider>
   );
}

export default UserContext;