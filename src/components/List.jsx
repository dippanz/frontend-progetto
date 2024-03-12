export default function List({ListType, ...props}){
    return(
        <div>
            <ListType {...props}>
                <li>item</li>
                <li>item</li>
                <li>item</li>
                <li>item</li>
                <li>item</li>
            </ListType>
        </div>
    )
}