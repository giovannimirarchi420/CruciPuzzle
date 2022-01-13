import {useState} from "react";


const ScoreCounter = (props) => {

    return (
        <>
            <div className={"score-counter"} style={{fontSize: "50px", marginTop: "8vh"}}>Score: {props.score}</div>
        </>
    );
}

export default ScoreCounter;