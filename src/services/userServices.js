import config from "./config.json";
import http from "./httpServices";

export const getUsers = () => {
  return http.get(`${config.fakeapi}/users`);
};

export const getSingleUser = (id) => {
  return http.get(`${config.fakeapi}/users/${id}`);
};

export const registerUser = (user) => {
  return http.post(`${config.fakeapi}/users`, JSON.stringify(user));
};

export const updateUser = (id, userDetail) => {
  return http.put(`${config.fakeapi}/users/${id}`, JSON.stringify(userDetail));
};

export const deleteUser = (id) => {
  return http.delete(`${config.fakeapi}/users/${id}`);
};
