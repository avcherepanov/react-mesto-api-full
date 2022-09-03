import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, isOpen, onAddCard }) {

  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddCard({
      title: title,
      link: link,
    });
  }

  React.useEffect(() => {
    setTitle('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="-image"
      title="Новое место"
      isOpen={isOpen}
      button="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            autoFocus
            className="popup__input-name"
            name="text"
            placeholder="Название"
            type="text"
            minLength="2"
            maxLength="30"
            required
            id="card-name-input"
            onChange={handleChangeTitle}
            value={title || ''}
          />
          <span className="popup__input-error card-name-input-error"></span>
          <input
            className="popup__input-name popup__input-name_type_user-job"
            placeholder="Ссылка на картинку"
            name="link"
            type="url"
            required
            id="url-input"
            onChange={handleChangeLink}
            value={link || ''}
          />
          <span className="popup__input-error url-input-error"></span>
        </>
      }
    />
  );
}
export default AddPlacePopup;
