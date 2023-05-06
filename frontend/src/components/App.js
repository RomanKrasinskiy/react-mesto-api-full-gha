import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import { useEffect, useState } from "react";
import { auth } from "../utils/auth";

import Login from "./Login";
import Register from "./Register";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import PopupConfirmDel from "./PopupConfirmDel";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipStatus, setIsInfoTooltipStatus] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isPopupConfirmDel, setIsPopupConfirmDel] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });

  // useEffect(() => {
  //   tokenCheck();
  //   api
  //     .getInfoProfile()
  //     .then((userData) => {
  //       setCurrentUser(userData);
  //     })
  //     .catch((err) => console.log(`Ошибка: ${err}`));
  // }, []);

  
  // useEffect(() => {
  //   tokenCheck();
  //   api
  //     .getAllCards()
  //     .then((cardsListData) => {
  //       setCards(cardsListData.reverse());
  //     })
  //     .catch((err) => console.log(`Ошибка: ${err}`));
  // }, []);

  useEffect(() => {
    tokenCheck();
  }, [loggedIn])

  useEffect(() => {
    if (!loggedIn) { 
      navigate('/');
      return ;
    }
    Promise.all([api.getInfoProfile(), api.getAllCards()])
      .then(([user, cards]) => {
        setCards(cards.reverse());
        setCurrentUser(user);
      })
      .catch((err) => console.log(err))
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleImagePopupClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsPopupConfirmDel(false);
    setIsInfoTooltipOpen(false);
  }

  function handlePopupAskDel() {
    setIsPopupConfirmDel(true);
    // открываем попап подтверждения удаления карточки
  }
  function handleUpdateAvatar(ownerAvatar) {
    api
      .changeAvatar(ownerAvatar)
      .then((data) => setCurrentUser(data))
      .then(() => closeAllPopups())
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked, currentUser)
      .then((newCard) => {
        setCards((state) =>
          state.map((i) => (i._id === card._id ? newCard : i))
        );
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleCardDelete(card) {
    api
      .delCard(card._id)
      .then(console.log("Delete"))
      .then(() => setCards(cards.filter((item) => item._id !== card._id)))
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((info) => setCurrentUser(info))
      .then(() => closeAllPopups())
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((data) => setCards([data, ...cards]))
      .then(() => closeAllPopups())

      .catch((err) => console.log(err));
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      return;
    } else {
      auth
        .checkToken(jwt)
        .then((res) => {
          setUserEmail(res.email);
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsInfoTooltipStatus(true);
        setIsInfoTooltipOpen(true);
        setTimeout(() => {
          navigate("/");
          setIsInfoTooltipOpen(false);
        }, 2500);
      })
      .catch(() => {
        setIsInfoTooltipStatus(false);
        setIsInfoTooltipOpen(true);
        setTimeout(() => {
          setIsInfoTooltipOpen(false);
        }, 3000);
      });
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((data) => {
        setUserEmail(email);
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        navigate("/");
      })
      .catch(() => {
        setIsInfoTooltipStatus(false);
        setIsInfoTooltipOpen(true);
        setTimeout(() => {
          setIsInfoTooltipOpen(false);
        }, 3000);
      });
  }
  function handleExit() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App page">

        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register
                navLink={"/sign-in"}
                navLinkName={"Войти"}
                onRegister={handleRegister}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                navLink={"/sign-up"}
                navLinkName={"Регистрация"}
                onLogin={handleLogin}
              />
            }
          />
          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            
            <Route
              path="/"
              element={ 
              <>
                <Header userEmail={userEmail} onExit={handleExit} />
                <Main
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleImagePopupClick}
                  onDeleteClick={handlePopupAskDel}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer /> 
              </>
              }
            />
          </Route>
        </Routes>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          success={isInfoTooltipStatus}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <PopupConfirmDel isOpen={isPopupConfirmDel} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
