import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(item => item._id === currentUser._id);
  const cardLikeButtonClassName = `button card__like ${isLiked && 'card__like_is-active'}`;

  const handleImageClick = () => props.handleCardImageClick(props.card);
  const handleLikeClick = () => props.handleCardLikeClick(props.card);
  const handleTrashcanClick = () => props.handleCardRemoveClick(props.card);

  return (
    <li className="card">
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleImageClick} />
      <h2 className="card__caption overflow-ellipsis">{props.card.name}</h2>
      <div className="card__like-container">
        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} aria-label="поставить или удалить лайк"></button>
        <p className="card__like-count">{props.card.likes.length}</p>
      </div>
      {isOwn && <button className="button card__remove" type="button" onClick={handleTrashcanClick} aria-label="удалить карточку"></button>}
    </li>
  )
}

export default Card;