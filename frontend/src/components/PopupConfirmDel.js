import PopupWithForm from "./PopupWithForm";

function PopupConfirmDel({isOpen, onClose}) {
  return (
    <PopupWithForm
      name="askDel"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Да"
    ></PopupWithForm>
  );
}

export default PopupConfirmDel;
