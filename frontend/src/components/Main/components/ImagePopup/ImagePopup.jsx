export default function ImagePopup(props) {
  const { name, link} = props;

  return (
    <>
      <img alt="" className="popup__image" src={link} />
      <p className="popup__caption">{name}</p>
    </>
  );
}
