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
                    {props.isLogged ? <h3 className={"font-game"}>Congratulation {props.username}</h3> : <></>}
                    <div style={{ borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20 }}></div>

                    <h3 className={"font-game"}> Score: <span style={{color: "red"}}>{props.score}</span></h3>
                </center>
            </Modal.Body>
            <Modal.Footer>
                <center>
                    <Link to={"../../difficulty"}>
                        <Button variant={"warning"} onClick={props.onHide} className={"font-game"}>Play Again</Button>
                    </Link>
                    <Link to={"../../"}>
                        <Button style={{marginLeft: "5vh"}} variant={"danger"} onClick={props.onHide} className={"font-game"}>Leave</Button>
                    </Link>
                </center>
            </Modal.Footer>
        </Modal>
    );
}

export default Score;