// src/pages/Home/index.jsx
import styles from './Home.module.css';

function Home() {
  return (
    <>
    
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
    </>
  );
}

export default Home;