import React from "react";

import IconEdit from "../icons/IconEdit";
import IconTrash from "../icons/IconTrash";

const TableRow = ({ users, handleEditUser, getUserIndex }) => {
  return (
    <>
      {users.map((user) => (
        <tr key={user.id}>
          <td>{user.fullname}</td>
          <td>{user.phoneNumber}</td>
          <td>{user.age}</td>
          <td>{user.email}</td>
          <td>1400,07,23</td>
          <td>
            <button
              className="c-icon-btn c-users__edit-user"
              onClick={() => handleEditUser(user.id)}
            >
              <IconEdit />
            </button>
            <button
              className="c-icon-btn c-users__delete-user"
              onClick={() => getUserIndex(user.id)}
            >
              <IconTrash />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableRow;
