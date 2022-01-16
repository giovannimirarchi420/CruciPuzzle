import {useState} from "react";
import {Alert, Button, CloseButton, Form, Modal} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import '../../App.css'


const LoginModal = (props) => {
    const [show, setShow] = useState(props.show);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessageEmail, setErrorMessageEmail] = useState(false);
    const [errorMessagePassword, setErrorMessagePassword] = useState(false);
    const handleClose = () => setShow(false);
    const navigate = useNavigate();
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailCheck = (email) => {
        return !re.test(email);
    }

    const passwordCheck = (password) => {
        return password.length <= 3;
    }

    const validateAndSubmit = (evt) => {
        evt.preventDefault()
        console.log("ciao");
        setErrorMessagePassword(false);
        setErrorMessageEmail(false);
        const [isValidEmail, isValidPassword] = [emailCheck(email), passwordCheck(password)];
        console.log(isValidEmail, isValidPassword)
        if ( !isValidEmail && !isValidPassword){
            console.log("valid");
            props.login({username: email, password});
            navigate('/')
            return;
        }
        if(isValidEmail) {
            setErrorMessageEmail(true);
        }
        if (isValidPassword) {
            setErrorMessagePassword(true);
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
                <Modal.Title className={"font-game"}>
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className={"font-game"} variant={"danger"} show={errorMessageEmail}>
                    {"Please insert a valid email address"}
                </Alert>
                <Alert className={"font-game"} variant={"danger"} show={errorMessagePassword}>
                    {"Please insert a valid password"}
                </Alert>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={"font-game"}>Email address</Form.Label>
                        <Form.Control className={"font-game"} type="email" placeholder="Enter email" onChange={(evt) => setEmail(evt.target.value)}/>
                        <Form.Text className="text-muted font-game">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className={"font-game"}>Password</Form.Label>
                        <Form.Control className={"font-game"} type="password" placeholder="Password" onChange={(evt) => setPassword(evt.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Link to={'/'}>
                    <Button className={"font-game"} variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Link>
                <Button className={"font-game"} variant="primary" onClick={(evt) => validateAndSubmit(evt)}>Login</Button>

            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;