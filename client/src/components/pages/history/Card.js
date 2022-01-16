import '../../../App.css'

const Card = (props) => {
    return (
        <div className="rank-box">
            <h1 className="player-name"> {props.ranking} </h1>
            <h1 className="player-score"> {props.playerScore} </h1>

        </div>);
}

export default Card;