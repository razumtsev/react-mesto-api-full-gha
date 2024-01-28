import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = evt => setEmail(evt.target.value);
  const handlePasswordChange = evt => setPassword(evt.target.value);

  const handleSubmit = evt => {
    evt.preventDefault();
    props.onRegister({ password, email });
  }

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  useEffect(() => {
    props.changeRender('register');
  }, []);

  return (
    <section className="gatekeeper">
      <h2 className="gatekeeper__title">Регистрация</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input 
          className="form__input gatekeeper__input"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          minLength="2"
          maxLength="30"
          placeholder="Email"
          required
          />
        <input 
          className="form__input gatekeeper__input"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          minLength="2"
          maxLength="30"
          placeholder="Пароль"
          required
          />
        <button className="button gatekeeper__submit" type="submit">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className="link gatekeeper__link">Уже зарегистрированы? Войти</Link>
    </section>
  )
}

export default Register;