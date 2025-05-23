import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductList from "../pages/productos/ProductList";


export default function Inicio() {
  
  const user = localStorage.getItem('user');

  return (
    <Container className="text-center mt-5">
      <h1>Bienvenido a Tiendita Online <strong>{user}</strong></h1>
      <p>Tu tienda confiable para ropa y mucho más.</p>
      <ProductList className="product-list-inicio" limit={3}/>
      <Button className='mt-5' variant="primary" as={Link} to="/productos">
        Ver Productos
      </Button>
    </Container>
  );
}
