import unionSuccess from "../../images/union-success.svg";
import unionError from "../../images/union-error.svg";

export default function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  if (!isOpen) return null;

  const tooltipImage = isSuccess ? unionSuccess : unionError;
  const tooltipAlt = isSuccess
    ? "Registro exitoso"
    : "Error durante el registro";
  const toolTipMessage = isSuccess    ? "¡Correcto! Ya estás registrado."
    : "Uy, algo salió mal. Por favor, inténtalo de nuevo.";

  return (
    <div
      className="popup"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
          aria-label="Cerrar"
        />
        <img className="popup__info-image" src={tooltipImage} alt={tooltipAlt} />
        <p className="popup__info-message">{toolTipMessage}</p>
      </div>
    </div>
  );
}
// ...existing code...