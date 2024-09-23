import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row, Form, Button } from 'react-bootstrap';
import NavbarInicioSesion from '../components/NavbarInicioSesion';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación adicional del correo electrónico
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }

    setLoading(true);

    try {
      const response = await fakeLogin(email, password);
      setLoading(false);

      console.log('Respuesta de fakeLogin:', response); // Debugging

      if (response.success) {
        setUser(response.user); // Guarda al usuario en el contexto global
        navigate('/perfil'); // Redirige al perfil del usuario
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error en fakeLogin:', error); // Debugging
      setError('Ocurrió un error. Intenta nuevamente.');
    }
  };

  // Función para simular la autenticación
  const fakeLogin = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'usuario@example.com' && password === '123456') {
          resolve({ success: true, user: { nombre: 'Usuario Ejemplo', email: 'usuario@example.com' } });
        } else {
          resolve({ success: false });
        }
      }, 1000); // Simula un retardo de 1 segundo
    });
  };

  return (
    <Container>
      <Container className="container-login d-flex flex-column justify-content-space-around">
        <Container>
          <NavbarInicioSesion />
        </Container>
        <Row className="justify-content-center w-100">
          <Col xs={12} md={8} lg={6} className="d-flex justify-content-center">
            <div className="form-container-login d-flex flex-column justify-content-center align-items-center">
              <h2 className="text-center mb-4">Iniciar sesión</h2>
              <Form className="form-login justify-content-center" onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresar contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Ingresando...' : 'Ingresar'}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Login;

