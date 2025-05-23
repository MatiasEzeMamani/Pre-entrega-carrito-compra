import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function Perfil() {

  const { id } = useParams();
  const user = localStorage.getItem('user');

  return (
    <Container className="mt-4">
      <h2>Perfil del Usuario</h2>
      <p>Bienvenido, {user}</p>
      <p>Usuario con ID: {id}</p>
    </Container>
  );
}