import React, { useContext, useEffect } from 'react';
import Card from '../Card/Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Main(props) {
  const { name, avatar, about } = useContext(CurrentUserContext);
  const cards = props.cards;

  useEffect(() => {
    props.changeRender('main');
  }, []);

  return (
    <main className="content">
  
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={avatar} alt={name} />
          <button className="profile__overlay" type="button" aria-label="редактировать аватар" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name overflow-ellipsis">{name}</h1>
          <button className="button button_type_edit-profile" type="button" aria-label="редактировать профиль" onClick={props.onEditProfile}></button>
          <p className="profile__description overflow-ellipsis">{about}</p>
        </div>
        <button className="button button_type_add-card" type="button" aria-label="добавить карточку" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="list elements__grid">
          {cards.map(item => (
            <Card
              card={item} 
              key={item._id}
              handleCardImageClick={props.handleCardImageClick}
              handleCardLikeClick={props.handleCardLikeClick}
              handleCardRemoveClick={props.handleCardRemoveClick}
              />
          ))}
        </ul>
      </section>

    </main>
  );
}

export default Main;