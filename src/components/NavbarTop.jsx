import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function NavbarTop() {
  return (
    <Navbar
      expand="lg"
      style={{
        marginBottom: "30px",
        background: "#f7f2ff",          // soft pastel lavender
        borderBottom: "2px solid #e6d9ff",
        boxShadow: "0 2px 6px rgba(180,160,255,0.2)"
      }}
    >
      <Container>
        {/* navbar brand/logo */}
        <Navbar.Brand
          style={{
            textTransform: "lowercase",
            color: "#7c6aff",            // theme colour
            fontWeight: "600"
          }}
        >
          animal encyclopedia
        </Navbar.Brand>

        {/* mobile menu toggle button */}
        <Navbar.Toggle
          style={{
            borderColor: "#d8caff",
            background: "#efe6ff"
          }}
        />

        {/* collapsible navigation menu */}
        <Navbar.Collapse>
          <Nav className="me-auto">
            {/* home page navigation link */}
            <NavLink
              to="/"
              className="nav-link"
              style={{
                color: "#7c6aff",
                fontWeight: "500",
                textTransform: "lowercase"
              }}
            >
              home
            </NavLink>

            {/* about page navigation link */}
            <NavLink
              to="/about"
              className="nav-link"
              style={{
                color: "#7c6aff",
                fontWeight: "500",
                textTransform: "lowercase"
              }}
            >
              about
            </NavLink>

            {/* build page navigation link */}
            <NavLink
              to="/build"
              className="nav-link"
              style={{
                color: "#7c6aff",
                fontWeight: "500",
                textTransform: "lowercase"
              }}
            >
              build
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}