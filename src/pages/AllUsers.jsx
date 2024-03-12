import { useContext, useEffect, useState } from "react";
import { getAllUsers } from "../Services/RESTService";
import Button from "../components/Button/Button";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { deleteUser } from "../Services/RESTService";
import { updateUser } from "../Services/RESTService";

export default function AllUsers() {
  const { currentUser } = useContext(AuthContext);

  const [allUsers, setAllUsers] = useState([]);

  const [formVisibility, setFormVisibility] = useState(false);

  const [tableVisibility, setTableVisibility] = useState(true);

  const [formData, setFormData] = useState({});

  const [errorText, setErrorText] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    const allUsers = await getAllUsers();
    setAllUsers(allUsers);
  };

  useEffect(() => {
    if (currentUser.nome == "") {
      navigate("/login", { replace: true });
    } else {
      document.title = "Lista utenti";
      fetchData();
    }
  }, []);

  const handleDeleteClick = async (email) => {
    const response = await deleteUser(email);
    if (response == 200) {
      fetchData();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModifyClick = (utente) => {
    setTableVisibility(!tableVisibility);
    setFormVisibility(!formVisibility);
    setFormData({
      id: utente.id,
      nome: utente.nome,
      cognome: utente.cognome,
      email: utente.email,
      idRuolo: "",
    });
  };

  const handleAbortClick = () => {
    setFormVisibility(!formVisibility);
    setTableVisibility(!tableVisibility);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateUser(formData);
    if (response == 200) {
      setFormVisibility(false);
      setTableVisibility(true);
      fetchData();
    } else {
      setErrorText(true);
    }
  };

  if (!currentUser.ruoli.includes("Admin")) {
    return (
      <>
        <div>Non sei autorizzato a visitare questa pagina</div>
        <Link to="/">Torna alla home</Link>
      </>
    );
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {tableVisibility ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      ID
                    </th>
                    <th scope="col" className="text-center">
                      Nome
                    </th>
                    <th scope="col" className="text-center">
                      Cognome
                    </th>
                    <th scope="col" className="text-center">
                      Email
                    </th>
                    <th scope="col" className="text-center">
                      Ruolo
                    </th>
                    <th scope="col" className="text-center">
                      Azioni
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers?.map((user) => (
                    <tr key={user.id}>
                      <th scope="row" className="text-center">
                        {user.id}
                      </th>
                      <td className="text-center">{user.nome}</td>
                      <td className="text-center">{user.cognome}</td>
                      <td className="text-center">{user.email}</td>
                      <td className="text-center">
                        <div className="d-flex flex-column">
                          {user.ruoli.length == 0 ? (
                            <span key={Math.random()}>Discente</span>
                          ) : (
                            user.ruoli.map((ruolo) => (
                              <span key={Math.random()}>{ruolo.tipologia}</span>
                            ))
                          )}
                        </div>
                      </td>
                      <td className="text-center">
                        {!user.ruoli.some((ruolo) => ruolo.tipologia == 'Admin') ? (
                          <>
                            <Button
                              key={Math.random()}
                              className="btn btn-danger me-1"
                              onClick={() => handleDeleteClick(user.email)}
                            >
                              Elimina
                            </Button>
                            <Button
                              key={Math.random()}
                              className="btn btn-warning me-1"
                              onClick={() => handleModifyClick(user)}
                            >
                              Modifica
                            </Button>
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <></>
            )}

            {formVisibility ? (
              <form className="p-3" onSubmit={handleSubmit}>
                <input
                  className="form-control mt-1"
                  disabled
                  name="id"
                  type="text"
                  value={formData.id}
                  onChange={handleInputChange}
                />
                <input
                  className="form-control mt-1"
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleInputChange}
                />
                <input
                  className="form-control mt-1"
                  name="cognome"
                  type="text"
                  value={formData.cognome}
                  onChange={handleInputChange}
                />
                <input
                  className="form-control mt-1"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                  onChange={handleInputChange}
                />
                <select
                  className="form-control mt-1"
                  name="idRuolo"
                  value={formData.idRuolo}
                  onChange={handleInputChange}
                >
                  <option value="">Discente</option>
                  <option value="1">Admin</option>
                  <option value="2">Docente</option>
                </select>
                <button type="submit" className="btn btn-primary mt-1">
                  Applica modifiche
                </button>
                <button
                  type="button"
                  className="btn btn-primary mt-1 ms-1"
                  onClick={handleAbortClick}
                >
                  Annulla
                </button>
                {errorText ? (
                  <div style={{ color: "red" }}>
                    Errore durante la modifica dell&apos; utente
                  </div>
                ) : (
                  <></>
                )}
              </form>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
