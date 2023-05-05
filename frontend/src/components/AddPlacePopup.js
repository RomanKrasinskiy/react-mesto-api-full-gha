import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  useEffect(() => {
    setPlaceName("")
    setPlaceLink("")
  }, [isOpen]);
  
  function handlePlaceNameChange(e) {
    setPlaceName(e.target.value);
  }
  function handlePlaceLinkChange(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }


  return (
    <PopupWithForm
      name="add-card"
      title="Новое&nbsp;место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <div className="popup__input-form-item">
        <input
          id="place-name-input"
          className="popup__input popup__input_type_place-name"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          onChange={handlePlaceNameChange}
          value={placeName}
          required
        />
        <span className="popup__input-error place-name-input-error"></span>
      </div>
      <div className="popup__input-form-item">
        <input
          id="place-link-input"
          className="popup__input popup__input_type_place-link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          onChange={handlePlaceLinkChange}
          value={placeLink}
          required
        />
        <span className="popup__input-error place-link-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
