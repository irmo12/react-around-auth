import PopupWithForm from "./PopupWithForm";
import React, { useRef, useEffect } from "react";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
}) {
  const linkInput = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: linkInput.current.value,
    });
  }

  useEffect(() => {
    linkInput.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      heading="Change&nbsp;profile&nbsp;picture"
      submitText="Save"
      loadingText="Saving..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <fieldset className="popup__form-inputs">
        <input
          type="url"
          className="popup__form-field"
          placeholder="Image link"
          name="imageLink"
          required
          id="avatarLink"
          ref={linkInput}
        />
        <span
          className="popup__form-error-msg popup__form-error-msg_inactive"
          id="imageLink"
        />
      </fieldset>
    </PopupWithForm>
  );
}
