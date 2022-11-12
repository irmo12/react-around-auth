import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      name="editProfile"
      heading="Edit&nbsp;profile"
      submitText="Save"
      loadingText='Saving...'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <fieldset className="popup__form-inputs">
        <input
          type="text"
          className="popup__form-field"
          placeholder="Name"
          name="profileName"
          required
          maxLength="40"
          minLength="2"
          id="name"
          value={name}
          onChange={handleNameChange}
        />
        <span
          className="popup__form-error-msg popup__form-error-msg_inactive"
          id="profileName"
        />
        <input
          type="text"
          className="popup__form-field"
          placeholder="About me"
          name="profileAbout"
          required
          maxLength="200"
          minLength="2"
          id="about"
          value={about}
          onChange={handleAboutChange}
        />
        <span
          className="popup__form-error-msg popup__form-error-msg_inactive"
          id="profileAbout"
        />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
