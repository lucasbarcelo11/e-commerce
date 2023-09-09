import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AppNav() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setShow(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          e-commerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100 d-flex justify-content-between">
            <div className="d-flex">
              <Nav.Link as={Link} to={"/login"}>
                <i className="bx bx-user"></i>
              </Nav.Link>
              <Nav.Link as={Link} to={"/purchases"}>
                <i className="bx bx-shopping-bag"></i>
              </Nav.Link>
            </div>
            <div>
              <Nav.Link onClick={handleShow}>
                <i className="bx bx-cart"></i>
              </Nav.Link>
            </div>
            {/* Botton del carrito de compras */}
            <Sidebar show={show} handleClose={handleClose} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNav;
