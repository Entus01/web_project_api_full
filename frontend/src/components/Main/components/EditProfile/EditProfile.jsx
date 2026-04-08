import React from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditProfile({ handleClosePopup }) {
  const { currentUser, handleUpdateUser} = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({ name, about: description });
    handleClosePopup();
  };

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      name="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__name">
        <input
          className="popup__input popup__input_type_name"
          id="profile-name"
          name="profile-name"
          placeholder="Name"
          type="text"
          minLength="1"
          maxLength="40"
          required
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error profile-name-error"></span>
      </label>
      <label className="popup__description">
        <input
          className="popup__input popup__input_type_description"
          id="profile-description"
          name="profile-description"
          placeholder="About me"
          type="text"
          minLength="1"
          maxLength="2000"
          required
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error profile-description-error"></span>
      </label>
      <button
        className="button popup__button"
        type="submit"
      >
        Guardar
      </button>
    </form>
  );
}
