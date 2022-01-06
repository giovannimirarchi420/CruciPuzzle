import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";

const MyNavbar = (props) => {

    const style = {
        paddingLeft: 100
    }

    return (
        <Container fluid style={{margin: 0, padding: 0}}>
            <Navbar bg="primary" variant="dark">
            <Col>
                <Nav className="me-auto">
                    <Nav.Link href="#home" style={{paddingLeft: 150}}>Home</Nav.Link>
                </Nav>
            </Col>
            <Col>
                <Nav>
                    <Nav.Link href="#Hall-of-fame" style={{paddingLeft: 150}}>Hall of Fame</Nav.Link>
                </Nav>
            </Col>
            <Col>
                <Nav>
                    <Nav.Link href="#about" style={{paddingLeft: 150}}>About</Nav.Link>
                </Nav>
            </Col>
            </Navbar>
        </Container>
    );
}

export default MyNavbar;