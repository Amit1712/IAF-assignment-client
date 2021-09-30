import {Container, Navbar, Nav} from 'react-bootstrap'

function Header() {
  return <Navbar collapseOnSelect="collapseOnSelect" expand="lg" bg="dark" variant="dark" fixed="top">
    <Container>
      <Navbar.Brand href="/">My Web-App</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/weather">Weather</Nav.Link>
          <Nav.Link href="/movies">Movies</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

}

export default Header;
