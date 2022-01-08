import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";


const PlayButton = () => {

    return (
        <Link to={'difficulty'}>
            <Button variant="danger" size="lg"
                    style={{marginTop: "30vh", padding: "30px 60px", borderRadius: "20px"}}>Play</Button>
        </Link>
    );
}

export default PlayButton;