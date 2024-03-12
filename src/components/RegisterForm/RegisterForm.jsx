import { useState, useEffect } from "react";
import css from "./RegisterForm.module.css";
import { Link } from "react-router-dom";
import { registerUser } from "../../Services/RESTService";
import {
  CheckPasswordMatch,
  ValidatePassword,
} from "../../Services/ValidationService";
import {
  regexMatch,
  areValuesMatching,
} from "../../Services/ValidationService";

export default function RegisterForm() {
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });

  const [responseStatus, setResponseStatus] = useState(null);

  const [confirmPassword, setConfirmPassword] = useState("");

  const [valuesMatch, setValuesMatch] = useState(null);

  const [validity, setValidity] = useState(null);

  const handleFocus = () => {
    if (!validity) {
      setValidity(null);
    }
    if (!valuesMatch) {
      setValuesMatch(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword((confirm) => (confirm = e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (CheckPasswordMatch(formData.password, confirmPassword)) {
      setValuesMatch(true);
      if (ValidatePassword(formData.password)) {
        setValidity(true);
        setUsers([...users, formData]);
        const responseStatus = await registerUser(formData);
        setResponseStatus(responseStatus);
      } else {
        setValidity(false);
        setValuesMatch(null);
      }
    } else {
      setValuesMatch(false);
    }
    setFormData({
      nome: "",
      cognome: "",
      email: "",
      password: "",
    });
    setConfirmPassword((confirm) => (confirm = ""));
  };

  useEffect(() => {
    if (users.length > 0) {
      setConfirmPassword((confirm) => (confirm = ""));
    }
  }, [users]);

  const handleResetClick = () => {
    setFormData({
      nome: "",
      cognome: "",
      email: "",
      password: "",
    });
    setConfirmPassword((confirm) => (confirm = ""));
    setValidity(null);
  };

  return (
    <form
      className={`${css.myRegisterFormStyle} bg-light border rounded p-4`}
      onSubmit={handleSubmit}
    >
      <div className="d-flex flex-row justify-content-center">
        <h4>Inserisci i tuoi dati</h4>
      </div>
      <div className="mb-3">
        <input
          name="nome"
          value={formData.nome}
          type="text"
          className="form-control"
          id="firstName"
          placeholder="Nome"
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </div>
      <div className="mb-3">
        <input
          name="cognome"
          value={formData.cognome}
          type="text"
          className="form-control"
          id="lastName"
          placeholder="Cognome"
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </div>
      <div className="mb-3">
        <input
          name="email"
          value={formData.email}
          type="email"
          className="form-control"
          id="email"
          placeholder="Indirizzo email"
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </div>
      <div className="mb-3">
        <input
          name="password"
          value={formData.password}
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </div>
      <div className="mb-3">
        <input
          name="confirmPassword"
          value={confirmPassword}
          type="password"
          className="form-control"
          id="confirmPassword"
          placeholder="Conferma password"
          onChange={handleConfirmPasswordChange}
          onFocus={handleFocus}
        />
      </div>
      {areValuesMatching(valuesMatch)}
      {regexMatch(validity)}
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <button type="submit" className="btn btn-primary my-3">
            Registrati
          </button>
          <button
            type="reset"
            className="btn btn-primary col-12"
            onClick={handleResetClick}
          >
            Reset
          </button>
        </div>
        <Link className={`${css.alreadyRegisteredLink} mt-2`} to="/login">
          Sei già registrato?
        </Link>
        {responseStatus == null && <></>}
        {responseStatus == 201 && (
          <div className="mt-1" style={{ color: "green", textAlign: 'center'  }}>Ti sei registrato correttamente</div>
        )}
        {responseStatus != null && responseStatus != 201 && (
          <div className="mt-1" style={{ color: "red", textAlign: 'center' }}>
            Errore, prova a registrarti di nuovo
          </div>
        )}
      </div>
    </form>
  );
}
