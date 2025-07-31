import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styles from './ProductList.module.css';
import Button from '../Button';
import ProductDetail from '../ProductDetail';
import ProductDetailLink from './ProductDetailLink';

function ProductList({ addToCart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => console.error(error));
    }, []);

    // Filtrado de productos
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Helmet>
                <title>Productos | PIF React</title>
                <meta name="description" content="Explora nuestra lista de productos, consulta detalles y compra online. Productos de calidad, precios competitivos y envío rápido." />
            </Helmet>
            <h1>Productos</h1>
            <p>Esta es una lista de productos obtenida de la Fake Store API. Puedes ver detalles de cada producto, incluyendo su imagen, título, categoría, calificación, descripción y precio. También puedes comprar los productos haciendo clic en el botón "Comprar ahora".</p>
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Buscar por nombre, categoría o descripción..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ maxWidth: 400 }}
                />
            </div>
            <div className={styles.productList}>
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <ul>
                        {filteredProducts.length === 0 ? (
                            <li>No hay productos que coincidan con la búsqueda.</li>
                        ) : (
                            filteredProducts.map(product => (
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
                            ))
                        )}
                    </ul>
                )}
            </div>
            {selectedProduct && (
                <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            )}
        </>
    );
}

export default ProductList;