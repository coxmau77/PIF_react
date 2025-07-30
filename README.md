# 🛒 PIF_react

PIF_react es una aplicación de e-commerce desarrollada con React y Vite, que simula una tienda online moderna, profesional y responsiva. El proyecto está enfocado en buenas prácticas, modularidad y experiencia de usuario.

## Características principales

- **Catálogo de productos** con navegación dinámica y detalle de cada producto.
- **Carrito de compras** persistente y fácil de usar.
- **Autenticación de usuarios** con roles (usuario y administrador).
- **Rutas protegidas** según el rol: los usuarios solo acceden a lo que les corresponde.
- **Panel de administración** exclusivo para admins.
- **Formulario de contacto** y página de información.
- **Página 404 y acceso denegado** personalizadas, siempre dentro del layout principal.
- **Menú de navegación responsivo** y profesional.


## Simulación de backend con MockAPI

Para simular el alta y gestión de productos, este proyecto utiliza [MockAPI](https://mockapi.io/projects), una herramienta online que permite crear APIs REST falsas de manera sencilla y rápida. Así puedes probar el formulario de carga de productos y las operaciones CRUD sin necesidad de un backend real.

![](https://user-images.githubusercontent.com/1930058/216849130-9d064208-3d7c-462d-9c52-ef4d0d8480b5.png)

- El formulario de productos realiza solicitudes POST a un endpoint de MockAPI configurado para este proyecto.
- Puedes ver y administrar los datos creados desde la interfaz web de MockAPI.
- MockAPI genera automáticamente campos como `id` y `createdAt` para cada producto.



Más información y acceso a la herramienta: [https://mockapi.io/projects](https://mockapi.io/projects)

---

Este proyecto es una base sólida para aprender, practicar o iniciar un e-commerce real con React. Puedes expandirlo fácilmente agregando nuevas funcionalidades, integraciones o estilos.

---

Desarrollado por [coxmau77/PIF_react](https://github.com/coxmau77/PIF_react) · Basado en Vite + React