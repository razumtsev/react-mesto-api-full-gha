import { usePopupClose } from "../../hooks/usePopupClose";

function ImagePopup({ card, isOpen, onClose }) {
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup popup_type_big-pic ${isOpen ? 'popup_is-open' : ''}`}>
      <div className="popup__container popup__container_type_image">
        <figure className="big-pic">
          <img className="big-pic__image" src={card.link} alt={card.name} />
          <figcaption className="big-pic__caption overflow-ellipsis">{card.name}</figcaption>
        </figure>
        <button className="button button_type_close" type="button" aria-label="закрыть модальное окно" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup;