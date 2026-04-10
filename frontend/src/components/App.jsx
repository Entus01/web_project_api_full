import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import logo from "../images/logo.svg";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import Main from "./Main/Main.jsx";
import api from "../utils/api.jsx";
import * as auth from "../utils/auth.jsx";
import SignIn from "./Login/Login.jsx";
import SignUp from "./Register/Register.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

const withIsLiked = (card, userId) => ({ ...card, isLiked: card.likes.includes(userId) });

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      auth
        .validateToken(token)
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser(data);
          return Promise.all([api.getUserInfo(), api.getInitialCards()]);
        })
        .then(([userInfo, initialCards]) => {
          setCurrentUser(userInfo);
          setCards(initialCards.map((card) => withIsLiked(card, userInfo._id)));
        })
        .catch((err) => {
          console.error("Sesión inválida:", err);
          setIsLoggedIn(false);
          setCurrentUser({});
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  const handleUpdateUser = (data) => {
    api
      .updateUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error("Error updating user info:", err);
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .updateUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error("Error updating user avatar:", err);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.isLiked;

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? withIsLiked(newCard, currentUser._id) : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
      })
      .catch((error) => console.error(error));
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([withIsLiked(newCard, currentUser._id), ...cards]);
      })
      .catch((err) => {
        console.error("Error adding new card:", err);
      });
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  async function handleSignUp(email, password) {
    await auth.signUp(email, password);
  }

  async function handleSignIn(email, password) {
    const data = await auth.signIn(email, password);
    localStorage.setItem("jwt", data.token);
    const [userInfo, initialCards] = await Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ]);
    setCurrentUser(userInfo);
    setCards(initialCards.map((card) => withIsLiked(card, userInfo._id)));
    setIsLoggedIn(true);
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
  }

  return (
    <div className="page__content">
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
        }}
      >
        <Routes>
          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <>
                  <Header
                    logo={logo}
                    isLoggedIn={isLoggedIn}
                    handleRoute={"signup"}
                  />
                  <SignIn
                    setIsLoggedIn={setIsLoggedIn}
                    handleSignIn={handleSignIn}
                  />
                  <Footer />
                </>
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <>
                  <Header
                    logo={logo}
                    isLoggedIn={isLoggedIn}
                    handleRoute={"signin"}
                    handleSignOut={handleSignOut}
                  />
                  <SignUp
                    handleSignUp={handleSignUp}
                  />
                  <Footer />
                </>
              )
            }
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <div className="page__content">
                    <Header
                      logo={logo}
                      isLoggedIn={isLoggedIn}
                      userEmail={currentUser.email}
                      handleSignOut={handleSignOut}
                    />
                    <Main
                      setIsLoggedIn={setIsLoggedIn}
                      handleCardLike={handleCardLike}
                      handleCardDelete={handleCardDelete}
                      handleOpenPopup={handleOpenPopup}
                      handleClosePopup={handleClosePopup}
                      handleAddPlaceSubmit={handleAddPlaceSubmit}
                      popup={popup}
                      cards={cards}
                    />
                    <Footer />
                  </div>
                </ProtectedRoute>
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
