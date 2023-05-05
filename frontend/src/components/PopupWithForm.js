import React from "react";
import CloseIcon from "../images/CloseIcon.svg";

function PopupWithForm({name, isOpen, onClose, onSubmit, title, children, buttonText}) {
  return (
    <div
      className={`popup popup_type_${name} ${
        isOpen ? "popup_active" : ""
      }`}
    >
      <section className="popup__container popup__container-close">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        >
          <img
            className="popup__close-ico"
            src={CloseIcon}
            alt="Закрыть"
            onClick={onClose}
          />
        </button>
        <form
          name={`${name}`}
          className={`popup__form popup__form_type_${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          <h3 className={`popup__title popup__title_${name}`}>
            {title}
          </h3>
          {children}
          <button
            className="popup__save-button"
            type="submit"
            value={buttonText}
          >
            {buttonText}
          </button>
        </form>
      </section>
    </div>
  );
}

export default PopupWithForm;
