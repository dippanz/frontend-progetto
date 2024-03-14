import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCourseById,
  subscibeUser,
  unSubscibeUser,
} from "../Services/RESTService";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateCourse, getCorsiByEmailUtente } from "../Services/RESTService";
import { courseCategories } from "../Services/config/rest-service-config";
//import css from "./styles/Corso.module.css";

export default function Corso() {
  const id = useParams();

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const [state, setState] = useState({});

  const [formVisibility, setFormVisibility] = useState(false);

  const [formData, setFormData] = useState({
    id: id.id,
    nomeCorso: "",
    categoria: {
      id: "",
      nomeCategoria: "",
    },
    durata: "",
    descrizioneBreve: "",
    descrizioneCompleta: "",
  });

  // Utilizzo di useMemo per memorizzare il risultato della fetch
  const corsi = useMemo(async () => {
    return await getCorsiByEmailUtente(currentUser.email);
  }, [currentUser.email]);

  // setto lo stato iniziale direttamente dentro useState
  const [isSubscribed, setIsSubscribed] = useState(() => {
    corsi.then((corso) => {
      if (corso.length > 0 && corso.filter((id) => id == formData.id)) {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
      }
    });
  });

  const modifyCategoryId = (categoryName) => {
    
    switch (categoryName) {
      case "FrontEnd":
        setFormData({
          ...formData,
          categoria: {
            id: courseCategories.FrontEnd,
            nomeCategoria: categoryName,
          },
        });
        break;
      case "BackEnd":
        setFormData({
          ...formData,
          categoria: {
            id: courseCategories.BackEnd,
            nomeCategoria: categoryName,
          },
        });
        break;
      case "FullStack":
        setFormData({
          ...formData,
          categoria: {
            id: courseCategories.FullStack,
            nomeCategoria: categoryName,
          },
        });
        break;
      case "CyberSecurity":
        setFormData({
          ...formData,
          categoria: {
            id: courseCategories.CyberSecurity,
            nomeCategoria: categoryName,
          },
        });
        break;
    }
  };

  const handleModifyClick = () => {
    setFormVisibility(!formVisibility);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "categoria") {
      setFormData({ ...formData, categoria: { 
        id: "",
        nomeCategoria: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateCourse(formData);
    setFormData({
      id: id.id,
      nomeCorso: "",
      categoria: {
        id: "",
        nomeCategoria: "",
      },
      durata: "",
      descrizioneBreve: "",
      descrizioneCompleta: "",
    });
    if (response == 200) {
      navigate("/corsi");
    }
  };

  const fetchData = async (id) => {
    const response = await getCourseById(id);
    setState(response);
  };

  useEffect(() => {
    fetchData(id.id);
  }, []);

  useEffect(() => {
    modifyCategoryId(formData.categoria.nomeCategoria);
  }, [formData.categoria.nomeCategoria]);

  const handleSubscribeClick = async () => {
    const response = await subscibeUser({
      emailUtente: currentUser.email,
      idCorso: formData.id,
    });

    if (response.ok) {
      setIsSubscribed(true);
      alert("Subscribe correctly");
    } else {
      alert("Subscribe error");
    }
  };

  const handleUnsubscribeClick = async () => {
    const response = await unSubscibeUser({
      emailUtente: currentUser.email,
      idCorso: formData.id,
    });

    if (response.ok) {
      setIsSubscribed(false);
      alert("Unsubscribe correctly");
    } else {
      alert("Unsubscribe error");
    }
  };

  return (
    <div
      className="containerCorso"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div
        className="card"
        style={{
          width: "18rem",
          margin: "20px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <h5 className="card-title" style={{ textAlign: "center" }}>
          {state.nomeCorso}
        </h5>
        <p className="card-text">{state.descCompleta}</p>
        <p className="card-text">
          <strong>Durata:</strong> {state.durata} ore
        </p>
        {currentUser.ruoli.includes("Docente") ||
        currentUser.ruoli.includes("Admin") ? (
          <button className="btn btn-warning" onClick={handleModifyClick}>
            Modifica
          </button>
        ) : null}

        {
          //controlla se è gia iscritto al corso
          !isSubscribed ? (
            <button
              className="btn btn-success mt-1"
              onClick={handleSubscribeClick}
            >
              Subscribe
            </button>
          ) : (
            <button
              className="btn btn-danger mt-1"
              onClick={handleUnsubscribeClick}
            >
              Unsubscribe
            </button>
          )
        }

        {formVisibility && (
          <form id="formModificaCorso" onSubmit={handleSubmit}>
            <div className="mb-3 mt-5">
              <select
                className="form-select"
                name="categoria"
                required
                value={formData.categoria.nomeCategoria}
                onChange={handleChange}
              >
                <option value="">Seleziona una categoria</option>
                <option value="FrontEnd">FrontEnd</option>
                <option value="BackEnd">BackEnd</option>
                <option value="FullStack">FullStack</option>
                <option value="CyberSecurity">CyberSecurity</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="nomeCorso"
                value={formData.nomeCorso}
                placeholder="Nome corso"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="descrizioneBreve"
                value={formData.descrizioneBreve}
                placeholder="Descrizione breve"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                name="descrizioneCompleta"
                value={formData.descrizioneCompleta}
                placeholder="Descrizione completa"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                name="durata"
                required
                value={formData.durata}
                onChange={handleChange}
              >
                <option value="">Seleziona una durata</option>
                <option value="8">8 ore</option>
                <option value="40">40 ore</option>
                <option value="160">160 ore</option>
                <option value="480">480 ore</option>
                <option value="960">960 ore</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Applica modifiche
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
