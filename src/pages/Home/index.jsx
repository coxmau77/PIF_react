// src/pages/Home/index.jsx
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Home.module.css';

function Home() {
  return (
    <>
      <Helmet>
        <title>Inicio | PIF React</title>
        <meta name="description" content="Bienvenido a PIF React, tu tienda online de productos de calidad. Descubre ofertas y novedades." />
      </Helmet>
    
    <section className={styles.welcomeSection}>
      <h1>¡Bienvenido a nuestra tienda en línea!</h1>
      <p>
        Descubre nuestros productos únicos y las ofertas especiales que tenemos para ti. Estamos comprometidos con la calidad y tu satisfacción.
      </p>
      <button>
        Explorar Productos Ahora
      </button>
    </section>
      <button>
        Comprar Productos Ahora
      </button>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}

export default Home;