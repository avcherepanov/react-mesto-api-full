function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup-add-card ${card ? "popup__open" : ""}`}>
      <div className="popup__container-image">
        <img className="popup__image" alt={card?.name} src={card?.link} />
        <p className="popup__text">{card?.name}</p>
        <button
          className="popup__botton-close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
