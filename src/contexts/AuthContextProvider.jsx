import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useOutlet } from "react-router-dom";
import { checkLoginCookie } from "../Services/RESTService";
import { cookieTypes } from "../Services/config/rest-service-config";


export default function AuthContextProvider({children}) {
  const [currentUser, setCurrentUser] = useState({nome:'', cognome:'', email:'', ruoli:[]});

  useEffect(() => {
    const loginInfo = checkLoginCookie(cookieTypes.jwt);
    if (loginInfo != null) {
      setCurrentUser({
        nome: loginInfo.nome,
        cognome: loginInfo.cognome,
        email: loginInfo.email,
        ruoli: loginInfo.ruoli
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  );
}
