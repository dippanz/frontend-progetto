import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { deleteCookie } from "../../Services/RESTService";
import { cookieTypes } from "../../Services/config/rest-service-config";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Navbar() {
  //abilito tooltip
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleLogoutClick = () => {
    setCurrentUser({ nome: "", cognome: "", email: "", ruoli: [] });
    deleteCookie(cookieTypes.jwt);
  };

  return (
    <div className="container-fluid p-0">
      <div className="row">
        <div className="col-12 pe-0">
          <nav
            className="navbar navbar-expand-lg bg-body-tertiary myMainNavbar"
            data-bs-theme="dark"
          >
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                Academy
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarNav"
              >
                <div>
                  {currentUser.nome != "" ? (
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <NavLink
                          name="corsi"
                          className={`nav-link ${({
                            isActive,
                            isPending,
                            isTransitioning,
                          }) =>
                            [
                              isPending ? "pending" : "",
                              isActive ? "active" : "",
                              isTransitioning ? "transitioning" : "",
                            ].join(" ")}`}
                          aria-current="page"
                          to="/corsi"
                        >
                          Tutti i corsi
                        </NavLink>
                      </li>
                      {currentUser.ruoli.includes("Admin") ? (
                        <li className="nav-item">
                          <NavLink
                            name="courses"
                            className={`nav-link ${({
                              isActive,
                              isPending,
                              isTransitioning,
                            }) =>
                              [
                                isPending ? "pending" : "",
                                isActive ? "active" : "",
                                isTransitioning ? "transitioning" : "",
                              ].join(" ")}`}
                            aria-current="page"
                            to="/admin/utenti"
                          >
                            Tutti gli utenti
                          </NavLink>
                        </li>
                      ) : (
                        <></>
                      )}
                    </ul>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <ul className="navbar-nav">
                    {currentUser.nome == "" ? (
                      <>
                        <li className="nav-item">
                          <NavLink
                            name="login"
                            className={`nav-link ${({
                              isActive,
                              isPending,
                              isTransitioning,
                            }) =>
                              [
                                isPending ? "pending" : "",
                                isActive ? "active" : "",
                                isTransitioning ? "transitioning" : "",
                              ].join(" ")}`}
                            to="/login"
                          >
                            Login
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            name="registrazione"
                            className={`nav-link ${({
                              isActive,
                              isPending,
                              isTransitioning,
                            }) =>
                              [
                                isPending ? "pending" : "",
                                isActive ? "active" : "",
                                isTransitioning ? "transitioning" : "",
                              ].join(" ")}`}
                            to="/registrazione"
                          >
                            Registrati
                          </NavLink>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="nav-item d-flex flex-row align-items-center me-2">
                          <span className="text-white">
                            Ciao, {currentUser.nome}
                          </span>
                        </li>
                        <li className="nav-item me-2">
                          <NavLink
                            name="profilo"
                            className={`nav-link ${({
                              isActive,
                              isPending,
                              isTransitioning,
                            }) =>
                              [
                                isPending ? "pending" : "",
                                isActive ? "active" : "",
                                isTransitioning ? "transitioning" : "",
                              ].join(" ")}`}
                            to="/utente/profilo"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            data-bs-title="Profilo"
                          >
                            <i className="bi bi-person-fill"></i>
                          </NavLink>
                        </li>
                        <li className="nav-item me-3">
                          <Link
                            name="logout"
                            className="nav-link"
                            onClick={handleLogoutClick}
                            to="/"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            data-bs-title="Logout"
                          >
                            <i className="bi bi-box-arrow-right"></i>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
