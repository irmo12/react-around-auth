import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlaceSubmit,
  isLoading,
}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setLink("");
    setName("");
  }, [isOpen]);

  function onNameChange(e) {
    setName(e.target.value);
  }

  function onLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="addCardPopup"
      heading="New&nbsp;place"
      submitText="Create"
      loadingText="Creating..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <fieldset className="popup__form-inputs">
        <input
          type="text"
          className="popup__form-field"
          placeholder="Title"
          name="placeName"
          required
          maxLength="30"
          id="title"
          value={name}
          onChange={onNameChange}
        />
        <span
          className="popup__form-error-msg popup__form-error-msg_inactive"
          id="placeName"
        />
        <input
          type="url"
          className="popup__form-field"
          placeholder="Image link"
          name="link"
          required
          id="imgLink"
          value={link}
          onChange={onLinkChange}
        />
        <span
          className="popup__form-error-msg popup__form-error-msg_inactive"
          id="link"
        />
      </fieldset>
    </PopupWithForm>
  );
}
