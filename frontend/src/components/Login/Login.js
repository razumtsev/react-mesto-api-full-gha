import React, { useEffect, useState } from "react";

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = evt => setEmail(evt.target.value);
  const handlePasswordChange = evt => setPassword(evt.target.value);

  const handleSubmit = evt => {
    evt.preventDefault();
    props.onLogin({ password, email });
  }

  useEffect(() => { 
    setEmail('');
    setPassword('');
  }, []);

  useEffect(() => {
    props.changeRender('login');
  }, []);

  return (
    <section className="gatekeeper">
      <h2 className="gatekeeper__title">Вход</h2>
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
        <button className="button gatekeeper__submit" type="submit">Войти</button>
      </form>
    </section>
  )
}

export default Login;