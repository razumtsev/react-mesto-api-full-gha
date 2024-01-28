import { usePopupClose } from "../../hooks/usePopupClose";

function PopupWithForm(props) {
  usePopupClose(props.isOpen, props.onClose);
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_is-open' : ''}`}>
      <div className="popup__container popup__container_type_form">
        <form className={`form form_type_${props.name}`} name={props.name} onSubmit={props.onSubmit}>
          <h2 className="form__title">{props.title}</h2>
            {props.children}
          <button className="button form__submit-button" type="submit">{props.submitButtonContent}</button>
        </form>
        <button className="button button_type_close" type="button" aria-label="закрыть модальное окно" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;