import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../Services/RESTService";
import { deleteCookie } from "../../Services/RESTService";
import { cookieTypes } from "../../Services/config/rest-service-config";
import { useId } from "react";

export default function ProfileCard({ profileData, setCurrentUser }) {
  const navigate = useNavigate();

  const randId = useId()

  const handleDeleteClick = async () => {
    const response = await deleteUser(email);
    if (response == 200) {
      setCurrentUser({ nome: "", cognome: "", email: "", ruoli: [] });
      deleteCookie(cookieTypes.jwt);
      navigate("/");
    }
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">
          {profileData.nome} {profileData.cognome}
        </h5>
        <h5 className="card-title">{profileData.email}</h5>
        {profileData?.ruoli?.map((ruolo) => (
          <h5 key={randId} className="card-title">{ruolo.tipologia}</h5>
        ))}
        <button className="btn btn-danger" onClick={handleDeleteClick}>
          Elimina
        </button>
      </div>
    </div>
  );
}
