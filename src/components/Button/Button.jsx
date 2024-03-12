export default function Button({ children, onClick, ...props }) {
  return (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  );
}
