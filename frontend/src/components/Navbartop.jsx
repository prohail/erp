import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.jpg";
import { NavLink, Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function BasicExample() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img
              alt="logo"
              src={logo}
              width="80"
              className="d-inline-block align-top"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/employees" className="nav-link fw-semibold">
              Employees
            </NavLink>

            <NavLink to="/attendance" className="nav-link fw-semibold">
              Attendance
            </NavLink>

            <NavLink to="/customers" className="nav-link fw-semibold">
              Customers
            </NavLink>

            <NavLink to="/Vouchers" className="nav-link fw-semibold">
              Vouchers
            </NavLink>
          </Nav>
          {user && (
            <Nav className="ms-auto">
              <button
                onClick={handleLogout}
                className="btn btn-outline-secondary"
              >
                Logout
              </button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
