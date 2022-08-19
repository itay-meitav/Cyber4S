import { Button, Form, Tooltip } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import logo from "../assets/logo.png";
import config from "../assets/config";

function LeftNav() {
  const loc = useLocation();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
            <img
              src={logo}
              width="24"
              height="30"
              className="d-inline-block align-top"
              style={{ marginRight: 10 }}
            />
            Socks Panel
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link
                to="/socks"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Socks
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/officers"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Officers
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/locations"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Locations
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/history"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                History
              </Link>
            </Nav.Link>
            <NavDropdown title="Tools" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Link
                  to={`/${
                    loc.pathname.replace(/^\//g, "").split("/")[0] || "socks"
                  }/add`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  Add New Item
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    Important note: <br></br>
                    This action may take several seconds. <br></br>
                    When finished, the page will refresh.
                  </Tooltip>
                }
              >
                <NavDropdown.Item
                  onClick={() => {
                    fetch(config.apiHost + "/api/reset", {
                      method: "put",
                    })
                      .then((res) => {
                        if (res.ok) return res.json();
                      })
                      .then(() => {
                        window.location = window.location;
                      })
                      .catch((e) => {
                        console.error(e);
                      });
                  }}
                >
                  Reset Data
                </NavDropdown.Item>
              </OverlayTrigger>
            </NavDropdown>
          </Nav>
          <Form className="flex-row">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-1"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LeftNav;
