import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ limpiarCarrito }) {
  const navigate = useNavigate();

  const isAuth = localStorage.getItem('auth') === 'true';

  const cerrarSesion = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('carrito');
    limpiarCarrito();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Tiendita Online</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" >Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            {/* Enlaces que solo se muestran si el usuario está autenticado */}
            {isAuth && (
              <>
                <Nav.Link as={Link} to="/perfil/1">Perfil</Nav.Link>
                <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/carrito"><i className="fas fa-shopping-cart"></i></Nav.Link>
          </Nav>
          <Nav>
            {/* Mostrar botón de login o logout según autenticación */}
            {!isAuth ? (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            ) : (
              <Button variant="outline-light" size="sm" onClick={cerrarSesion}>Cerrar sesión</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}