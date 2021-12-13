import { getUsers } from "../../services/userService";

export const getAllUsers = () => {
  return async (dispatch) => {
    const { data } = await getUsers();
    dispatch({ type: "INIT", payload: data });
  };
};
