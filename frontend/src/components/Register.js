import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";
function Register({ setInfoToolTip, onRegister }) {
  const [formParams, setFormParams] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSumbit(e) {
    e.preventDefault();
    onRegister({
      email: formParams.email,
      password: formParams.password,
    })
  }

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <div className="register__container">
        <form onSubmit={handleSumbit} className="register__form">
          <input
            value={formParams.email}
            className="register__input"
            onChange={handleChange}
            name="email"
            type="email"
            id="email"
            placeholder="E-mail"
          />
          <input
            value={formParams.password}
            className="register__input"
            onChange={handleChange}
            name="password"
            type="password"
            id="password"
            placeholder="Пароль"
          />
          <button type="submit" className="register__button">
            Зарегистрироваться
          </button>
          <Link to="/sign-in" className="register__link">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
