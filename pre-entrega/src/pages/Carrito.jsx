import { Button, Table } from 'react-bootstrap';

const Carrito = ({ carrito, eliminarDelCarrito, limpiarCarrito }) => {
  const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);

  if (carrito.length === 0) {
    return <div className="text-center mt-5"><h4>Tu carrito está vacío</h4></div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Carrito de Compras</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Imagen</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td><img src={item.image} alt={item.title} width="50" /></td>
              <td>${item.price}</td>
              <td>{item.cantidad}</td>
              <td>${(item.price * item.cantidad).toFixed(2)}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => eliminarDelCarrito(item.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-end">
        <h4>Total: ${total.toFixed(2)}</h4>
        <Button variant="secondary" onClick={limpiarCarrito}>Vaciar carrito</Button>{' '}
        <Button variant="success">Finalizar compra</Button>
      </div>
    </div>
  );
};

export default Carrito;
