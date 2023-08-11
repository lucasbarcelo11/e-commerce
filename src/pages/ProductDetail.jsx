import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import { setIsLoading } from "../store/slices/isLoading";

import { useSelector, useDispatch } from "react-redux";
import { getProductCategoryThunk } from "../store/slices/product";
import { addProductThunk } from "../store/slices/productCard";

const ProductDetail = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const allProduct = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    getDetails();
  }, [id]);

  const getDetails = () => {
    dispatch(setIsLoading(true))
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((res) => {
        console.log(res.data);
        setProductDetails(res.data);
        dispatch(getProductCategoryThunk(res.data.category.id));
      })
      .finally(() => dispatch(setIsLoading(false)))

      .catch((err) => console.log(err));
  };

  const ImgProduct = ({ url }) => {
    return <img src={url} height={400} alt="" />;
  };
  const [rate, setRate] = useState(1);

  const decrement = () => {
    if (rate > 1) {
      setRate(rate - 1);
    }
  };

  const increment = () => {
    setRate(rate + 1);
  };

  const addProduct = () => {
    const data = {
      quantity: rate,
      productId: productDetails.id
    };
    dispatch(addProductThunk(data));
  };

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="my-5 d-flex justify-content-between">
      <div className="col-6 mt-5">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {productDetails?.images?.map((elm) => {
            return (
              <Carousel.Item className="text-center" key={elm?.id}>
                <ImgProduct url={elm?.url} />
                <Carousel.Caption>
                  
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
      <div className="col-5 mt-5">
        <h1>{productDetails.title}</h1>
        <p>Descripcion : {productDetails.description}</p>
        <div>
          <button onClick={decrement}>-</button>
          {rate}
          <button onClick={increment}>+</button>
        </div>
        <Button variant="btn btn-outline-primary" onClick={addProduct}>
             <i className='bx bx-cart' ></i>
        </Button>{" "}
      </div>
      {/*    <Row>
        <Col lg={9}>
          <img src="" alt="" />
        </Col>
        <Col>
          <h3>Productos Similares</h3>
        </Col>
      </Row> */}
    </div>
  );
};

export default ProductDetail;
