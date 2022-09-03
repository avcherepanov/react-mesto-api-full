import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { useEffect } from "react";
import api from "../utils/Api";
import { CurrentUserContext } from '../context/CurrentUserContext'
import { CardsContext } from '../context/CardsContext'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import '../styles/App.css';
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth.js';
import Menu from "./Menu";
import InfoToolTip from "./InfoToolTip";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const history = useHistory();

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.err(`Ошибка ${err}`))
}

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((item) => item._id !== card._id))
    })
    .catch((err) => console.err(`Ошибка ${err}`))
  }

  useEffect(() => {
    tokenCheck()
    if (loggedIn) {
      Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([user, cardData]) => {
        setCurrentUser(user);
        setCards(cardData);
      })
      .catch((err) => console.err(`Ошибка ${err}`))
    }
  }, [loggedIn])


  function handleUpdateUser(data) {
    api.editProfile(data.name, data.about)
    .then((userData) => {
      setCurrentUser(userData)
      closeAllPopups()
    })
    .catch((err) => console.err(`Ошибка ${err}`))
  }

  function handleUpdateAvatar(data) {
    api.resetAvatar(data.avatar)
    .then((userData) => {
      setCurrentUser(userData)
      closeAllPopups()
    })
    .catch((err) => console.err(`Ошибка ${err}`))
  }

  function handleAddPlace(title) {
    api.addCard(title.title, title.link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err) => console.err(`Ошибка ${err}`))
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(
    false
  );
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isInfoToolTip, setInfoToolTip] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [userData, setUserData] = React.useState([]);


  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  function handleCardClick(data) {
    setSelectedCard(data);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setInfoToolTip({});
  }

  function handleLogin({ email, password }) {
    return auth.login(email, password)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        tokenCheck();
        return data
      }
    })
    .catch((err) => {
      console.err(`Ошибка... ${err}`)
    })
  }

  function handleRegister({email, password}) {
    return auth.register(email, password)
        .then(() => {
            setInfoToolTip({isOpen: true, status: true, messageText: "Вы успешно зарегистрировались!"})
            history.push('/sign-in');
          })
          .catch((err) => {
            setInfoToolTip({isOpen: true, status: false, messageText: "Что-то пошло не так."})
            console.err(`Ошибка... ${err}`)
          })
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')){
      let jwt = localStorage.getItem('jwt');
      auth.token(jwt).then((res) => {
        if (res){
          console.log(res)
          let userData = {
            email: res.email
          }
          setLoggedIn(true);
          setUserData(userData.email);
          history.push('/');
        }
      })
      .catch((err) => {
        console.err(`Ошибка... ${err}`)
      })
    }
  }

  function signOut(){
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
    <div className="page">
    <Switch>
          <ProtectedRoute
          exact
          path='/'
          loggedIn={loggedIn}>
          <Header>
            <Menu email={userData} signOut={signOut}/>
          </Header>
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            setCards={setCards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          </ProtectedRoute>
          <Route path='/sign-up'>
            <Header>
              <Link className="header__link" to='/sign-in'>Войти</Link>
            </Header>
            <Register setInfoToolTip={setInfoToolTip} onRegister={handleRegister} />
          </Route>
          <Route path='/sign-in'>
            <Header>
              <Link className="header__link" to='/sign-up'>Зарегистрироваться</Link>
            </Header>
            <Login handleLogin={handleLogin}/>
          </Route>
        </Switch>
      <Footer />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlace}/>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoToolTip isOpen={isInfoToolTip.isOpen} config={isInfoToolTip} onClose={closeAllPopups}/>
    </div>
    </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
