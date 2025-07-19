import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner, Alert } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaShoppingCart } from 'react-icons/fa';

const PRODUCTS_API_URL = "https://687aa82dabb83744b7ed8e11.mockapi.io/api/products";

export default function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { user } = useAuthContext();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${PRODUCTS_API_URL}/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("No se pudo cargar la información del producto.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (user) {
            addToCart(product);
            toast.success(`${product.title} agregado al carrito!`, { position: "bottom-right" });
        } else {
            toast.error("Debes iniciar sesión para agregar productos al carrito.", { position: "top-center" });
        }
    };

    if (loading) {
        return <Container className="text-center mt-5"><Spinner animation="border" /><p>Cargando detalles del producto...</p></Container>;
    }

    if (error) {
        return <Container className="mt-5"><Alert variant="danger" className="text-center">{error}</Alert></Container>;
    }

    if (!product) {
        return <Container className="mt-5"><Alert variant="info" className="text-center">Producto no encontrado.</Alert></Container>;
    }

    return (
        <Container className="my-5">
                <title>{product.title} | Tiendita Online</title>
                <meta name="description" content={product.description?.substring(0, 160) + "..."} />
                <meta name="keywords" content={`${product.title}, ${product.category}, comprar, online`} />
                <meta property="og:title" content={product.title} />
                <meta property="og:description" content={product.description?.substring(0, 160) + "..."} />
                <meta property="og:image" content={product.image} />
                <meta property="og:url" content={`https://tu-dominio.com/productos/${product.id}`} />
                <meta property="og:type" content="product" />

            <Row>
                <Col md={6} className="d-flex justify-content-center align-items-center mb-4 mb-md-0">
                    <Image src={product.image} alt={product.title} fluid style={{ maxHeight: '400px', objectFit: 'contain' }} />
                </Col>
                <Col md={6}>
                    <h1>{product.title}</h1>
                    <p className="text-muted">{product.category}</p>
                    <h2 className="text-primary">${parseFloat(product.price).toFixed(2)}</h2>
                    <p>{product.description}</p>
                    <Button variant="primary" size="lg" onClick={handleAddToCart} className="mt-3">
                        <FaShoppingCart className="me-2" />Agregar al Carrito
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}