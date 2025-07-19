import { Navbar, Container, Nav, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

import { 
  FaHome, 
  FaBoxOpen, 
  FaUserCog, 
  FaShoppingCart, 
  FaSignInAlt, 
  FaSignOutAlt, 
  FaStore
} from 'react-icons/fa'; 

export default function Header() { 
  const navigate = useNavigate();
  const { user, logout } = useAuthContext(); 
  const { cartCount, clearCart } = useCart();

  const cerrarSesion = () => {
    logout();
    clearCart(); 
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaStore className="me-2" />
          Tiendita Online
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" end>
              <FaHome className="me-2" />Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/productos">
              <FaBoxOpen className="me-2" />Productos
            </Nav.Link>
            {user && ( 
              <>
                {user.role === 'admin' && ( 
                  <Nav.Link as={Link} to="/admin">
                    <FaUserCog className="me-2" />Admin
                  </Nav.Link>
                )}
              </>
            )}
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/carrito">
              <FaShoppingCart className="me-1" />{' '}
              Carrito <Badge bg="secondary" className="ms-1">{cartCount}</Badge>
            </Nav.Link>
          </Nav>
          <Nav>
            {!user ? (
              <Nav.Link as={Link} to="/login">
                <FaSignInAlt className="me-2" />Iniciar sesión
              </Nav.Link>
            ) : ( 
              <Button variant="outline-light" size="sm" onClick={cerrarSesion}>
                <FaSignOutAlt className="me-2" />Cerrar sesión
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}