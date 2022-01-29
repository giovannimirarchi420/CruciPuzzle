import {Col, Container, Nav, Navbar} from "react-bootstrap";
import "../App.css";
import {FiLogIn} from "react-icons/fi";
import {useNavigate} from 'react-router-dom';


const MyNavbar = (props) => {

    const navigate = useNavigate();
    const style = {
        paddingLeft: "10vw",
        fontSize: "20px",
        fontWeight: "bold",
        textShadow: "3px"
    }

    const navigateTo = (location) => {
        navigate(location);
    }
    return (
        <Container fluid style={{margin: 0, padding: 0}}>

            <Navbar bg="primary">

                <Col>
                    <Nav>
                        <Nav.Link className={"nav-text"} onClick={() => navigateTo('/')} style={style}>Home</Nav.Link>
                    </Nav>
                </Col>
                <Col>
                    <Nav>
                        <Nav.Link className={"nav-text"} onClick={() => navigateTo('/hall-of-fame')} style={style}>Hall
                            of Fame</Nav.Link>
                    </Nav>
                </Col>
                <Col>
                    <Nav>
                        <Nav.Link className={"nav-text"} onClick={() => navigateTo('/about')}
                                  style={style}>About</Nav.Link>
                    </Nav>
                </Col>
                {props.username ? <Col>
                    <Nav>
                        <Nav.Link className={"nav-text"} onClick={() => navigateTo('/history')}
                                  style={style}>History</Nav.Link>
                    </Nav>
                </Col> : <></>}
                <Col>
                    <Nav>
                        <Nav.Link className={"nav-text"}
                                  onClick={() => props.username ? navigateTo('/logout') : navigateTo('/login')}
                                  style={style}>{props.username ? `Sign out` : "Sign in"} <FiLogIn/></Nav.Link>
                    </Nav>
                </Col>
            </Navbar>
        </Container>
    );
}

export default MyNavbar;