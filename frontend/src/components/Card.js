import del from "../images/del.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  return (
    <div className="card">
      <div className="element">
        {isOwn && (
          <button
            className="element__delete"
            onClick={handleDeleteClick}
            type="button"
            aria-label="Удалить"
          >
            <img className="element__delete-ico" src={del} alt="Закрыть" />
          </button>
        )}

        <img
          className="element__photo"
          src={card.link}
          onClick={handleClick}
          alt={card.name}
        />
        <div className="element__place">
          <h2 className="element__name">{card.name}</h2>
          <div className="element__placeLike">
            <button
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
              type="button">
            </button>

            <span className="element__numLike">{card.likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
