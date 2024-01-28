import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import api from '../utils/Api';
import auth from '../utils/ApiAuth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { InitialCardsContext } from '../contexts/InitialCardsContext';
import { RenderContext } from '../contexts/RenderContext';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import PopupWithForm from './PopupWithForm/PopupWithForm';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';
import ImagePopup from './ImagePopup/ImagePopup';
import InfoToolTip from './InfoTooltip/InfoTooltip';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Login from './Login/Login';
import Register from './Register/Register';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [infoToolTipStatus, setInfoToolTipStatus] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [dataIsUploading, setDataIsUploading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const [isRendered, setIsRendered] = useState('');

  const navigate = useNavigate();

  const getProfileInfo = () => {
    return api.getProfileInfo()
    .then(data => {
      setCurrentUser(data);
    })
    .catch(err => console.log(err))
  }

  const getInitialCards = () => {
    return api.getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getProfileInfo();
    getInitialCards();
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if(jwt) {
      auth.checkToken(jwt)
        .then(res => {
          if(res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
          };
        })
        .then(() => {
          navigate('/');
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn]);

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleCardImageClick = card => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const handleCardLikeClick = card => {
    const isLiked = card.likes.some(item => item._id === currentUser._id);

    const replaceCard = newCard => {
      setCards(nativeCardsArr => nativeCardsArr.map(nativeCard => nativeCard._id === card._id ? newCard : nativeCard));
    }

    if (!isLiked) {
      api.setCardLike(card)
        .then(replaceCard)
        .catch(err => console.log(err))
    } else {
      api.removeCardLike(card)
        .then(replaceCard)
        .catch(err => console.log(err))
    }
  }

  const handleCardRemoveClick = card => {
    const makeArrayWithoutCard = () => {
      return cards.filter(item => item._id !== card._id)
    }

    api.removeCard(card)
      .then(response => {
        if(response.message === 'Пост удалён') setCards(makeArrayWithoutCard);
      })
      .catch(err => console.log(err))
  }

  const handlePopupSubmit = request => {
    setDataIsUploading(true);
    request()
      .then(closeAllPopups)
      .catch(err => console.log(err))
      .finally(() => setDataIsUploading(false))
  }

  const handleUpdateUser = obj => {
    const makeRequest = () => {
      return api.setProfileInfo(obj).then(setCurrentUser)
    }
    handlePopupSubmit(makeRequest);
  }

  const handleAddNewCard = obj => {
    const makeRequest = () => {
      return api.setNewCard(obj).then(obj => setCards([obj, ...cards]))
    }
    handlePopupSubmit(makeRequest);
  }

  const handleUpdateAvatar = obj => {
    const makeRequest = () => {
      return api.setNewAvatar(obj).then(setCurrentUser)
    }
    handlePopupSubmit(makeRequest);
  }

  const handleRegisterSubmit = obj => {
    auth.signUp(obj)
      .then(res => {
        if(res !== 400) {
          setInfoToolTipStatus(true);
          setIsInfoToolTipOpen(true);
          navigate('/sign-in')
          return res;
        } else {
          setInfoToolTipStatus(false);
          setIsInfoToolTipOpen(true);
        }
      })
      .catch(err => console.log(err));
  }

  const handleLoginSubmit = obj => {
    auth.signIn(obj)
      .then(res => {
        if(res !== 400 && res !== 401) {
          setUserEmail(obj.email);
          setLoggedIn(true);
          navigate('/');
          return res;
        } else {
          setIsInfoToolTipOpen(true);
          setInfoToolTipStatus(false);
          return null;
        }
      })
      .then(data => localStorage.setItem('jwt', JSON.stringify(data)))
      .catch(err => console.log(err));
  }

  const handleChangeRender = componentName => {
    setIsRendered(componentName);
  }

  const handleSignOut = () => {
    localStorage.clear('jwt');
    navigate('/sign-in');
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <InitialCardsContext.Provider value={cards}>
        <RenderContext.Provider value={isRendered}>
          <div className="root">
            <div className="page">
              
              <Header 
                userEmail={userEmail} 
                onSignOut={handleSignOut} />
              <Routes>
                <Route path="/" element={loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/sign-in" replace />} />
                <Route path="/main" element={<ProtectedRoute element={Main} 
                  loggedIn={loggedIn}
                  onEditAvatar={handleEditAvatarClick} 
                  onEditProfile={handleEditProfileClick} 
                  onAddPlace={handleAddPlaceClick}
                  cards={cards}
                  changeRender={handleChangeRender}
                  handleCardImageClick={handleCardImageClick}
                  handleCardLikeClick={handleCardLikeClick}
                  handleCardRemoveClick={handleCardRemoveClick} />} />
                <Route path="/sign-in" element={<Login 
                  onLogin={handleLoginSubmit}
                  changeRender={handleChangeRender} />} />
                <Route path="/sign-up" element={<Register 
                  onRegister={handleRegisterSubmit}
                  changeRender={handleChangeRender} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Footer />

              <EditProfilePopup 
                isOpen={isEditProfilePopupOpen} 
                onUpdateUser={handleUpdateUser} 
                onClose={closeAllPopups} 
                onLoading={dataIsUploading}
                />
              <AddPlacePopup 
                isOpen={isAddPlacePopupOpen}
                onAddNewCard={handleAddNewCard}
                onClose={closeAllPopups}
                onLoading={dataIsUploading}
                />
              <EditAvatarPopup 
                isOpen={isEditAvatarPopupOpen} 
                onUpdateAvatar={handleUpdateAvatar} 
                onClose={closeAllPopups}
                onLoading={dataIsUploading}
                />
              <PopupWithForm 
                title="Вы уверены?" 
                name="remove-card" 
                submitButtonContent="Да" 
                onClose={closeAllPopups}
                />
              <ImagePopup 
                card={selectedCard} 
                isOpen={isImagePopupOpen}
                onClose={closeAllPopups}
                />
              <InfoToolTip
                infoMessage={infoToolTipStatus}
                isOpen={isInfoToolTipOpen}
                onClose={closeAllPopups}
                />

            </div>
          </div>
        </RenderContext.Provider>
      </InitialCardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;