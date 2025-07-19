import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import styled from 'styled-components'; 
import { FaShoppingCart } from 'react-icons/fa'; 


const StyledCardTitle = styled(Card.Title)`
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
  height: 3em; /* Altura fija para el título, ajusta si es necesario */
  line-height: 1.5em; /* Asegura un buen espaciado entre líneas */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limita a 2 líneas */
  -webkit-box-orient: vertical;
  color: #333; /* Un color más oscuro para el título */

  &:hover {
    color: var(--bs-primary); /* Cambia de color al pasar el mouse */
  }
`;

const StyledCategoryText = styled(Card.Text)`
  font-size: 0.9em;
  color: var(--bs-secondary); /* Usa un color secundario de Bootstrap */
  text-align: center;
  margin-bottom: 0.25rem; /* Ajuste el margen inferior */
  text-transform: uppercase; /* Opcional: para que la categoría sea en mayúsculas */
`;

const StyledPriceText = styled(Card.Text)`
  font-size: 1.5rem; /* Tamaño de fuente más grande */
  font-weight: bold;
  color: var(--bs-success); /* Un color de éxito para el precio */
  text-align: center;
  margin-top: auto; /* Para empujar el precio hacia abajo si hay espacio */
  margin-bottom: 0.5rem; /* Pequeño margen inferior */
`;


export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuthContext();

  const handleAddToCart = () => {
    if (user) {
      addToCart(product);
      toast.success(`${product.title} agregado al carrito!`, { position: "bottom-right" });
    } else {
      toast.error("Debes iniciar sesión para agregar productos al carrito.", { position: "top-center" });
    }
  };

  return (
    <Card className="h-100 shadow-sm d-flex flex-column" style={{ height: '450px' }}>
      <Link to={`/productos/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', overflow: 'hidden' }}>
          <Card.Img 
            variant="top" 
            src={product.image} 
            alt={product.title} 
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
            onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/200x200?text=No+Img"; }}
          />
        </div>
        
        <Card.Body className="d-flex flex-column flex-grow-1">
          <StyledCardTitle>{product.title}</StyledCardTitle>
          
          <StyledCategoryText>
            Categoría: {product.category}
          </StyledCategoryText>
          
          <Card.Text 
            className="flex-grow-1" 
            style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', fontSize: '0.9em' }}
          >
            {product.description}
          </Card.Text>
          
          <StyledPriceText>${parseFloat(product.price).toFixed(2)}</StyledPriceText>
        </Card.Body>
      </Link> 
      
      <div className="p-2 pt-0">
          <Button 
            variant="primary" 
            onClick={handleAddToCart}
            className="w-100" 
          >
            <FaShoppingCart className="me-2" />
            Agregar al Carrito
          </Button>
      </div>
    </Card>
  );
}