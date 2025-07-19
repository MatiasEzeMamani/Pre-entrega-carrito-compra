import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Pagination } from 'react-bootstrap'; 
import ProductCard from './ProductCard'; 

const PRODUCTS_API_URL = "https://687aa82dabb83744b7ed8e11.mockapi.io/api/products";

export default function ProductList() { 
    const [allProducts, setAllProducts] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8); 
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(PRODUCTS_API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAllProducts(data); 
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("No se pudieron cargar los productos. Por favor, inténtalo de nuevo más tarde.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(allProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container className="mt-5 mb-5">
            <h2 className="text-center mb-4">Nuestros Productos</h2>
            {loading && <div className="text-center"><Spinner animation="border" /><p>Cargando productos...</p></div>}
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            {!loading && !error && allProducts.length === 0 && (
                <Alert variant="info" className="text-center">No hay productos disponibles en este momento.</Alert>
            )}
            
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {!loading && !error && currentProducts.map((product) => ( 
                    <Col key={product.id} className="d-flex">
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>

            {!loading && !error && allProducts.length > productsPerPage && ( 
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item 
                                key={index + 1} 
                                active={index + 1 === currentPage} 
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                        <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
                    </Pagination>
                </div>
            )}
        </Container>
    );
}