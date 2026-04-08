export default function NewCard({ handleAddPlaceSubmit, handleClosePopup }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, link } = event.target.elements;

    handleAddPlaceSubmit({ user: name.value, link: link.value });
    handleClosePopup();
  };

  return (
    <form
      className="popup__form"
      id="card-form"
      name="card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__place">
        <input
          className="popup__input popup__input_type_card-name"
          id="name"
          name="name"
          placeholder="Title"
          required
          type="text"
          minLength="1"
          maxLength="30"
        />
        <span className="popup__error card-name-error"></span>
      </label>
      <label className="popup__link">
        <input
          className="popup__input popup__input_type_url"
          id="link"
          name="link"
          placeholder="Image link"
          required
          type="url"
        />
        <span className="popup__error card-link-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Crear
      </button>
    </form>
  );
}
