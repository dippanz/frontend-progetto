import ProfileCard from "../components/ProfileCard/ProfileCard";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getUserByEmail } from "../Services/RESTService";
import { checkLoginCookie } from "../Services/RESTService";
import { cookieTypes } from "../Services/config/rest-service-config";

//todo: implementare modifica nome e cognome

export default function Profile() {
  useEffect(() => {
    document.title = "Profilo";
    getUser()
  }, []);

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [profileData, setProfileData] = useState({});

  //se ricarico la pagina, il contesto viene cancellato. In una SPA non si dovrebbe ricaricare le pagine, ma rileggere il token è una soluzione
  const getUser = async () => {
    const userInfo = checkLoginCookie(cookieTypes.jwt);
    if (userInfo != null) {
      const response = await getUserByEmail(userInfo.email);
      const jsonResponse = await response.json();
      setProfileData(jsonResponse);
    }
  };

  return (
    <>
      <ProfileCard profileData={profileData} setCurrentUser={setCurrentUser} />
    </>
  );
}
