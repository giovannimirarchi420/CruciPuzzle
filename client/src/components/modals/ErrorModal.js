import {Button, Modal} from "react-bootstrap";
import img from '../../img/error-image.png';
import {useNavigate} from "react-router-dom";

const ErrorModal = (props) => {
    const navigate = useNavigate();
    return (
        <Modal show={props.show}>
            <Modal.Header>
                <h2 className={"font-game"}>Error</h2>
            </Modal.Header>
            <Modal.Body>
                <img style={{
                    width: "auto",
                    height: "150px"
                }} src={img}/>
                <p className={"font-game"}>{props.text ? props.text : "An error occurred while evaluating your request. Contact us"} </p>
            </Modal.Body>
            <Modal.Footer>
                <Button className={"font-game"} variant={"dark"} size={"lg"} onClick={() => navigate('/')}>Go
                    back</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ErrorModal;