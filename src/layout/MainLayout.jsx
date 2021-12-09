import React from "react";
import { ToastContainer } from "react-toastify";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="c-app">
        <div className="c-app__wrapper">
          <div className="c-app__col">
            <img
              className="c-app--image"
              src="logo.png"
              width="125"
              height="132"
              alt="logo"
            />
            {children}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default MainLayout;
