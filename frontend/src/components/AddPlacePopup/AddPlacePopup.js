import React, { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function AddPlacePopup(props) {
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');

  useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [props.isOpen]);

  const handleCardNameChange = evt => setCardName(evt.target.value);
  const handleCardLinkChange = evt => setCardLink(evt.target.value);

  const handleSubmit = evt => {
    evt.preventDefault();
    props.onAddNewCard({
      name: cardName,
      link: cardLink
    });
  }

  return (
    <PopupWithForm 
      title="Новое место" 
      name="add-card" 
      submitButtonContent={props.onLoading ? "Создание..." : "Создать"} 
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit={handleSubmit}>
        <input 
          className="form__input form__input_type_card-name" 
          type="text" 
          name="card-name" 
          id="card-name"
          value={cardName}
          onChange={handleCardNameChange} 
          minLength="2" 
          maxLength="30" 
          placeholder="Название" 
          required />
        <span className="form__input-error card-name-error"></span>
        <input 
          className="form__input form__input_type_card-link" 
          type="url" 
          name="card-link" 
          id="card-link"
          value={cardLink}
          onChange={handleCardLinkChange} 
          minLength="2" 
          placeholder="Ссылка на картинку" 
          required />
        <span className="form__input-error card-link-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
