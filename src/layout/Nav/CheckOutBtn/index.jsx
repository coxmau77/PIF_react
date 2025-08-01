import React, { useCallback } from 'react'

/**
 * @param {Object} props
 * @param {Array} props.cartItems - Lista de productos en el carrito
 * @param {string} [props.phone] - Número de WhatsApp (sin +, con código país y área)
 * @param {string} [props.saludo] - Mensaje inicial personalizado (sin espacios codificados)
 * @param {string} [props.buttonText] - Texto del botón
 */


function CheckOutBtn({ cartItems = [], phone = '0000000000', saludo = 'Hola que tal, quiero realizar el siguiente pedido:', buttonText = 'Checkout', clearCart }) {
    const handleCheckout = useCallback(() => {
        if (!cartItems.length) return;
        // Formatea cada producto: "Producto x Cantidad = $Total"
        const lines = cartItems.map(item =>
            `${item.title} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`
        );
        // Calcula el total
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        // Une con salto de línea (usando %0A para WhatsApp)
        const pedido = lines.join('%0A');
        // Información adicional
        const cantidadItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const cantidadProductos = cartItems.length;
        const infoAdicional = `%0A--------------------%0AItems: ${cantidadProductos}%0AProductos: ${cantidadItems}%0ATotal: $${total.toFixed(2)}%0AGracias!`;
        // Mensaje inicial codificado
        const saludoEncoded = encodeURIComponent(saludo);
        // URL final
        const url = `https://wa.me/549${phone}?text=${saludoEncoded}%0A${pedido}${infoAdicional}`;
        window.open(url, '_blank');
        if (typeof clearCart === 'function') clearCart();
    }, [cartItems, phone, saludo, clearCart]);

    return (
        <button  onClick={handleCheckout} disabled={!cartItems.length}>
            <span>{buttonText}</span>
            <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
            </i>
        </button>
    )
}

export default CheckOutBtn