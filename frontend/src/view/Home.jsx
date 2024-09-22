import React from 'react'
import CustomNavbar from '../components/Navbar1'
import Container from 'react-bootstrap/Container';
import { Col, Row ,Form, Button}  from 'react-bootstrap'

function Home() { 
  return (
    <>
    <CustomNavbar/>

    <Container className='container-home d-flex justify-content-center align-items-center' >

    <Container className=" flex-column justify-content-center align-items-center"  >
      <Row>
        <Col className='text-center'>
         <h1 className='text-center'>INOVACIÓN Y TÉCNOLOGIA PARA SUS PROYECTOS</h1>
         <p>
          Los grandes productores ya no aplican agua, fertilizantes, pesticidas y otros insumos 
          “a ojo” o de manera uniforme en el campo. El uso de tecnología agrícola avanzada permite
           aplicar con precisión sólo lo necesario en cada lugar, así como adaptar cuidadosamente el
            tratamiento a cada planta.
         </p>
        </Col>
       </Row>        
    </Container>

    <Container className="form-background d-flex flex-column justify-content-center align-items-center">
      <Row style={{ width: '80%' }}>
        <Col >
       
        <Form className='form-home w-100'>
        <h2 className='text-center'>Crear una cuenta</h2>
          <Form.Group className="mb-2" controlId="formBasicName">
           <Form.Label>Nombre</Form.Label>
            <Form.Control type="name" placeholder="Ingrese nombre" />
             <Form.Text className="text-muted">
             </Form.Text>
          </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Correo eléctronico</Form.Label>
        <Form.Control type="email" placeholder="Ingrese correo" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Ingresar contraseña" />
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicNumber">
        <Form.Label>Fecha de nacimiento (opcional)</Form.Label>
        <Form.Control type="number" placeholder="Ingresar fecha nacimiento" />
      </Form.Group>
<Container className='d-flex justify-content-center'>
<Button  variant="dark" type="submit">
        Registrar
      </Button>
</Container>
     

    </Form>
        </Col>
         </Row>
    </Container>
    </Container>

    </>
  )
}

export default Home