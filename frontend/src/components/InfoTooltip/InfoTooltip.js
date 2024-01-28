import { usePopupClose } from '../../hooks/usePopupClose';
import success from '../../images/vector-round-check.svg'
import fail from '../../images/vector-round-cross.svg'

function InfoToolTip({ isOpen, onClose, infoMessage }) {
  const image = infoMessage ? success : fail;
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup popup_type_tooltip ${isOpen ? 'popup_is-open' : ''}`}>
      <div className="popup__container popup__container_type_tooltip">
        <figure className="tooltip">
          <img className="tooltip__image" src={image} alt={infoMessage ? "Галка символизирующая успех" : "Крест обозначающий неудачу"} />
          <figcaption className="tooltip__message">{infoMessage ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</figcaption>
        </figure>
        <button className="button button_type_close" type="button" aria-label="закрыть модальное окно" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default InfoToolTip;