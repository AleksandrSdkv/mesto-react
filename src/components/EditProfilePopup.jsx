import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
export default function EditProfilePopup(props) {
    const { isOpen, onClose, onUpdateUser } = props

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);


    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            textBtn='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input value={name} onChange={handleChangeName} id="name-input" className="form__input form__input_type_name" type="text" name="name" placeholder="Имя пользователя" required minlength="2" maxlength="40" />
            <span className="name-input-error form__error-message"></span>
            <input value={description} onChange={handleChangeDescription} id="about-input" className="form__input form__input_type_about" type="text" name="about" placeholder="Описание" required minlength="2" maxlength="200" />
            <span className="about-input-error form__error-message"></span>
        </PopupWithForm>
    )
};
