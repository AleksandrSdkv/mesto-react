import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import DeletedCardPopup from './DeletedCardPopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState('');
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState('');
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState('');
    const [isCardPopupOpen, setisCardPopupOpen] = React.useState('');
    const [isDeletedCardPopupOpen, setIsDeletedCardPopupOpen] = React.useState('');
    const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
    const [currentUser, setCurrentUser] = React.useState({ name: '', link: '' });
    const [cards, setCards] = React.useState([]);
    const [deleteCard, setDeleteCard] = React.useState();
    React.useEffect(() => {
        const initialPromises = Promise.all([
            api.getUserData(),
            api.getUserCards(),
        ]);

        initialPromises
            .then(([data, item]) => {
                setCurrentUser(data);
                setCards(item)

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    React.useEffect(() => {

    })
    function handleCardClick(card) {
        setisCardPopupOpen('popup_opened');
        setSelectedCard(card);
    };

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen('popup_opened');
    };
    function handleDeletedCardClick() {
        setIsDeletedCardPopupOpen('popup_opened');
    };
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen('popup_opened');
    };
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen('popup_opened');
    };
    function closeAllPopups() {
        setisCardPopupOpen('');
        setSelectedCard({ name: '', link: '' })
        setIsEditProfilePopupOpen('');
        setIsAddPlacePopupOpen('');
        setIsEditAvatarPopupOpen('');
        setIsDeletedCardPopupOpen('');
    };
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }


    function handleUpdateUser(dataS) {
        api.setUserData(dataS)
            .then((data) => {
                setCurrentUser(data);
                console.log(dataS)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => closeAllPopups());
    }
    function handleUpdateAvatar(userAvatar) {
        api.setAvatarData(userAvatar)
            .then((userAvatarServer) => {
                setCurrentUser(userAvatarServer)

            })
            .catch((err) => { console.log(err) }).finally(() => closeAllPopups());
    };
    function handleAddPlaceSubmit(card) {
        api.pushNewCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => closeAllPopups())
    }

    function handleDeleteCardId(deleteCard) {
        setDeleteCard(deleteCard);
    }
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then((deletedCard) => {
                setCards((cards) => cards.filter((c) => c._id !== card._id))
            })
            .catch((err) => { console.log(err) }).finally(() => closeAllPopups());
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header />
            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onTrashClick={handleDeletedCardClick}
                onCardDelete={handleDeleteCardId}
            />

            <Footer />
            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
            />
            <DeletedCardPopup
                isOpen={isDeletedCardPopupOpen}
                onClose={closeAllPopups}
                onDeletePlace={handleCardDelete}

                deleteCard={deleteCard}
            />
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar} />
            <ImagePopup
                onClose={closeAllPopups}
                card={selectedCard}
                isOpen={isCardPopupOpen === 'popup_opened'}
            />

        </CurrentUserContext.Provider>
    );
}

export default App;