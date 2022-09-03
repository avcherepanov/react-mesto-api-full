import React from "react";

function Card({ onCardDelete, onCardLike, card, onCardClick, userContext }) {
  function handleCardClick() {
    onCardClick(card);
  }
  console.log(userContext)
  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card)
  }

  const isOwn = card.owner === userContext._id;
  const cardDeleteButtonClassName = `card__button-card-detele ${
    isOwn ? "card__delete-button_visible" : "card__button-card-detele-hidden"
  }`;
  const isLiked = card.likes.some(i => i === userContext._id);
  const cardLikeButtonClassName = `card__heart ${
    isLiked ? "card__heart_active" : "card__heart"
  }`;

  return (
    <div className="card">
      <button onClick={handleCardDelete} className={cardDeleteButtonClassName}></button>
      <img
        className="card__image"
        alt={card.name}
        src={card.link}
        width="100%"
        onClick={handleCardClick}
      />
      <div className="card__container">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__heartContainer">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
          <span className="card__heartCounter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
