import CloseIcon from "../images/CloseIcon.svg";

function InfoTooltip(props) {
  const textSuccess = "Вы успешно зарегистрировались!";
  const textFailed = "Что-то пошло не так! Попробуйте ещё раз.";
  return (
    <div className={`popup ${props.isOpen ? "popup_active" : ""}`}>
      <section className="popup__container popup__container_tooltip popup__container-close">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        >
          <img
            className="popup__close-ico"
            src={CloseIcon}
            aria-label="Закрыть"
            onClick={props.onClose}
          />
        </button>
        <div className={`popup__form `} onSubmit={props.onSubmit} noValidate>
          <div
            className={
              props.success
                ? "popup__info-img"
                : "popup__info-img popup__info-img_failed"
            }
          ></div>
          <h2 className={`popup__title popup__title_infotooltip`}>
            {props.success ? textSuccess : textFailed}
          </h2>
        </div>
      </section>
    </div>
  );
}

export default InfoTooltip;
