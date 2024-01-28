import React, { useEffect, useRef } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditAvatarPopup(props) {

  const avatarRef = useRef();
  
  const handleSubmit = evt => {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm 
        title="Обновить аватар" 
        name="change-avatar" 
        submitButtonContent={props.onLoading ? "Сохранение..." : "Сохранить"} 
        isOpen={props.isOpen} 
        onClose={props.onClose}
        onSubmit={handleSubmit}>
      <input className="form__input form__input_type_avatar-link" ref={avatarRef} type="url" name="avatar-link" id="avatar-link" minLength="2" placeholder="Ссылка на аватар" required />
      <span className="form__input-error avatar-link-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;