import React from "react";

import UsersTable from "./UsersTable";

import IconPlus from "../icons/IconPlus";

const Users = ({ clearInputs, users, handleEditUser, getUserIndex }) => {
  return (
    <div className="c-app__col">
      <div className="c-users">
        <div className="c-users__col--head">
          <h1 className="c-users__title">داده ها</h1>
          <div className="c-user__buttons">
            <button className="c-btn c-btn__primary--outline">
              دریافت اطلاعات از سرور
            </button>
            <button
              className="c-btn c-btn__primary has-icon"
              onClick={() => clearInputs()}
            >
              <IconPlus />
              ساخت اکانت جدید
            </button>
          </div>
        </div>
        {users.length > 0 ? (
          <UsersTable
            getUserIndex={getUserIndex}
            handleEditUser={handleEditUser}
            users={users}
          />
        ) : (
          <h1>هیچ کاربری برای نمایش وجود ندارد</h1>
        )}
      </div>
    </div>
  );
};

export default Users;
