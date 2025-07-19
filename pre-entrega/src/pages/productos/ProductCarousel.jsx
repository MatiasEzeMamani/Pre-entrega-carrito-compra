import { useEffect, useState } from 'react';
import { Container, Carousel, Spinner, Alert } from 'react-bootstrap';

const PRODUCTS_API_URL = "https://687aa82dabb83744b7ed8e11.mockapi.io/api/products";

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsForCarousel = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${PRODUCTS_API_URL}?limit=6`);
        if (!response.ok) {
          throw new Error(`Error HTTP! estado: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.slice(0, 6));
      } catch (err) {
        console.error("Error al cargar productos para el carrusel:", err);
        setError(`Error al cargar productos destacados: ${err.message}.`);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsForCarousel();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5 mb-5">
        <Spinner animation="border" />
        <p>Cargando productos destacados...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5 mb-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container className="mt-5 mb-5">
        <Alert variant="info">No hay productos destacados para mostrar en el carrusel.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5 text-center">
      <h2 className="mb-4">Nuestros Productos Destacados</h2>
      <Carousel interval={3000} pause="hover" indicators={true} controls={true}>
        {products.map((product) => (
          <Carousel.Item key={product.id}>
            <img
              className="d-block w-100"
              src={product.image}
              alt={product.title}
              style={{ maxHeight: '450px', objectFit: 'contain', background: '#f8f9fa' }}
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/800x450?text=No+Img"; }}
            />
            <Carousel.Caption className="bg-dark bg-opacity-75 p-3 rounded">
              <h3>{product.title}</h3>
              <p>${parseFloat(product.price).toFixed(2)}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}