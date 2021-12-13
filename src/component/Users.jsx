import React, { useContext } from "react";
import { useDispatch } from "react-redux"

import UsersTable from "./UsersTable";

import IconPlus from "../icons/IconPlus";
import { Link } from "react-router-dom";
import { getAllUsers } from './../stateManagement/actions/users';
import { Context } from './../stateManagement/context/Context';


const Users = () => {

  const dispatch = useDispatch();

  const initUsers = () => {
    dispatch(getAllUsers());
  }

  const usersContext = useContext(Context);

  const { clearStates} = usersContext

  return (
    <div className="c-app__col">
      <div className="c-users">
        <div className="c-users__col--head">
          <h1 className="c-users__title">داده ها</h1>
          <div className="c-user__buttons">
            <button
              className="c-btn c-btn__primary--outline"
              onClick={() => initUsers()}
            >
              دریافت اطلاعات از سرور
            </button>
            <Link
              to="/"
              className="c-btn c-btn__primary has-icon"
              onClick={() => clearStates()}
            >
              <IconPlus />
              ساخت اکانت جدید
            </Link>
          </div>
        </div>
          <UsersTable />
      </div>
    </div>
  );
};

export default Users;
