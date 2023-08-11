import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function ProductCard({data}) {
  return (
    <Card >
      <Card.Img
        variant="top" 
        src={data.images[0].url} 
        style={{height: 200, objectFit: "cover"}}
        />
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text>
          Precio
          $ {data.price}
        </Card.Text>
        <Button variant="primary" as={Link} to={`product/${data.id}`}>Ver detalle</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;