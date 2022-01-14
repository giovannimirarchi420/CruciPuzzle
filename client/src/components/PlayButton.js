import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../App.css'

const PlayButton = () => {

    return (
        <Link to={'difficulty'}>
            <Button className={"font-game"} variant="danger" size="lg"
                    style={{marginTop: "30vh", padding: "30px 60px", borderRadius: "20px"}}>Play</Button>
        </Link>
    );
}

export default PlayButton;