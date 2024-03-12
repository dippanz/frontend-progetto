import css from "./styles/Login.module.css";
import { useContext, useEffect } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import MonoColumnSection from "../components/MonoColumnSection";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const {setCurrentUser} = useContext(AuthContext)

  useEffect(() => {
    document.title = "Accedi";
  }, []);

  return (
    <>
      <MonoColumnSection
        sectionContainerClasses="container-fluid"
        sectionRowClasses="row flex-row justify-content-center"
        sectionColumnClasses="col-md-4 d-flex flex-column align-items-center"
      >
        <LoginForm setCurrentUser={setCurrentUser}></LoginForm>
      </MonoColumnSection>
    </>
  );
}
