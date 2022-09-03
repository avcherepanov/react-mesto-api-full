import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { CardsContext } from "../context/CardsContext";
function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  setCards,
  onCardLike,
  onCardDelete,
}) {
  const cards = React.useContext(CardsContext);
  const userContext = React.useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div className="profile__image-wrapper">
            <img
              className="profile__image"
              onClick={onEditAvatar}
              src={userContext.avatar}
              alt={userContext.name}
            />
          </div>
          <div className="profile__intro">
            <div className="profile__box">
              <h1 className="profile__title">{userContext.name}</h1>
              <button
                className="profile__botton-edit"
                onClick={onEditProfile}
                type="button"
              ></button>
            </div>
            <p className="profile__subtitle">{userContext.about}</p>
          </div>
        </div>
        <button
          className="profile__button-full"
          onClick={onAddPlace}
          type="button"
        ></button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
            userContext={userContext}
            card={card}
            key={card._id}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
