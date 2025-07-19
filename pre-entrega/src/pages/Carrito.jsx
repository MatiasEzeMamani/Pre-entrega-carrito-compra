import { Container, Row, Col, Button, Image, ListGroup, Card, Alert } from 'react-bootstrap';
import { useCart } from '../context/CartContext'; 
import { useAuthContext } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify'; 
import { FaCheckCircle } from 'react-icons/fa'; 

export default function Carrito() {
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity, getTotalPrice, clearCart } = useCart();
  const { user } = useAuthContext(); 
  const navigate = useNavigate(); 

  const handleCheckout = () => {

    if (!user) {
      toast.error("Debes iniciar sesión para finalizar tu compra.", { position: "top-center" });
      navigate('/login');
      return; 
    }

    if (cartItems.length === 0) {
      toast.warn("Tu carrito está vacío. Agrega productos antes de comprar.", { position: "top-center" });
      return; 
    }

    toast.success(
      <div>
        <FaCheckCircle className="me-2" />
        ¡Compra realizada con éxito!
        <br />
        Gracias por tu compra.
      </div>,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

    clearCart(); 
    navigate('/'); 
  };

  return (
    <Container className="mt-4 mb-5">
      <h2 className="mb-4">Tu Carrito de Compras</h2>

      {cartItems.length === 0 ? (
        <Alert variant="info" className="text-center py-4">
          Tu carrito está vacío. ¡Explora nuestros productos y agrega algunos!
        </Alert>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex align-items-center py-3">
                  <Image src={item.image} alt={item.title} thumbnail style={{ width: '80px', height: '80px', objectFit: 'contain', marginRight: '15px' }} />
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="mb-1 text-muted">${parseFloat(item.price).toFixed(2)} c/u</p>
                    <div className="d-flex align-items-center">
                      <Button variant="outline-secondary" size="sm" onClick={() => decrementQuantity(item.id)}>-</Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button variant="outline-secondary" size="sm" onClick={() => incrementQuantity(item.id)}>+</Button>
                      <Button variant="danger" size="sm" className="ms-3" onClick={() => removeFromCart(item.id)}>Eliminar</Button>
                    </div>
                  </div>
                  <div className="text-end ms-auto">
                    <h5 className="mb-0">${(parseFloat(item.price) * item.quantity).toFixed(2)}</h5>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="text-center mb-3">Resumen del Carrito</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    Total de ítems: <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center fw-bold fs-5">
                    Total a Pagar: <span>${getTotalPrice().toFixed(2)}</span>
                  </ListGroup.Item>
                </ListGroup>
                <div className="d-grid gap-2 mt-4">
                  <Button variant="primary" size="lg" onClick={handleCheckout}>
                    Comprar Ahora
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={clearCart}>
                    Vaciar Carrito
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}