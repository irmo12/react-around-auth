import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import FormValidator from "../utils/FormValidator";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import CardDeleter from './CardDeleter';
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditAvatarOpen, setEditAvatarOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isAddPlaceOpen, setAddPlaceOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isDelCardWarnOpen, setDelCardWarnOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  
  function login() {
    
  }

  function register(){
    
  }

  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceOpen(true);
  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleTrashClick(card) {
    setDelCardWarnOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarOpen(false);
    setEditProfileOpen(false);
    setAddPlaceOpen(false);
    setImagePopupOpen(false);
    setDelCardWarnOpen(false);
    setSelectedCard({});
    setIsLoading(false);
  }

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  const [currentUser, setUser] = useState({
    _id: "",
    name: "",
    about: "",
    avatar: "",
  });

  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleUpdateUser(newUser) {
    setIsLoading(true);
    api
      .patchUserInfo(newUser)
      .then((data) => {
        setUser(data);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleChangeProfilePicture({ avatar }) {
    setIsLoading(true);
    api
      .changeAvatar(avatar)
      .then((data) => setUser({ ...currentUser, avatar: data.avatar }))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => setCards(data))
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(selectedCard._id)
      .then(() => {
        setCards(current => current.filter((card) => card._id !== selectedCard._id));
        
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .postNewCard(data)
      .then((res) => setCards([res, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }


  useEffect(() => { 
    const settings = {
      formSelector: ".popup__form",
      inputSelector: ".popup__form-field",
      submitButtonSelector: ".popup__form-submit",
      inactiveButtonClass: "",
      inputErrorClass: "popup__form-field_error",
      errorClass: "popup__form-error-msg_inactive",
    };
  const formValidators = {};
  const enableValidation = (settings) => {
    const formList = Array.from(
      document.querySelectorAll(settings.formSelector)
    );
    formList.forEach((formElement) => {
      const validator = new FormValidator(settings, formElement);

      const formName = formElement.getAttribute("name");

      formValidators[formName] = validator;
      validator.enableValidation();
    });
  }; enableValidation(settings);
},[])
 

  return (
    <BrowserRouter>
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedin={isLoggedIn} />
        <Route path="/signin"><Login onLogin={login}/></Route>
        <Route path='/register'><Register onRegister={register} /></Route> 
        <ProtectedRoute path='/' loggedIn={isLoggedIn}>
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          closeAllPopups={closeAllPopups}
          onTrashClick={handleTrashClick}
          onCardDelete={handleCardDelete}
          onLikeClick={handleCardLike}
          cards={cards}
        />
        <EditProfilePopup
          isOpen={isEditProfileOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        ></EditProfilePopup>
        <AddPlacePopup
          isOpen={isAddPlaceOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleChangeProfilePicture}
          isLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
        <CardDeleter
          isOpen={isDelCardWarnOpen}
          onClose={closeAllPopups}
          onConfirmDelete={handleCardDelete}
          isLoading={isLoading}
        />
        </ProtectedRoute>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
    </BrowserRouter>
  );
}

export default App;
