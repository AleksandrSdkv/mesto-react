export default function Card(props) {
    const { card, onCardClick } = props

    function handleClick() {
        onCardClick(card);
    }
    return (
        <li className="element">
            <button className="element__btn-remove" type="button"></button>
            <div className="element__group"><img className="element__mask-group" alt={card.name} src={card.link} onClick={handleClick} /></div>
            <h2 className="element__place-name">{card.name}</h2>
            <div className="element__like">
                <button type="button" className="element__like-button"></button>
                <div className="element__like-counter">{card.likes.length}</div>
            </div>
        </li>
    )
}
