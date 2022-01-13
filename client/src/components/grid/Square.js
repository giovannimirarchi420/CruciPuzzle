import {React, useState} from 'react';
import {Button} from 'react-bootstrap';
import '../../App.css';

const Square = (props) => {
    const [isSelected, setSelected] = useState(props.selected);

    const style = {
        "width": props.buttonSize,
        "height": props.buttonSize
    }

    const fontStyle = {
        "fontSize": props.fontSize,
        "fontStyle": 'Luckiest Guy'
    }

    return (
        <>
            <Button variant={props.red ? "danger" : "outline-primary"} style={style} onClick={() => {
                props.refreshGrid(props.i, props.j);
                setSelected((oldState) => !oldState);
            }} active={props.selected}><span className={"square-text"} style={fontStyle}>{props.value.toUpperCase()}</span></Button>
        </>
    );
}

export default Square;