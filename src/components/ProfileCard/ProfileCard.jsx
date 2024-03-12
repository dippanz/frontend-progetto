import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../Services/RESTService";
import { deleteCookie } from "../../Services/RESTService";
import { cookieTypes } from "../../Services/config/rest-service-config";
import { useId } from "react";
import imageProfile from "../../assets/images/icon-profile.png"
import "./ProfileCard.css"

export default function ProfileCard({ profileData, setCurrentUser }) {
  const navigate = useNavigate();
  
  const handleDeleteClick = async () => {
    const response = await deleteUser(email);
    if (response == 200) {
      setCurrentUser({ nome: "", cognome: "", email: "", ruoli: [] });
      deleteCookie(cookieTypes.jwt);
      navigate("/");
    }
  };

  return (
    <div>
          <div className="containerProfile">
            <div className="containerImageProfile">
              <img src={imageProfile} alt="profile image" />
            </div>

            <div className="containerDataProfile">
              <p>
                <b>First Name:</b> {profileData.nome}{" "}
              </p>
              <p>
                <b>Last Name:</b> {profileData.cognome}
              </p>
              <p>
                <b>Email:</b> {profileData.email}{" "}
              </p>

              <div>
                <p>
                  <b>Ruoli:</b>
                   {profileData?.ruoli?.map((role) => (
                    <span key={role.id != null ? role.id : Math.random()}>
                      {" "}
                      {role.tipologia},
                    </span>
                  ))} 
                </p>
              </div>
            </div>
          </div>
        </div>
  );
}
