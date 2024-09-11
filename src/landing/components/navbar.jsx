import Nav from "react-bootstrap/Nav";
import landingLogo from "../../assets/icons/landingLogo.svg";
import { Container, Navbar } from "react-bootstrap";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function LandingNavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar expand="lg" id="landingNavbar">
        <Container>
          <Navbar.Brand href="/home">
            <img src={landingLogo} alt="" id="landingNavLogo" />
          </Navbar.Brand>
          <Nav className="d-none d-lg-flex gap-5">
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive ? "active blackLink navLinks" : "blackLink navLinks"
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                isActive ? "active blackLink navLinks" : "blackLink navLinks"
              }
            >
              Contact Us
            </NavLink>
          </Nav>
          <Link to={"/login"} className="whiteLink">
            <button id="navBtn" className="ctaButtons d-none d-lg-block">
              Get Stareted
            </button>
          </Link>
          <MenuRoundedIcon
            fontSize="large"
            className="d-block d-lg-none"
            onClick={handleShow}
          />
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="p-0" id="mobileMenuUl">
            <li onClick={handleClose}>
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  isActive ? "active blackLink navLinks" : "blackLink navLinks"
                }
              >
                About Us
              </NavLink>
            </li>
            <li onClick={handleClose}>
              <NavLink
                to="/contact-us"
                className={({ isActive }) =>
                  isActive ? "active blackLink navLinks" : "blackLink navLinks"
                }
              >
                Contact Us
              </NavLink>
            </li>
            <li onClick={handleClose}>
              <Link to={"/login"} className="blackLink">
                Get Started
              </Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
