import React from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditAvatar({ handleClosePopup }) {
  const { currentUser, handleUpdateAvatar } =
    React.useContext(CurrentUserContext);
  const currentUserRef = React.useRef(currentUser.avatar);

  const handleAvatarChange = (e) => {
    currentUserRef.current = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateAvatar({ avatar: currentUserRef.current });
    handleClosePopup();
  };

  return (
    <form
      className="popup__form"
      id="profile-picture-form"
      name="profile-picture-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__link">
        <input
          className="popup__input popup__input_type_url"
          id="avatar-link"
          name="avatar-link"
          placeholder="Enlace a la imagen"
          required
          type="url"
          defaultValue=""
          onChange={handleAvatarChange}
        />
        <span className="popup__error avatar-link-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
