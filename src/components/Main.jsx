import { api } from '../utils/Api'
import React from 'react';
import overlayAvatar from '../image/VectorAvatar.svg';
import Card from './Card';


export default function Main(props) {
    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);


    React.useEffect(() => {

        Promise.all([api.getUserData(), api.getUserCards()])
            .then(([data, item]) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
                setCards(item);
            })
            .catch((err) => { console.log(err) })
    }, [])

    return (
        <main className="content">

            <section className="profile">
                <div className="profile__overlay" onClick={props.onEditAvatar}>
                    <img src={overlayAvatar} className="profile__avatar-eddit" alt="Карандашик" />
                </div>
                <img className="profile__avatar" src={userAvatar} alt="Аватар" style={{ backgroundImage: `url(${userAvatar})` }} />

                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    <p className="profile__about">{userDescription}</p>
                </div>
                <button className="profile__place-button" id="add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section>
                <ul className="element-list" >
                    {cards.map(item => <Card key={item._id} card={item} onCardClick={props.onCardClick} />)}

                </ul>
            </section>

        </main>)
}
