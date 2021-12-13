import React, { useContext } from "react";
import IconClose from "../icons/IconClose";
import { Context } from './../stateManagement/context/Context';

const ModalDialog = () => {

  const modalContext = useContext(Context);

  const {
    openModal,
    cancelDeleteUser,
    handleDeleteUser,
  } = modalContext;

  return (
    <div className={openModal ? "c-modal is-open" : "c-modal"}>
      <div
        role="dialog"
        id="dialog1"
        aria-labelledby="modalDialogLabel"
        aria-modal="true"
        className="c-modal__panel"
      >
        <div className="c-modal__header">
          <h2 id="modalDialogLabel" className="c-modal__header--title">
            حذف ردیف
          </h2>
          <button
            className="c-btn c-modal__close"
            onClick={() => cancelDeleteUser()}
          >
            <IconClose/>
          </button>
        </div>
        <div className="c-modal__content">
          <p>آیا از حذف این ردیف مطمئن هستید؟</p>
        </div>
        <button
          className="c-btn c-btn__primary c-modal__delete-button"
          onClick={() => handleDeleteUser()}
        >
          حذف
        </button>
      </div>
    </div>
  );
};

export default ModalDialog;
