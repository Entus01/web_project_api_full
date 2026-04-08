import { useState } from "react";
import { Link } from "react-router-dom";
import InfoTooltip from "./InfoToolTip.jsx";

export default function SignUp(props) {
  const { handleSignUp } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSignUp(email, password);
      setIsSuccess(true);
      setMessage("¡Correcto! Ya estás registrado.");
    } catch (error) {
      setIsSuccess(false);
      setMessage("Uy, algo salió mal. Por favor, inténtalo de nuevo.");
    }
    setIsTooltipOpen(true);
  };

  return (
    <div className="sign-up">
      <h1 className="sign-up__title">Regístrate</h1>
      <form className="sign-up__form" onSubmit={handleSubmit}>
        <input
          className="sign-up__input"
          type="text"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="sign-up__input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="sign-up__button" type="submit">
          Regístrate
        </button>
      </form>
      <Link className="sign-up__link" to="/signin">
        ¿Ya eres miembro? Inicia sesión aquí
      </Link>
      <InfoTooltip
        isOpen={isTooltipOpen}
        onClose={() => setIsTooltipOpen(false)}
        isSuccess={isSuccess}
        message={message}
      />
    </div>
  );
}
