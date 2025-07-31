// src/layout/Nav/CartAside/index.jsx

import React from 'react';
import RemoveButton from '../RemoveButton';
import DeleteCartBtn from '../DeleteCartBtn';
import CheckOutBtn from '../CheckOutBtn';

export default function index({ open, onClose, asideRef, cartItems, updateCartItemQuantity, removeFromCart, clearCart }) {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <aside
            ref={asideRef}
            className={`offcanvas offcanvas-end custom-cart-aside ${open ? 'show' : ''}`}
            tabIndex={-1}
            style={{ width: 380, zIndex: 1050, pointerEvents: open ? 'auto' : 'none' }}
            aria-modal="true"
            role="dialog"
        >
            <div className="offcanvas-header border-bottom">
                <h2 className="offcanvas-title fs-4">Shopping Cart</h2>
                <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="offcanvas-body d-flex flex-column p-3 gap-3">
                <ul className="list-group list-group-flush mb-3">
                    {cartItems.length === 0 && <li className="list-group-item text-center">Tu carrito está vacío</li>}
                    {cartItems.map(item => (
                        <li key={item.id} className="list-group-item d-flex align-items-center gap-2">
                            <img src={item.image} alt={item.title} style={{ width: 60, height: 60, objectFit: 'contain', background: '#e9ecef', borderRadius: 8 }} />
                            <div className="flex-grow-1">
                                <span className="fw-semibold d-block small">
                                    {item.title.split(' ').slice(0, 8).join(' ')}
                                    {item.title.split(' ').length > 8 ? ' ...' : ''}
                                </span>
                                <span className="text-muted">${item.price.toFixed(2)}</span>
                            </div>
                            <div className="d-flex flex-column align-items-center gap-1">
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={e => updateCartItemQuantity(item.id, e.target.value)}
                                    className="form-control form-control-sm text-center"
                                    style={{ width: 48 }}
                                />
                                <RemoveButton onClick={() => removeFromCart(item.id)} />
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="d-flex justify-content-between align-items-center border-top pt-3">
                    <div>
                        <span className="badge bg-secondary me-1">{cartItems.length}</span>
                        <span>items</span>
                    </div>
                    <div>
                        <span className="me-1">Total:</span>
                        <span className="fw-bold">${total.toFixed(2)}</span>
                    </div>
                    <DeleteCartBtn onClick={clearCart} />
                </div>
                <CheckOutBtn cartItems={cartItems} phone={"1169936986"} clearCart={clearCart} />
            </div>
        </aside>
    );
}