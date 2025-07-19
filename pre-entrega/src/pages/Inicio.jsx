import { Container, Button } from 'react-bootstrap';
import ProductCarousel from './productos/ProductCarousel';
import { Link } from 'react-router-dom';
import { FaStore, FaBoxOpen } from 'react-icons/fa';

export default function Inicio() {
  return (
    <Container className="text-center mt-5 mb-5">
      <title>Tiendita Online - Inicio</title>

      <h1 className="display-4">
        <FaStore className="me-3" size="1.2em" />
        ¡Bienvenido a Nuestra Tiendita Online!
      </h1>
      <p className="lead">Explora nuestros increíbles productos.</p>

      <Link to="/productos">
        <Button variant="primary" size="lg" className="mt-3 mb-5">
          <FaBoxOpen className="me-2" />Explorar Productos
        </Button>
      </Link>

      <ProductCarousel />
    </Container>
  );
}