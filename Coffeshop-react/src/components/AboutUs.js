import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUs = () => {
    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h1 className="text-center mb-4">Sobre Nosotros</h1>
                    <p className="lead text-center">
                        Somos Gabriel y Priscilla. Creamos un espacio donde cada taza cuenta una historia.
                    </p>
                    <div className="text-center my-4">
                          <img 
                            src="/imagenes/desarrollo.png" 
                            alt="Foto de los creadores" 
                            className="img-fluid rounded shadow" 
                            style={{ maxWidth: '300px' }}
                          />
                    </div>
                    <p className="text-center">
                        Esta página fue desarrollada por Gabriel Palma y Priscilla Pereira.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutUs;