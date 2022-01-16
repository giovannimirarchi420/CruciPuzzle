import {Button, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import '../../App.css';

const LogoutModal = (props) => {
    const navigate = useNavigate();

    return (
        <Modal show={true}>
            <Modal.Header>
                <Modal.Title><center><h1 className={"font-game"}>Log Out</h1></center></Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <h4 style={{marginTop: "4vh"}} className={"font-game"}>Are you sure to exit?</h4>

            </Modal.Body>
            <Modal.Footer>
                    <Button style={{marginRight: "2vh"}} className={"font-game"} variant={"info"} onClick={props.logout}> Yes </Button>
                    <Button className={"font-game"} variant={'dark'} onClick={() => navigate('/')}> Cancel </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LogoutModal;