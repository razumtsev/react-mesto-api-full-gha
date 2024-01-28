// глобальные переменные глобального масштаба
export const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
export const profileAvatar = profile.querySelector('.profile__avatar');
export const profileName = profile.querySelector('.profile__name');
export const profileDescription = profile.querySelector('.profile__description');
// глобальные переменные для модального окна редактирования профиля
export const buttonChangeAvatar = profile.querySelector('.profile__overlay');
export const buttonEditProfile = profile.querySelector('.button_type_edit-profile');
export const popupEditProfile = page.querySelector('.popup_type_edit-profile');
export const formEditProfile = page.querySelector('.form_type_edit-profile');
export const inputName = formEditProfile.querySelector('.form__input_type_name');
export const inputDescription = formEditProfile.querySelector('.form__input_type_description');
// глобальные переменные для модального окна добавления карточки
export const buttonAddCard = profile.querySelector('.button_type_add-card');
export const popupAddCard = page.querySelector('.popup_type_add-card');
export const formAddCard = page.querySelector('.form_type_add-card');
export const inputCardName = formAddCard.querySelector('.form__input_type_card-name');
export const inputCardLink = formAddCard.querySelector('.form__input_type_card-link')
// глобальные переменные для модального окна увеличенного изображения
export const popupBigPic = page.querySelector('.popup_type_big-pic');
export const bigPicImage = popupBigPic.querySelector('.big-pic__image');
export const bigPicCaption = popupBigPic.querySelector('.big-pic__caption');
// глобальная переменная - место для монтажа карточек
export const elementsGrid = page.querySelector('.elements__grid');
// глобальная переменная - список форм
export const formsList = page.querySelectorAll('.form');
// глобальная переменная - список попапов
export const popupList = page.querySelectorAll('.popup');

export const cardTemplate = '#card-template';

// конфиг для класса Card
export const configCard = {
  cardSelector: '.card',
  imageSelector: '.card__image',
  captionSelector: '.card__caption',
  likeSelector: '.card__like',
  likeCountSelector: '.card__like-count',
  removeSelector: '.card__remove',
  activeLikeClass: 'card__like_is-active',
  hiddenButtonClass: 'button_is-hidden',
}
// конфиг для класса FormValidator
export const configValidation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_is-inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_is-active',
}
