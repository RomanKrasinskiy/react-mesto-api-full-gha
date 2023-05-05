import React from "react";
import CloseIcon from "../images/CloseIcon.svg";

function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div
      className={`popup popup_type_zoom-img ${
        isOpen ? "popup_active" : ""
      }`}
    >
      <section className="popup__zoom-container popup__container-close">
        <button type="button" className="popup__close-button">
          <img
            className="popup__close-ico"
            onClick={onClose}
            src={CloseIcon}
            alt="Закрыть"
          />
        </button>
        <figure className="popup__zoom-container">
          <img
            className="popup__zoom-main-img"
            alt={card ? `Прекрастное место под названием ${card.name}` : ""}
            src={card ? card.link : ""}
          />
          <figcaption className="popup__zoom-caption">
            {card ? card.name : ""}
          </figcaption>
        </figure>
      </section>
    </div>
  );
}

export default ImagePopup;
