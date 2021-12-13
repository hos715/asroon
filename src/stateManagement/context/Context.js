import { createContext } from "react";

export const Context = createContext({
  fullname: "",
  setFullname: () => {},
  phoneNumber: "",
  setPhoneNumber: () => {},
  age: 0,
  setAge: () => {},
  email: "",
  setEmail: () => {},
  userId: -1,
  setUserId: () => {},
  openModal: false,
  setOpenModal: () => {},
});
