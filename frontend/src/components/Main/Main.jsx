import { useContext } from "react";
import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/NewCard/NewCard.jsx";
import EditProfile from "./components/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/EditAvatar/EditAvatar.jsx";
import Card from "./components/Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main({
  handleOpenPopup,
  handleClosePopup,
  popup,
  cards,
  handleCardLike,
  handleCardDelete,
  handleAddPlaceSubmit,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = {
    title: "Nuevo lugar",
    children: (
      <NewCard
        handleAddPlaceSubmit={handleAddPlaceSubmit}
        handleClosePopup={handleClosePopup}
      />
    ),
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile handleClosePopup={handleClosePopup} />,
  };

  const editAvatarPopup = {
    title: "Actualizar avatar",
    children: <EditAvatar handleClosePopup={handleClosePopup} />,
  };

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="image-container">
          <button
            aria-label="Cambiar imagen de perfil"
            className="image__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          ></button>
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Avatar"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        ></button>
      </section>
      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleCardLike={handleCardLike}
              handleOpenPopup={handleOpenPopup}
              handleCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
