import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen])

  const handleNameChange = evt => setName(evt.target.value);
  const handleDescriptionChange = evt => setDescription(evt.target.value);
  const handleSubmit = evt => {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description
    })
  }

  return (
    <PopupWithForm 
      title="Редактировать профиль" 
      name="edit-profile" 
      submitButtonContent={props.onLoading ? "Сохранение..." : "Сохранить"} 
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit={handleSubmit}>
        <input 
          className="form__input form__input_type_name" 
          type="text" 
          name="profile-name" 
          id="profile-name"
          value={name || ''} 
          onChange={handleNameChange} 
          minLength="2" 
          maxLength="40" 
          placeholder="Имя пользователя" 
          required />
        <span className="form__input-error profile-name-error form__input-error_is-active"></span>
        <input 
          className="form__input form__input_type_description" 
          type="text" 
          name="profile-description" 
          id="profile-description"
          value={description || ''} 
          onChange={handleDescriptionChange} 
          minLength="2" 
          maxLength="200" 
          placeholder="Дополнительная информация" 
          required />
        <span className="form__input-error profile-description-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;