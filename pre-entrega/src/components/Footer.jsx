import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <Container>
        &copy; {new Date().getFullYear()} Estilo Único. Todos los derechos de autor reservados.
      </Container>
    </footer>
  );
}