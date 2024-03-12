import copertina from "../assets/images/copertina-corso.jpg";
import { useContext, useEffect, useId, useState } from "react";
import MonoColumnSection from "../components/MonoColumnSection";
import ModalForm from "../components/ModalForm";
import CourseCard from "../components/CourseCard/CourseCard";
import {
  getAllCourses,
  createCourse,
  getBearerToken,
} from "../Services/RESTService";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AllCourses() {
  const { currentUser } = useContext(AuthContext);

  const randId = useId();

  const navigate = useNavigate();

  const [corsi, setCorsi] = useState([]);

  const fetchData = async () => {
    const allCourses = await getAllCourses();
    setCorsi(allCourses);
  };

  useEffect(() => {
    if (currentUser.nome == "") {
      navigate("/login", { replace: true });
    } else {
      document.title = "Corsi";
      fetchData();
    }
  }, []);

  const aggiungiCorso = async (corso) => {
    //funzione per creare corso e poi fetch dei corsi
    const response = await createCourse(corso);
    if (response == 200) {
      fetchData();
    }
  };

  return (
    <>
      {currentUser.ruoli.includes("Admin") ||
      currentUser.ruoli.includes("Docente") ? (
        <span>
          <ModalForm aggiungiCorso={aggiungiCorso}></ModalForm>
        </span>
      ) : (
        <></>
      )}

      <MonoColumnSection
        sectionContainerClasses="container-fluid"
        sectionRowClasses="row flex-row justify-content-center"
        sectionColumnClasses="col-md-12 d-flex flex-wrap justify-content-evenly"
      >
        {corsi?.map((course) => (
          <CourseCard
            key={Math.random()}
            immagineCopertina={copertina}
            nomeCorso={course.nomeCorso}
            durata={course.durata}
            descrizioneBreve={course.descrizioneBreve}
            idCategoria={course.idCategoria}
            currentUser={currentUser}
            fetchData={fetchData}
          ></CourseCard>
        ))}
      </MonoColumnSection>
    </>
  );
}
