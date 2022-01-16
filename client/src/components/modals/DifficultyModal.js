import {Button, CloseButton, Container, Modal, Row} from "react-bootstrap";
import '../../App.css';
import {useState} from "react";
import {Link} from "react-router-dom";
import {
    DIFFICULTY_BEGINNER_ROUTE,
    DIFFICULTY_COMMAND_ROUTE,
    DIFFICULTY_GOD_ROUTE,
    DIFFICULTY_INTERMEDIATE_ROUTE,
    DIFFICULTY_ROOKIE_ROUTE
} from "../../util/Constants";

const DifficultyModal = (props) => {
    const [show, setShow] = useState(true);

    const handleClose = (difficulty) => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header onHide={handleClose}>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1 className={"difficulty-choose-title"}>Choose game difficulty</h1>
                </Modal.Title>
                <Link to={"/"}>
                    <CloseButton />
                </Link>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <center>
                        <Row className={"difficulty-row"}>
                            <Link to={DIFFICULTY_BEGINNER_ROUTE}>
                                <Button className={"difficulty-choose-button"} variant="info" size='lg'
                                        onClick={() => handleClose('beginner')}>Beginner</Button>
                            </Link>
                        </Row>
                        <Row className={"difficulty-row"}>
                            <Link to={DIFFICULTY_ROOKIE_ROUTE}>
                                <Button className={"difficulty-choose-button"} variant="success" size='lg'
                                        onClick={() => handleClose('rookie')}>Rookie</Button>
                            </Link>
                        </Row>
                        <Row className={"difficulty-row"}>
                            <Link to={DIFFICULTY_INTERMEDIATE_ROUTE}>
                                <Button className={"difficulty-choose-button"} variant="warning" size='lg'
                                        onClick={() => handleClose('intermediate')}>Intermediate</Button>
                            </Link>
                        </Row>
                        <Row className={"difficulty-row"}>
                            <Link to={DIFFICULTY_COMMAND_ROUTE}>
                                <Button className={"difficulty-choose-button"} variant="secondary" size='lg'
                                        onClick={() => handleClose('command')}>Command</Button>
                            </Link>
                        </Row>
                        <Row className={"difficulty-row"}>
                            <Link to={DIFFICULTY_GOD_ROUTE}>
                                <Button className={"difficulty-choose-button"} variant="dark" size='lg'
                                        onClick={() => handleClose('god')}>God</Button>
                            </Link>
                        </Row>
                    </center>
                </Container>
            </Modal.Body>
        </Modal>

    );
}

export default DifficultyModal;