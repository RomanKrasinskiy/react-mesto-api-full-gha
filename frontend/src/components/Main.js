import { useContext } from "react";

import change from "../images/change.png";
import addButton from "../images/add-button.png";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <section className="page__profile profile">
        <div className="profile__caption">
          <img
            className="profile__photo"
            alt="Фото"
            onClick={props.onEditAvatar}
            src={currentUser.avatar}
          />
        </div>

        <h1 className="profile__user-name">{currentUser.name}</h1>
        <p className="profile__about-user">{currentUser.about}</p>
        <button
          className="profile__edit-button edit-button"
          type="button"
          onClick={props.onEditProfile}
        >
          <img className="edit-button__icon" src={change} alt="Редактировать" />
        </button>
        <button
          className="profile__add-button add-button"
          type="button"
          onClick={props.onAddPlace}
        >
          <img className="add-button__icon" src={addButton} alt="Добавить" />
        </button>
      </section>

      <section className="page__elements elements">
        {props.cards.map((card, i) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
          />
        ))}
      </section>
      
    </>
  );
}

export default Main;
