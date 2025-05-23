import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import ProductList from './pages/productos/ProductList';
import Administracion from './pages/Administracion';
import RutaProtegida from './pages/RutaProtegida';
import Carrito from './pages/Carrito';
import AccionesCarrito from './components/AccionesCarrito'; // <-- Importa tu hook

function App() {
  const { carrito, agregarAlCarrito, eliminarDelCarrito, limpiarCarrito } = AccionesCarrito();

  const [showMensaje, setShowMensaje] = useState(false);
  const [productoAgregado, setProductoAgregado] = useState("");

  // Envuelve la función para mostrar mensaje
  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito(producto);
    setProductoAgregado(producto.title);
    setShowMensaje(true);
    setTimeout(() => setShowMensaje(false), 3000);
  };

  return (
    <BrowserRouter>
      <Header limpiarCarrito={limpiarCarrito} />
      {showMensaje && (
        <div className="alert alert-success text-center m-2" role="alert">
          Producto <strong>{productoAgregado}</strong> agregado al carrito.
        </div>
      )}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/productos"
          element={
            <RutaProtegida>
              <ProductList agregarAlCarrito={handleAgregarAlCarrito} />
            </RutaProtegida>
          }
        />
        <Route path="/perfil/:id" element={<RutaProtegida><Perfil /></RutaProtegida>} />
        <Route path="/admin" element={<RutaProtegida><Administracion /></RutaProtegida>} />
        <Route
          path="/carrito"
          element={
            <Carrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} limpiarCarrito={limpiarCarrito} />
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
