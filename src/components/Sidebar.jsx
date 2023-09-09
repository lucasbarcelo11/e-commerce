import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getProductsThunk,
  updateProductsThunk,
  deleteProductsThunk,
  purchasesCartThunk,
} from "../store/slices/productCard";

function Sidebar({ show, handleClose }) {
  const products = useSelector((state) => state.productCard);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  const incrementQuantity = (selectProduct) => {
    dispatch(updateProductsThunk(selectProduct.id, selectProduct.quantity + 1));
  };

  const decrementQuantity = (selectProduct) => {
    if (selectProduct.quantity > 1) {
      dispatch(
        updateProductsThunk(selectProduct.id, selectProduct.quantity - 1)
      );
    }
  };

  const deleteProduct = (id) => {
    dispatch(deleteProductsThunk(id));
  };

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Productos</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            {products?.map((prd) => (
              <li key={prd.id}>
                <h4>{prd.product.title}</h4>
                <img src={prd.product.images[0].url} alt="" />
                <p>Precio: {prd.product.price}</p>
                <div className="d-flex justify-content-between">
                  <div>
                    <button
                      className="btn btn-outline-dark px-3"
                      onClick={() => decrementQuantity(prd)}
                    >
                      -
                    </button>
                    <span className="mx-3">{prd.quantity}</span>
                    <button
                      className="btn btn-outline-dark px-3"
                      onClick={() => incrementQuantity(prd)}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button className="btn text-danger" onClick={deleteProduct}>
                      <i className="bx bx-trash"></i>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={() => dispatch(purchasesCartThunk())}>
            Comprar
          </button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
