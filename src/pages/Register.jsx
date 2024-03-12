import css from "./styles/Register.module.css";
import { useEffect } from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import MonoColumnSection from "../components/MonoColumnSection";

export default function Register() {
  useEffect(() => {
    document.title = "Registrati";
  }, []);

  return (
    <>
      <MonoColumnSection
        sectionContainerClasses="container-fluid"
        sectionRowClasses="row flex-row justify-content-center"
        sectionColumnClasses="col-4 d-flex flex-column align-items-center"
      >
        <RegisterForm></RegisterForm>
      </MonoColumnSection>
    </>
  );
}
