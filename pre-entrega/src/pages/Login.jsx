import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

export default function Login() {
  
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (usuario.trim() !== '' && contraseña.trim() !== '') {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('user', usuario);
      navigate('/');
    } else {
      alert("Por favor, completa ambos campos.");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: 400 , marginBottom: 215}}>
      <h2>Iniciar sesión</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Entrar</Button>
      </Form>
    </Container>
  );
}
