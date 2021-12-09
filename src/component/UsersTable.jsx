import React from "react";

import TableRow from "./TableRow";

const UsersTable = ({ users, handleEditUser, getUserIndex }) => {
  return (
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
          getUserIndex={getUserIndex}
        />
      </tbody>
    </table>
  );
};

export default UsersTable;
