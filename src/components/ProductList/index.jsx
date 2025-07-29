import { useState, useEffect } from 'react';
import styles from './ProductList.module.css';
import Button from '../Button';
import ProductDetail from '../ProductDetail';
import ProductDetailLink from './ProductDetailLink';

function ProductList({ addToCart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);

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
        <>
            <h1>Productos</h1>
            <p>Esta es una lista de productos obtenida de la Fake Store API. Puedes ver detalles de cada producto, incluyendo su imagen, título, categoría, calificación, descripción y precio. También puedes comprar los productos haciendo clic en el botón "Comprar ahora".</p>
            <div className={styles.productList}>
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <ul>
                        {products.map(product => (
                            <li key={product.id}>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setSelectedProduct(product)}
                                />
                                <div>
                                    <h2>
                                        {product.title.split(' ').slice(0, 6).join(' ')}
                                        {product.title.split(' ').length > 6 ? '...' : ''}
                                    </h2>
                                    <span>{product.category}</span> <br />
                                    <span>{product.rating.rate} - ({product.rating.count})</span>
                                    <p>
                                        {product.description.split(' ').slice(0, 12).join(' ')}
                                        {product.description.split(' ').length > 12 ? '...' : ''}
                                    </p>
                                    <p>Precio: ${product.price}</p>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                      <Button
                                        buttonText="Comprar ahora"
                                        onClick={() => addToCart(product)}
                                      />
                                      <ProductDetailLink id={product.id} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        </>
    );
}

export default ProductList;