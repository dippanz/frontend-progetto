import { useOutlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
//import Footer from "./Footer/Footer"
import SimpleSection from "./SimpleSection";

export default function Layout() {
  const outlet = useOutlet();

  return (
    //layout come componente estremamente riutilizzabile
    <div>
      <Navbar></Navbar>
      <SimpleSection>{outlet}</SimpleSection>
      {/*<Footer></Footer>*/}
    </div>
  );
}
