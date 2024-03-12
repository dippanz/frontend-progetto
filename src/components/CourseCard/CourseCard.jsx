import css from "./CourseCard.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "../../Services/RESTService";
import { useEffect, useState } from "react";

export default function CourseCard({
  immagineCopertina,
  nomeCorso,
  durata,
  descrizioneBreve,
  currentUser,
  idCategoria,
  fetchData,
}) {

  const navigateTo = useNavigate();

  const [nomeCategoria, setNomeCategoria] = useState("")

  useEffect(() => {
    convertiIdCategoriaInNomeCategoria(idCategoria)
  }, [])

  const handleClick = () => {
    navigateTo(`/corsi/${nomeCorso}`);
  };

  const handleDeleteClick = async () => {
    const response = await deleteCourse(nomeCorso);
    if(response == 200){
      fetchData();
    }
  };

  const convertiIdCategoriaInNomeCategoria = (id) => {
    if(idCategoria == "1"){
      setNomeCategoria("Front-end")
    }else if(idCategoria == "2"){
      setNomeCategoria("Back-end")
    }
  }


  return (
    <div className="d-flex flex-column">
      <div
        className={`card mt-5 shadow ${css.myCourseCard}`}
        onClick={handleClick}
      >
        <img src={immagineCopertina} className="card-img-top" alt="..." />
        <div className="card-body">
          <img src="" alt="" />
          <h4 className="card-title">{nomeCorso}</h4>
          <h4 className="card-title">{nomeCategoria}</h4>
          <h6 className="card-title">{durata} ore</h6>
          <p className="card-text">{descrizioneBreve}</p>
        </div>
      </div>
      {currentUser.ruoli.includes("Admin") ? (
        <Button className="btn btn-danger mt-2" onClick={handleDeleteClick}>
          Elimina
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}
