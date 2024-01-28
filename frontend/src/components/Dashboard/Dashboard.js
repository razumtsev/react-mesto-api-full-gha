import React, { useContext } from 'react';
import { RenderContext } from '../../contexts/RenderContext';
import { Link } from 'react-router-dom';

function Dashboard(props) {
  const isRender = useContext(RenderContext);
  const handleClick = () => {
    props.onSignOut();
  }
  return (
    <>
      {isRender === 'main' && (
        <div className="dashboard">
          <p className="dashboard__email">{props.userEmail}</p>
          <a href="#" className="link dashboard__link dashboard__link_type_exit" onClick={handleClick}>Выйти</a>
        </div>
      )}
      {isRender === 'register' && (
        <div className="dashboard">
          <Link to="/sign-in" className="link dashboard__link">Войти</Link>
        </div>
      )}
      {isRender === 'login' && (
        <div className="dashboard">
          <Link to="/sign-up" className="link dashboard__link">Регистрация</Link>
        </div>
      )}
    </>
  )
}

export default Dashboard;