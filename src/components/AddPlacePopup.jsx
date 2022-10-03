import React from "react";
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {

    const { isOpen, onClose, onAddPlace } = props

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name,
            link,
        });
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    return (
        <PopupWithForm
            name='place'
            title='Новое место'
            textBtn='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input value={name} onChange={handleNameChange} id="place-input" className="form__input form__input_type_name" type="text" name="name" placeholder="Название" required minlength="2" maxlength="30" />
            <span className="place-input-error form__error-message"></span>
            <input value={link} onChange={handleLinkChange} id="url-input" className="form__input form__input_type_about" type="url" name="link" placeholder="Ссылка на картинку" required />
            <span className="url-input-error form__error-message"></span>
        </PopupWithForm>

    )
}