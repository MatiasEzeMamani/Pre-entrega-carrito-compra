# 🛍️ Tiendita Online

**Tiendita Online** es una aplicación web de e-commerce construida con **React + Vite**. Simula funcionalidades esenciales de una tienda en línea, incluyendo visualización de productos, carrito de compras, autenticación de usuarios y rutas protegidas.

---

## ✨ Características

- ✅ **Listado de Productos**
- ✅ **Detalle del Producto** 
- ✅ **Carrito de Compras**
- ✅ **Inicio y cierre de sesión**
- ✅ **Rutas Protegidas** (productos, administración).
- ✅ **Notificaciones interactivas** (react-toastify).
- ✅ **Diseño Responsivo** usando React-Bootstrap.
- ✅ **Simulación de Compra** con vaciado del carrito.
- 🔒 Página de **Administración**

---

## 🛠️ Tecnologías Utilizadas

- ⚛️ [React.js](https://reactjs.org/)
- ⚡ [Vite](https://vitejs.dev/) – como bundler.
- 🧭 [React Router DOM](https://reactrouter.com/)
- 🎨 [React-Bootstrap](https://react-bootstrap.github.io/)
- 🛎️ [React Toastify](https://fkhadra.github.io/react-toastify/)
- 💾 `localStorage` – para guardar sesión y carrito.
- 🎯 [React Icons](https://react-icons.github.io/react-icons/)
- 🧠 Context API – manejo de estado global.

---

## 📸 Demo

🎯 Podés ver la versión desplegada de la aplicación aquí:  
👉 [https://jade-muffin-fdd80d.netlify.app](https://jade-muffin-fdd80d.netlify.app)

> Deploy realizado en [Netlify](https://www.netlify.com/)

---
# 🚀 Instalación y Uso

## ✅ Requisitos Previos

Asegurate de tener instalado:

- **Node.js** (versión 14 o superior)
- **npm** o **Yarn**

Verificá la instalación ejecutando:

```bash
node -v
npm -v
# o si usás Yarn:
yarn -v
```

---

## 🔧 Pasos
a
### 1. Clonar el repositorio

```bash
git clone https://github.com/MatiasEzeMamani/Pre-entrega-carrito-compra.git
cd Pre-entrega-carrito-compra
```

> ⚠️ Reemplazá `tu-usuario` con tu nombre de usuario real de GitHub.

---

### 2. Instalar las dependencias

```bash
npm install
# o si usás Yarn:
yarn install
```

---

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
# o
yarn dev
```

---

### 4. Abrir en el navegador

Una vez iniciado el servidor, accedé desde tu navegador a:

```
http://localhost:5173
```

(o al puerto que indique Vite en la consola)

---

## 🔐 Credenciales de Acceso (Demo)

Para probar las rutas protegidas y el inicio de sesión:

```
👤 Usuario: admin
🔒 Contraseña: 1234
```

---

## 🌐 API Utilizada

Este proyecto utiliza una API pública simulada para obtener los productos:

- [MockAPI](https://687aa82dabb83744b7ed8e11.mockapi.io/api/products)

> ✅ No requiere configuración adicional. Los productos se cargan automáticamente desde esa URL.
