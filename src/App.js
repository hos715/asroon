import React from "react";
import { Route, Routes } from "react-router";

import ModalDialog from "./component/ModalDialog";
import UserForm from "./component/userForm";
import Users from "./component/Users";

import MainLayout from "./layout/MainLayout";
import UserContext from "./stateManagement/context/userContext";

const App = () => {
  return (
    <UserContext>
      <>
        <MainLayout>
          <Routes>
            <Route path="/" element={<UserForm />} />
            <Route path="/form" element={<Users />} />
            {/* <Route
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
          /> */}
          </Routes>
        </MainLayout>

        <ModalDialog />
      </>
    </UserContext>
  );
};

export default App;
