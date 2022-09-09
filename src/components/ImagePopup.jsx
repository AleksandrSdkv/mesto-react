export default function ImagePopup(props) {
    const { card, onClose, isOpen } = props;
    return (
        <div className={isOpen ? 'popup popup_type_pic popup_opened' : 'popup popup popup_type_pic'}>
            <figure className="popup__container popup__container_for_pic">
                <button className="popup__button-close popup__button-close_on_pic popup__close" onClick={onClose} type="button" />
                <img src={card.link} className="popup__img" alt={card.name} />
                <figcaption className="popup__caption">{card.name}</figcaption>
            </figure>
        </div>
    )
}   