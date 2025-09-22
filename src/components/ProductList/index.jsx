import { useState, useEffect } from 'react';
import styles from './ProductList.module.css';
import Button from '../Button';
import ProductDetailLink from './ProductDetailLink';
import { useCart } from '../Cart/CartContext';

function ProductList() {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
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
            {/* Helmet eliminado temporalmente por incompatibilidad con React 19 */}
            <input
                id="product-search"
                name="product-search"
                type="text"
                className="form-control form-control-lg mb-4"
                placeholder="Buscar por nombre, categoría o descripción..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ maxWidth: 400 }}
            />
            <div className="container">
                {loading ? (
                    <p>Cargando...</p>
                ) : filteredProducts.length === 0 ? (
                    <p>No hay productos que coincidan con la búsqueda.</p>
                ) : (
                    <div className="row g-4">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="col-12 col-md-6 col-lg-4">
                                <div className="card h-100">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="card-img-top"
                                        style={{ objectFit: 'contain', height: 220, background: '#f8f9fa' }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">
                                            {product.title.split(' ').slice(0, 6).join(' ')}
                                            {product.title.split(' ').length > 6 ? '...' : ''}
                                        </h5>
                                        <span className="text-muted small">{product.category}</span>
                                        <span className="text-warning small mb-2">{product.rating.rate} ★ ({product.rating.count})</span>
                                        <p className="card-text">
                                            {product.description.split(' ').slice(0, 12).join(' ')}
                                            {product.description.split(' ').length > 12 ? '...' : ''}
                                        </p>
                                        <p className="fw-bold">Precio: ${product.price}</p>
                                        <div className="mt-auto d-flex gap-2">
                                            <Button
                                                buttonText="Comprar ahora"
                                                onClick={() => addToCart(product)}
                                            />
                                            <ProductDetailLink id={product.id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductList;