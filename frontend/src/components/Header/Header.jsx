import { Link } from "react-router-dom";

export default function Header(props) {

  return (
    <header className="header">
      <img
        alt="Logotipo Around The U.S."
        className="header__logo"
        src={props.logo}
      />
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            {props.isLoggedIn ? (
              <>
                <p className="header__user-email">{props.userEmail}</p>
                <Link
                  className="header__nav-link"
                  to="/"
                  onClick={props.handleSignOut}
                >
                  Cerrar sesión
                </Link>
              </>
            ) : (
              <>
                <Link className="header__nav-link" to={`/${props.handleRoute}`}>
                  {props.handleRoute === "signin" ? "Iniciar sesión" : "Regístrate"}
                </Link>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
