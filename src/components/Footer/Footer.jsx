import './Footer.css'
import List from "../List"

const listTypes = {
    ordered: "ol",
    unordered: "ul"
}

export default function Footer(){
    return(
        <footer className='myFooterStyle bg-body-tertiary' data-bs-theme="dark" style={{marginTop: "auto"}}>
            <List ListType={listTypes.unordered}></List>
        </footer>
    )
}