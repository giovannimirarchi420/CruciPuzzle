import {useState} from "react";
import {Alert, Button, CloseButton, Form, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";


const LoginModal = (props) => {
    const [show, setShow] = useState(props.show);
    const [showEmailWarning, setShowEmailWarning] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailCheck = (evt) => {
        evt.preventDefault();
        if ( re.test(evt.target.value) ) {
            setShowEmailWarning(false);
        }
        else {
            setShowEmailWarning(true);
        }
    }
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>Login</Modal.Title>
                <Link to={"/"}>
                    <CloseButton />
                </Link>
            </Modal.Header>
            <Modal.Body>
                <Alert variant={"warning"} show={showEmailWarning}>
                    Please insert a valid email address
                </Alert>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onSubmit={(evt) => emailCheck(evt)}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    {/*<Button variant="primary" type="submit">
                        Submit
                    </Button>*/}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Link to={'/'}>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Link>
                <Button variant="primary">Login</Button>

            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;