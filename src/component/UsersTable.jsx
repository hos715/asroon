import React, { useContext } from "react";
import { useSelector } from "react-redux";

import { Context } from './../stateManagement/context/Context';
import TableRow from "./TableRow";

const UsersTable = () => {

  const users = useSelector(state => state.users)

  const UsersTableContext = useContext(Context);

  const { handleEditUser, getUserId } = UsersTableContext;

  return (
    <>
      {
        users.length > 0 ? (
          <table className="c-users__table">
            <thead>
              <tr>
                <th>نام و نام خانوادگی</th>
                <th>شماره موبایل</th>
                <th>سن</th>
                <th>ایمیل</th>
                <th>تاریخ ایجاد</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              <TableRow
                users={users}
                handleEditUser={handleEditUser}
                getUserId={getUserId}
              />
            </tbody>
          </table>
        ) : (
          <h1>هیچ کاربری برای نمایش وجود ندارد</h1>
        )
      }
    </>
  );
};

export default UsersTable;
