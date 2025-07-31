// src/pages/Home/index.jsx
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Home.module.css';

function Home() {
  return (
    <>
      {/* Helmet eliminado temporalmente por incompatibilidad con React 19 */}
      <p>
        Descubre nuestros productos únicos y las ofertas especiales que tenemos para ti. Estamos comprometidos con la calidad y tu satisfacción.
      </p>
      <button>
        Explorar Productos Ahora
      </button>
      <button>
        Comprar Productos Ahora
      </button>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}

export default Home;