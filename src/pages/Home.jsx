import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductCard from "../components/ProductCard";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProductThunk, getProductCategoryThunk } from "../store/slices/product";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";

const Home = () => {
  const product = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    //despachar el getProductThunk
    dispatch(getProductThunk());
    getCategories();
  }, []);

  const getCategories = () => {
    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  };

  return (
    <main>
      <Row>
        <Col md={4} lg={3}>
          <ListGroup>
            {
              categories?.map(category => (
                <ListGroup.Item
                 key={category.id}
                 onClick={() => dispatch(getProductCategoryThunk(category.id))}
                 >
                  {category.name}
                 </ListGroup.Item>
              ))
            }
          </ListGroup>
        </Col>
        <Col md={8} lg={9}>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Buscar producto..."
                  aria-label="Buscar producto..."
                  aria-describedby="basic-addon2"
                />
                <Button variant="outline-primary" id="button-addon2">
                  Buscar
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <Row xs={1} md={2} lg={3}>
            {product?.map((item) => (
              <Col key={item.id}>
                <ProductCard data={item} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default Home;
