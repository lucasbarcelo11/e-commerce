import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductCard from "../components/ProductCard";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getProductThunk, getProductCategoryThunk } from "../store/slices/product";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import FilterPrice from "../components/FilterPrice";

const Home = () => {
  const product = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);

  const [nameValue, setNameValue] = useState('')

  const [fromTo, setFromTo] = useState({
    from: 0,
    to: Infinity
  })

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

  const inputName = useRef()

  const handleFilterName = () => {
    setNameValue(inputName.current.value)
  }


  const cbFilter = prod => {
    //Filter By Name
    const inputNameLower = nameValue.toLocaleLowerCase().trim()
    const nameReal = prod.title.toLocaleLowerCase()
    const filterName = nameReal.includes(inputNameLower)
    //Filter by Price
    const price = Number(prod.price)
    const filterPrice = fromTo.from <= price && price <= fromTo.to
    return filterName && filterPrice
  }



  const handleAllCategories = () => {
    dispatch(getProductThunk());
  }

  return (
    <main>
      <Row>
        <Col md={4} lg={3}>
          <FilterPrice/>
          <ListGroup>
          <ListGroup.Item onClick={handleAllCategories} className="cursor">
            All categories 
          </ListGroup.Item>
            {
              categories?.map(category => (
                <ListGroup.Item
                 className="cursor"
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
                  onChange={handleFilterName}
                  value={nameValue}
                  ref={inputName}
                  placeholder="Buscar producto..."
                  aria-label="Buscar producto..."
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
            </Col>
          </Row>
          <Row xs={1} md={2} lg={3}>
            {product?.filter(cbFilter).map((item) => (
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
