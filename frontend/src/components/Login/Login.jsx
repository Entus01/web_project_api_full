import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn({ handleSignIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            await handleSignIn(email, password);
        } catch (error) {
            setErrorMessage("Correo o contraseña incorrectos. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="sign-in">
            <h1 className="sign-in__title">Inicia sesión</h1>
            <form className="sign-in__form" onSubmit={handleSubmit}>
                <input
                    className="sign-in__input"
                    type="text"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="sign-in__input"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="sign-in__button" type="submit">Inicia sesión</button>
            </form>
            <Link className="sign-in__link" to="/signup">¿Aún no eres miembro? Regístrate aquí</Link>
                    {errorMessage && <p className="sign-in__error">{errorMessage}</p>}
        </div>
    );
}