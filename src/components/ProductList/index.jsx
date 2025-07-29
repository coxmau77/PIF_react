import { useState, useEffect } from 'react';
import styles from './ProductList.module.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className={styles.productList}>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            <h2>{product.title}</h2>
                            <p>{product.description}</p>
                            <p>Precio: ${product.price}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProductList;