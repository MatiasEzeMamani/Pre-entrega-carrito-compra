import { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

const ProductList = ({ category = null, limit = null, agregarAlCarrito, className }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let url = "https://fakestoreapi.com/products";
        if (category) {
            url = `https://fakestoreapi.com/products/category/${category}`;
        }

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Error al cargar los productos.");
                setLoading(false);
            })
    }, [category]);

    if (loading) {
        return <div>Cargando...</div>
    }

    if (error) return <div className="alert alert-danger">{error}</div>;

    const productsToShow = limit ? products.slice(0, limit) : products;

    return (
        <Row className={className}>
            {productsToShow.map((product) => (
                <Col md={4} key={product.id} className="mb-4">
                    <ProductCard
                        product={product}
                        agregarAlCarrito={agregarAlCarrito}
                    />
                </Col>
            ))}
        </Row>
    )
}

export default ProductList;