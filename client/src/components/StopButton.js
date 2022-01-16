import {Button, Modal} from "react-bootstrap";
import {useState} from "react";


const StopButton = (props) => {

    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button size={"lg"} className={"font-game"} variant="danger" onClick={() => setModalShow(true)}>
                Stop
            </Button>
            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <h4 className={"font-game"}>Quit game</h4>
                    <p className={"font-game"}>
                        {props.isLogged ? "If you abort now your score will be saved anyway.\nAre you sure to quit?" :
                                          "Are you sure to quit?"}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={"font-game"} onClick={() => {
                        setModalShow(false);
                        props.finishGame(true);
                    }}>Yes</Button>
                    <Button className={"font-game"} variant={"dark"} onClick={() => setModalShow(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default StopButton;