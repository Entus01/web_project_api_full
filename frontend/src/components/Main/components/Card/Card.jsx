import ImagePopup from "../ImagePopup/ImagePopup.jsx";

export default function Card(props) {
  const { card, handleOpenPopup, handleCardLike, handleCardDelete } = props;
  const { name, link, isLiked } = card;

  const handleImageClick = () => {
    handleOpenPopup({
      title: null,
      children: <ImagePopup name={name} link={link} />,
    });
  };

  const cardLikeButtonClassName = `card__like-button ${isLiked ? "card__like-button_is-active" : ""}`;

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={handleImageClick}
      />
      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={() =>
          handleCardDelete(card)
        }
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like button"
          className={cardLikeButtonClassName}
          type="button"
          onClick={() => handleCardLike(card)}
        />
      </div>
    </li>
  );
}
