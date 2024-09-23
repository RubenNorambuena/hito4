import React from 'react';
import NavbarInicio from '../components/NavbarInicio';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Inicio = () => {
  const imagenes = [
    {
      src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.getintopcc.co%2Fwp-content%2Fuploads%2F2018%2F04%2FDrone-TA-674480931.jpg&f=1&nofb=1&ipt=d3ecc9884827f759f116ced223ca775739681cde17926901c5e329547cf55f9a&ipo=image/400x400?text=Imagen+3',
      alt: '',
    },
    {
      src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fempresasiansa.cl%2Finsumos-agricolas%2Fwp-content%2Fuploads%2Fsites%2F3%2F2020%2F02%2Fespeciales-home.jpg&f=1&nofb=1&ipt=86fe73628e1149422504446b9b8e598a343e04040f42ec18f19991f23f4ba2c9&ipo=images/400x400?text=Imagen+2',
      alt: '',
    },
    {
      src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fxpoents.com.br%2Fwp-content%2Fuploads%2F2022%2F12%2Fimage-22.png&f=1&nofb=1&ipt=1ff717a2f3f3db2ac8180f102dcc1adfcb4bbb9144f883ba1732ae218a90c98b&ipo=images/400x400?text=Imagen+3',
      alt: '',
    },
  ];

  return (
    <>
         <Container className="container-inicio d-flex flex-column justify-content-space-around">
         <Container className='container-navbar-inicio'>
        <NavbarInicio />
        <br />
        <h1 className="text-center">Bienvenido a Nuestra Tienda</h1>

        {/* Rejilla con dos columnas */}
        <Row className="mt-6">

          {/* Columna del texto */}
          <Col md={6} className="d-flex align-items-center">
            <div>
              <h1>Sobre Nosotros</h1>
              <p>
                Bienvenido a nuestra tienda, donde ofrecemos una amplia variedad de productos de alta calidad.
                Nuestro objetivo es brindarte la mejor experiencia de compra en línea.
                <br></br>
                Visítanos para descubrir productos innovadores y ofertas exclusivas.
              </p>
            </div>
          </Col>

           {/* Columna del carrusel */}
           <br></br>
           <Col md={6} className="d-flex justify-content-center">
            <Carousel
              style={{
               maxWidth: '100%',
               maxHeight: '400px',
              }}
            >
              {imagenes.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                       className="img-fluid" // Utiliza img-fluid para imágenes responsivas
                       src={img.src}
                       alt={img.alt}
                       style={{
                         height: '400px',  // Ajusta la altura
                         width: '100%',    // Mantén el ancho responsivo
                         borderRadius: '20px',
                       }}
                  />
                  <Carousel.Caption>
                    <h3>{img.alt}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
      </Container>
    </>
  );
};

export default Inicio;


