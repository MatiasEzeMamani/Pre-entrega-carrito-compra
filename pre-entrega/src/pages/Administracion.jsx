import { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Spinner, Alert, Form, Modal, Pagination } from 'react-bootstrap';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEdit, FaTrashAlt, FaPlusSquare } from 'react-icons/fa';

const PRODUCTS_API_URL = "https://687aa82dabb83744b7ed8e11.mockapi.io/api/products";

export default function Administracion() {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);

    const [formErrors, setFormErrors] = useState({});
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const [showProductModal, setShowProductModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchProducts();
        }
    }, [user, navigate]);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(PRODUCTS_API_URL);
            if (!response.ok) {
                throw new Error(`Error HTTP! status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products:", err);
            toast.error(`Error al cargar los productos: ${err.message}.`, { position: "bottom-center" });
            setError(`Error al cargar los productos: ${err.message}.`);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.title.trim()) {
            errors.title = "El nombre es obligatorio.";
        }
        if (parseFloat(formData.price) <= 0 || isNaN(parseFloat(formData.price))) {
            errors.price = "El precio debe ser un número mayor a 0.";
        }
        if (formData.description.trim().length < 10) {
            errors.description = "La descripción debe tener al menos 10 caracteres.";
        }
        if (!formData.category.trim()) {
            errors.category = "La categoría es obligatoria.";
        }
        if (!formData.image.trim()) {
            errors.image = "La URL de la imagen es obligatoria.";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (submitAttempted) {
            setFormErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
        }
    };

    const handleAddOrUpdateProduct = async (e) => {
        e.preventDefault();
        setSubmitAttempted(true);

        if (!validateForm()) {
            toast.error("Por favor, corrige los errores del formulario.", { position: "top-center" });
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing ? `${PRODUCTS_API_URL}/${currentProductId}` : PRODUCTS_API_URL;

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price)
                }),
            });

            if (!response.ok) {
                throw new Error(`Error HTTP! status: ${response.status}`);
            }

            handleCloseProductModal();
            fetchProducts();
            toast.success(`Producto ${isEditing ? 'actualizado' : 'agregado'} con éxito!`, { position: "top-center" });
        } catch (err) {
            console.error("Error al guardar producto:", err);
            toast.error(`Error al ${isEditing ? 'actualizar' : 'agregar'} el producto: ${err.message}.`, { position: "top-center" });
            setError(`Error al ${isEditing ? 'actualizar' : 'agregar'} el producto: ${err.message}.`);
        } finally {
            setLoading(false);
        }
    };

    const handleShowAddProductModal = () => {
        setFormData({ title: '', price: '', description: '', category: '', image: '' });
        setIsEditing(false);
        setCurrentProductId(null);
        setFormErrors({});
        setSubmitAttempted(false);
        setShowProductModal(true);
    };

    const handleEditProduct = (product) => {
        setFormData({
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image
        });
        setIsEditing(true);
        setCurrentProductId(product.id);
        setFormErrors({});
        setSubmitAttempted(false);
        setShowProductModal(true);
    };

    const handleCloseProductModal = () => {
        setShowProductModal(false);
        setFormData({ title: '', price: '', description: '', category: '', image: '' });
        setIsEditing(false);
        setCurrentProductId(null);
        setFormErrors({});
        setSubmitAttempted(false);
    };

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const confirmDeleteProduct = async () => {
        if (!productToDelete) return;

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${PRODUCTS_API_URL}/${productToDelete.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Error HTTP! status: ${response.status}`);
            }
            toast.success("Producto eliminado con éxito!", { position: "top-center" });
            fetchProducts();
        } catch (err) {
            console.error("Error al eliminar producto:", err);
            toast.error(`Error al eliminar el producto: ${err.message}.`, { position: "top-center" });
            setError(`Error al eliminar el producto: ${err.message}.`);
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
            setProductToDelete(null);
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPaginationItems = () => {
        let items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                    {number}
                </Pagination.Item>,
            );
        }
        return items;
    };

    if (!user) {
        return <p className="text-center mt-5">Redirigiendo al login...</p>;
    }

    return (
        <Container className="mt-5 mb-5">
            <Row className="align-items-center mb-4">
                <Col>
                    <h1 className="mb-0">Administración de Productos</h1>
                </Col>
                <Col xs="auto">
                    <Button variant="success" onClick={handleShowAddProductModal}>
                        <FaPlusSquare className="me-2" />Agregar Nuevo Producto
                    </Button>
                </Col>
            </Row>

            {loading && <div className="text-center"><Spinner animation="border" /><p>Cargando productos...</p></div>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            {!loading && !error && products.length === 0 ? (
                <Alert variant="info" className="text-center">No hay productos para administrar.</Alert>
            ) : (
                <>
                    <Table striped bordered hover responsive className="mt-4">
                        <thead>
                            <tr>
                                <th className="text-center">ID</th>
                                <th className="text-center">Imagen</th>
                                <th className="text-center">Nombre</th>
                                <th className="text-center">Precio</th>
                                <th className="text-center">Categoría</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((product) => (
                                <tr key={product.id}>
                                    <td className="text-center">{product.id}</td>
                                    <td className="text-center">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                                            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/50x50?text=No+Img"; }}
                                        />
                                    </td>
                                    <td>{product.title}</td>
                                    <td className="text-center">${parseFloat(product.price).toFixed(2)}</td>
                                    <td className="text-center">{product.category}</td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center">
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => handleEditProduct(product)}
                                            >
                                                <FaEdit className="me-1" />Editar
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDeleteClick(product)}
                                            >
                                                <FaTrashAlt className="me-1" />Eliminar
                                            </Button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {totalPages > 1 && (
                        <Row className="mt-4">
                            <Col className="d-flex justify-content-center">
                                <Pagination>
                                    <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                                    {renderPaginationItems()}
                                    <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                                </Pagination>
                            </Col>
                        </Row>
                    )}
                </>
            )}

            <Modal show={showProductModal} onHide={handleCloseProductModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddOrUpdateProduct}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formTitle">
                                <Form.Label>Nombre del Producto</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleFormChange}
                                    isInvalid={!!formErrors.title && submitAttempted}
                                />
                                {submitAttempted && formErrors.title && <Form.Control.Feedback type="invalid">{formErrors.title}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formPrice">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleFormChange}
                                    isInvalid={!!formErrors.price && submitAttempted}
                                />
                                {submitAttempted && formErrors.price && <Form.Control.Feedback type="invalid">{formErrors.price}</Form.Control.Feedback>}
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleFormChange}
                                isInvalid={!!formErrors.description && submitAttempted}
                            />
                            {submitAttempted && formErrors.description && <Form.Control.Feedback type="invalid">{formErrors.description}</Form.Control.Feedback>}
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formCategory">
                                <Form.Label>Categoría</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleFormChange}
                                    isInvalid={!!formErrors.category && submitAttempted}
                                />
                                {submitAttempted && formErrors.category && <Form.Control.Feedback type="invalid">{formErrors.category}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formImage">
                                <Form.Label>URL de Imagen</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleFormChange}
                                    isInvalid={!!formErrors.image && submitAttempted}
                                />
                                {submitAttempted && formErrors.image && <Form.Control.Feedback type="invalid">{formErrors.image}</Form.Control.Feedback>}
                            </Form.Group>
                        </Row>
                        <div className="d-flex justify-content-end mt-4">
                            <Button variant="secondary" onClick={handleCloseProductModal} className="me-2">
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : (isEditing ? 'Actualizar Producto' : 'Agregar Producto')}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres eliminar el producto **{productToDelete?.title}**?
                    Esta acción no se puede deshacer.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteProduct}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}