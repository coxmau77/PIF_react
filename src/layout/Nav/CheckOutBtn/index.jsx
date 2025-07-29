import React from 'react'
import styles from './checkoutBtn.module.css';

/**
 * @param {Object} props
 * @param {Array} props.cartItems - Lista de productos en el carrito
 * @param {string} [props.phone] - Número de WhatsApp (sin +, con código país y área)
 * @param {string} [props.saludo] - Mensaje inicial personalizado (sin espacios codificados)
 * @param {string} [props.buttonText] - Texto del botón
 */
function CheckOutBtn({ cartItems = [], phone = '0000000000', saludo = 'Hola que tal, quiero realizar el siguiente pedido:', buttonText = 'Checkout' }) {
    const handleCheckout = () => {
        if (!cartItems.length) return;
        // Formatea cada producto: "Producto x Cantidad = $Total"
        const lines = cartItems.map(item =>
            `${item.title} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`
        );
        // Une con salto de línea (usando %0A para WhatsApp)
        const pedido = lines.join('%0A');
        // Mensaje inicial codificado
        const saludoEncoded = encodeURIComponent(saludo);
        // URL final
        const url = `https://wa.me/549${phone}?text=${saludoEncoded}%0A${pedido}`;
        window.open(url, '_blank');
    };

    return (
        <button className={styles.checkoutBtn} onClick={handleCheckout} disabled={!cartItems.length}>
            <span>{buttonText}</span>
            <i className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
            </i>
        </button>
    )
}

export default CheckOutBtn