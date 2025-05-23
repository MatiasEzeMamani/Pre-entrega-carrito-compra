import { Card, Button } from "react-bootstrap";

const ProductCard = ({ product, agregarAlCarrito }) => {
    return (
            <Card className="h-100 d-flex flex-column mt-5">
                <Card.Img variant="top" src={product.image} alt={product.title} className="card-img-top img-fluid" style={{
                    maxHeight: '150px',
                    width: 'auto',
                    objectFit: 'contain',
                    marginBottom: '20px',
                    marginTop: '20px'
                }} />
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                        {product.description.slice(0, 100)} ...
                    </Card.Text>
                    <Card.Text>
                        <strong>${product.price}</strong>
                    </Card.Text>
                    <Button variant="primary" className="btn btn-primary mt-auto" onClick={() => agregarAlCarrito(product)}>Comprar</Button>
                </Card.Body>
            </Card>
    )
}

export default ProductCard;