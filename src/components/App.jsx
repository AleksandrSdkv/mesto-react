import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState('');
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState('');
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState('');
    const [isCardPopupOpen, setisCardPopupOpen] = React.useState('');
    const [selectedCard, setSelectedCard] = React.useState('');


    function handleCardClick(card) {
        setisCardPopupOpen('popup_opened');
        setSelectedCard(card);
    };

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen('popup_opened');
    };
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen('popup_opened');
    };
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen('popup_opened');
    };
    function closeAllPopups() {
        setisCardPopupOpen('');
        setSelectedCard('');
        setIsEditProfilePopupOpen('');
        setIsAddPlacePopupOpen('');
        setIsEditAvatarPopupOpen('');
    };


    return (
        <>
            <Header />
            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
            />

            <Footer />

            <ImagePopup
                onClose={closeAllPopups}
                card={selectedCard}
                isOpen={isCardPopupOpen === 'popup_opened'}
            />
            <PopupWithForm
                name='profile'
                title='Редактировать профиль'
                textBtn='Сохранить'
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
            >
                <input id="name-input" className="form__input form__input_type_name" type="text" name="name" placeholder="Имя пользователя" required minlength="2" maxlength="40" />
                <span className="name-input-error form__error-message"></span>
                <input id="about-input" className="form__input form__input_type_about" type="text" name="about" placeholder="Описание" required minlength="2" maxlength="200" />
                <span className="about-input-error form__error-message"></span>
            </PopupWithForm>

            <PopupWithForm
                name='place'
                title='Новое место'
                textBtn='Создать'
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
            >
                <input id="place-input" className="form__input form__input_type_name" type="text" name="name" placeholder="Название" required minlength="2" maxlength="30" />
                <span className="place-input-error form__error-message"></span>
                <input id="url-input" className="form__input form__input_type_about" type="url" name="link" placeholder="Ссылка на картинку" required />
                <span className="url-input-error form__error-message"></span>
            </PopupWithForm>

            <PopupWithForm
                name='for-avatar'
                title='Обновить аватар'
                textBtn='Сохранить'
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
            >
                <input id="avatar-input" className="form__input form__input_type_about" type="url" name="avatar" placeholder="Ссылка на картинку" required />
                <span className="avatar-input-error form__error-message"></span>
            </PopupWithForm>

            <PopupWithForm
                name='notification'
                title='Вы уверены?'
                textBtn='Да'
            ></PopupWithForm>
        </>
    );
}

export default App;