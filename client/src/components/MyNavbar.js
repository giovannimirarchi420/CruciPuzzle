import {Col, Container, Nav, Navbar} from "react-bootstrap";
import "../App.css";
import {FiLogIn} from "react-icons/fi";

const MyNavbar = (props) => {

    const style = {
        paddingLeft: "10vw",
        fontSize: "20px",
        fontWeight: "bold",
        textShadow: "3px"
    }

    return (
        <Container fluid style={{margin: 0, padding: 0}}>

            <Navbar bg="primary">

                <Col>
                    <Nav>
                        <Nav.Link className={"nav-text"} href="#home" style={style}>Home</Nav.Link>
                    </Nav>
                </Col>
                <Col>
                    <Nav>
                        <Nav.Link className={"nav-text"} href="#Hall-of-fame" style={style}>Hall of Fame</Nav.Link>
                    </Nav>
                </Col>
                <Col>
                    <Nav>
                        <Nav.Link className={"nav-text"} href="#about" style={style}>About</Nav.Link>
                    </Nav>
                </Col>
                <Col>
                    <Nav>
                        <Nav.Link className={"nav-text"} href="#login" style={style}><FiLogIn/></Nav.Link>
                    </Nav>
                </Col>
            </Navbar>
        </Container>
    );
}

export default MyNavbar;