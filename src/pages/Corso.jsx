import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../Services/RESTService";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateCourse } from "../Services/RESTService";
import { courseCategories } from "../Services/config/rest-service-config";

export default function Corso() {
  const id = useParams();

  const navigate = useNavigate();

  const {currentUser} = useContext(AuthContext);

  const [state, setState] = useState({});

  const [formVisibility, setFormVisibility] = useState(false);

  const [formData, setFormData] = useState({
    id: id.id,
    nomeCorso: "",
    categoria: {
      nomeCategoria: "",
    },
    durata: '',
    descrizioneBreve: "",
    descrizioneCompleta: "",
    idCategoria:''
  });

  const modifyCategoryId = (categoryName) => {
    switch (categoryName){
      case "FrontEnd":
        setFormData({...formData, idCategoria: courseCategories.FrontEnd})
        break
      case 'BackEnd':
        setFormData({...formData, idCategoria: courseCategories.BackEnd})
        break
      case 'FullStack':
        setFormData({...formData, idCategoria: courseCategories.FullStack})
        break
      case 'CyberSecurity':
        setFormData({...formData, idCategoria: courseCategories.CyberSecurity})
        break
    }
  }

  const handleModifyClick = () => {
    setFormVisibility(!formVisibility);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "categoria") {
      setFormData({ ...formData, categoria: { nomeCategoria: value } });
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
        nomeCategoria: "",
      },
      durata: '',
      descrizioneBreve: "",
      descrizioneCompleta: "",
      idCategoria: ''
    })
    if(response == 200){
      navigate('/corsi')
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
    modifyCategoryId(formData.categoria.nomeCategoria)
  }, [formData.categoria.nomeCategoria])

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div>{state.id}</div>
      <div>{state.nomeCorso}</div>
      <div>{state.descrizioneBreve}</div>
      <div>{state.descrizioneCompleta}</div>
      <div>{state.durata} ore</div>
      {currentUser.ruoli.includes("Docente") ||
      currentUser.ruoli.includes("Admin") ? (
        <>
          <button className="btn btn-warning" onClick={handleModifyClick}>
            Modifica
          </button>
        </>
      ) : (
        <></>
      )}
      {formVisibility ? (
        <form id="formModificaCorso" onSubmit={handleSubmit}>
          <input
            type="text"
            name="id"
            value={formData.id}
            placeholder="id"
            onChange={handleChange}
          />
          <select
            name="categoria"
            form="formModificaCorso"
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
          <input
            type="text"
            name="nomeCorso"
            value={formData.nomeCorso}
            placeholder="nome corso"
            onChange={handleChange}
          />
          <input
            type="text"
            name="descrizioneBreve"
            value={formData.descrizioneBreve}
            placeholder="descrizione breve"
            onChange={handleChange}
          />
          <textarea
            name="descrizioneCompleta"
            value={formData.descrizioneCompleta}
            placeholder="descrizioneCompleta"
            onChange={handleChange}
          />
          <select
            name="durata"
            form="formNuovoCorso"
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
          <button type="submit">applica modifiche</button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
}
