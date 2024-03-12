import { Link } from "react-router-dom"

export default function NotFound(){
    return(
        <>
            <div>Pagina non trovata</div>
            <Link to="/">Torna alla home</Link>
        </>
    )
}