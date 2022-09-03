import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const input = React.useRef();

  useEffect(() => {
    input.current.value = '';
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: input.current.value,
    });
  }

  return (
    <PopupWithForm
      name="-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      button="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="popup__input-name popup__input-name_type_user-job"
            placeholder="Ссылка на картинку"
            name="profileAvatar"
            type="url"
            required
            id="avatar-input"
            ref={input}
          />
          <span className="popup__input-error avatar-input-error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
