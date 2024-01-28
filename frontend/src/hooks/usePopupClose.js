import { useEffect } from "react";

/* eslint-disable */
export function usePopupClose(isOpen, closePopup) {
  useEffect(() => {
    if(!isOpen) return;

    const handleOverlayClick = evt => {
      if(evt.target.classList.contains('popup_is-open')) closePopup();
    }

    const handleEscapeClick = evt => {
      if(evt.key === 'Escape') closePopup();
    }

    document.addEventListener('mousedown', handleOverlayClick);
    document.addEventListener('keydown', handleEscapeClick);

    return () => {
      document.removeEventListener('mousedown', handleOverlayClick);
      document.removeEventListener('keydown', handleEscapeClick);
    }

  }), [isOpen, closePopup];
}