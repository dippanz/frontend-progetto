import { Link } from "react-router-dom";
import { loginUser } from "../../Services/RESTService";
import css from "./LoginForm.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLoginCookie } from "../../Services/RESTService";

export default function LoginForm({ setCurrentUser }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [loginStatus, setLoginStatus] = useState(true);

  const navigateTo = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(formData);
    if (response.status == 200) {
      const jwtToken = await response.json();
      const decoded = setLoginCookie(jwtToken);
      setCurrentUser({
        id: decoded.id,
        nome: decoded.nome,
        cognome: decoded.cognome,
        email: decoded.email,
        ruoli: decoded.ruoli,
      });
      setLoginStatus(true);
      navigateTo("/");
    } else {
      setLoginStatus(false);
    }
  };

  return (
    <form
      className={`${css.myLoginFormStyle} bg-light border rounded p-4`}
      onSubmit={handleSubmit}
    >
      <div className="d-flex flex-row justify-content-center">
        <h4>Accedi</h4>
      </div>

      <div className="mb-3">
        <input
          name="email"
          type="email"
          className="form-control"
          id="email"
          placeholder="Indirizzo email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <input
          name="password"
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className="d-flex flex-column align-items-center">
        <div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
        {!loginStatus ? (
          <div className="mt-1">
            <div style={{ color: "red" }}>Errore durante il login, riprova</div>
          </div>
        ) : (
          <></>
        )}
        <Link className="alreadyRegisteredLink mt-2" to="/registrazione">
          Non sei ancora registrato?
        </Link>
      </div>
    </form>
  );
}
