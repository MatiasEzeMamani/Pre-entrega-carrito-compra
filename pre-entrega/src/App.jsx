import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import ProductList from './pages/productos/ProductList';
import ProductDetail from './pages/productos/ProductDetail';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Administracion from './pages/Administracion';
import RutaProtegida from './pages/RutaProtegida';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <main style={{ minHeight: 'calc(100vh - 120px)' }}>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/login" element={<Login />} />
              <Route element={<RutaProtegida />}> 
                <Route path="/productos" element={<ProductList />} />
                <Route path="/productos/:id" element={<ProductDetail />} />
                <Route path="/admin" element={<Administracion />} />
                <Route path="/carrito" element={<Carrito />} /> 

              </Route>

            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
        <ToastContainer position="bottom-right" />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;