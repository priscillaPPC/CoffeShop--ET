import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const blogPosts = [
    { id: 1, title: '¡Nuevo grano de café rubio!', image: 'grano1.png', summary: 'Hemos lanzado un nuevo café con un sabor especial, ideal para los amantes de los sabores brillantes.', description: 'Hemos importado un grano de café de la más alta calidad, su nombre "brillante Guatemala". Su sabor es una mezcla de notas cítricas y florales, ideal para quienes buscan una experiencia única en cada taza. ¡Una historia de sabor única!' },
    { id: 2, title: 'Consejos para disfrutar tu pastel', image: 'cake1.png', summary: 'Descubre la mejor manera de acompañar nuestros deliciosos pasteles para una experiencia inolvidable.', description: '¿Sabías que el pastel de fresa combina perfectamente con un café helado o un té verde? La dulzura del pastel se complementa con la frescura de la bebida, creando un balance perfecto en tu paladar. Además, recomendamos disfrutarlo en un ambiente relajado para apreciar cada bocado.' }
];

//detalle de un post en el blog
const BlogDetail = ({ post, setView }) => {
    return (
        <Container className="my-5">
            <Button variant="outline-primary" onClick={() => setView(null)} className="mb-4">
                ← Volver a Noticias
            </Button>
            <h1 className="mb-4">{post.title}</h1>
            <img src={`/imagenes/${post.image}`} alt={post.title} className="img-fluid rounded mb-4" style={{ maxWidth: '600px' }} />
            <p className="lead">{post.description}</p>
        </Container>
    );
};


const BlogPage = () => {
    const [selectedPostId, setSelectedPostId] = useState(null);

    if (selectedPostId) {
        const post = blogPosts.find(p => p.id === selectedPostId);
        if (post) {
            return <BlogDetail post={post} setView={setSelectedPostId} />;
        }
    }

    return (
        <Container className="my-5">
            <h1 className="text-center mb-5">Noticias Importantes (Blogs)</h1>
            <Row xs={1} md={2} className="g-4 justify-content-center">
                {blogPosts.map(post => (
                    <Col key={post.id} className="mb-3">
                        <Card className="h-100 blog-item">
                            <Row g={0}>
                                <Col md={4}>
                                    <Card.Img src={`/imagenes/${post.image}`} alt={post.title} style={{ height: '100%', objectFit: 'cover' }} />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title>{post.title}</Card.Title>
                                        <Card.Text>{post.summary}</Card.Text>
                                        <Button 
                                            variant="outline-dark" 
                                            size="sm" 
                                            onClick={() => setSelectedPostId(post.id)}
                                        >
                                            Leer más
                                        </Button>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default BlogPage;