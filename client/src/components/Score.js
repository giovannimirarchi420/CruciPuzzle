import {Button, Modal} from "react-bootstrap";
import '../App.css'
import {Link} from "react-router-dom";

const Score = (props) => {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <center>
                    <h4 className={"score-text"}>Complete</h4>
                </center>

                <center style={{marginTop: "10vh"}}>
                    <h3 className={"font-game"}> Score: <span style={{color: "red"}}>{props.score}</span></h3>
                </center>
            </Modal.Body>
            <Modal.Footer>
                <center>
                    <Link to={"../../difficulty"}>
                        <Button variant={"warning"} onClick={props.onHide} className={"font-game"}>Play Again</Button>
                    </Link>
                    <Link to={"../../"}>
                        <Button variant={"danger"} onClick={props.onHide} className={"font-game"}>Home</Button>
                    </Link>
                </center>
            </Modal.Footer>
        </Modal>
    );
}

export default Score;