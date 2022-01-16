import '../App.css';

const RankCard = (props) => {

    return (
        <div className="rank-box">
            <div className="ranking-container">
                <h1 className="ranking"> #{props.ranking} </h1>
            </div>
            <h1 className="player-name"> {props.playerName} </h1>
            <h1 className="player-score"> {props.playerScore} </h1>

        </div>);

}

export default RankCard;