
// Botón reutilizable para acciones como 'Comprar ahora'.
export default function Button({ buttonText, onClick, ...props }) {
  return (
    <button type="button" onClick={onClick} {...props}>
      {buttonText}
    </button>
  );
}

