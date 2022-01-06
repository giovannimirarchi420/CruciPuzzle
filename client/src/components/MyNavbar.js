import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";

const MyNavbar = (props) => {

    const style = {
        paddingLeft: 100
    }

    return (
        <Navbar bg="primary" variant="dark">
                <Nav className="me-auto">
                    <Row>
                        <Col>
                            <Nav.Link href="#home" sm>Home</Nav.Link>
                        </Col>
                        <Col>
                            <Nav.Link href="#features" sm>Features</Nav.Link>
                        </Col>
                        <Col>
                            <Nav.Link href="#pricing" sm>Pricing</Nav.Link>
                        </Col>
                    </Row>
                </Nav>
        </Navbar>
    );
}

export default MyNavbar;