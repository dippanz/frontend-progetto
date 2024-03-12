export default function SimpleSection({ children }){
    return (
        <div style={{minHeight: "100%", display: "flex", flexDirection: "column" }}>
            {children}
        </div>
    )
}