import {React, useState} from 'react';
import {Button} from 'react-bootstrap';


const style = {
    "width": "100px",
    "height": "100px"
}

const fontStyle = {
    "fontSize": "40px",
    "fontFamily": "Tangerine"
}

const Square = (props) => {
    const [isSelected, setSelected] = useState(props.selected);

    return (
        <>
            <Button variant={props.red ? "danger" : "outline-primary"} style={style} onClick={() => {
                props.refreshGrid(props.i, props.j);
                setSelected((oldState) => !oldState);
            }} active={props.selected}><span className={'square'}>{props.value}</span></Button>
        </>
    );
}

export default Square;